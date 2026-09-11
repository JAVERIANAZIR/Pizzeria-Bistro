#!/usr/bin/env python3
"""Dependency-free Python 3.10+ API for Pizzeria Bistro."""

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
from datetime import datetime, timezone
import json
import os
import re
import secrets
import threading

ROOT = Path(__file__).resolve().parent.parent
CATALOG = json.loads((ROOT / "catalog.json").read_text(encoding="utf-8"))
DATA_DIR = ROOT / "data"
WRITE_LOCK = threading.Lock()


class API(BaseHTTPRequestHandler):
    def headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", os.getenv("ALLOWED_ORIGIN", "*"))
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def send_json(self, status, body):
        self.headers(status)
        self.wfile.write(json.dumps(body, separators=(",", ":")).encode())

    def do_OPTIONS(self):
        self.headers(204)

    def do_GET(self):
        path = urlparse(self.path).path.rstrip("/")
        if path.endswith("/health"):
            return self.send_json(200, {"ok": True, "service": "pizzeria-bistro-python"})
        if path.endswith("/menu"):
            return self.send_json(200, {"items": CATALOG})
        self.send_json(404, {"error": "Route not found"})

    def do_POST(self):
        if not urlparse(self.path).path.rstrip("/").endswith("/orders"):
            return self.send_json(404, {"error": "Route not found"})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 2 or length > 100_000:
                raise ValueError("Invalid request size")
            body = json.loads(self.rfile.read(length))
            order = validate_order(body)
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            return self.send_json(422, {"error": str(exc)})

        DATA_DIR.mkdir(exist_ok=True)
        with WRITE_LOCK, (DATA_DIR / "orders.jsonl").open("a", encoding="utf-8") as file:
            file.write(json.dumps(order, separators=(",", ":")) + "\n")
        self.send_json(201, {"ok": True, "order": {key: order[key] for key in ("id", "status", "total", "currency")}})

    def log_message(self, message, *args):
        print(f"{self.address_string()} - {message % args}")


def validate_order(body):
    if not isinstance(body, dict):
        raise ValueError("JSON object required")
    customer = body.get("customer") or {}
    if not isinstance(customer, dict):
        raise ValueError("Invalid customer details")
    name = str(customer.get("name", "")).strip()
    phone = str(customer.get("phone", "")).strip()
    address = str(customer.get("address", "")).strip()
    lines = body.get("items")
    if len(name) < 2:
        raise ValueError("Customer name is required")
    if not re.fullmatch(r"[+0-9() -]{7,20}", phone):
        raise ValueError("A valid phone number is required")
    if not isinstance(lines, list) or not 1 <= len(lines) <= 50:
        raise ValueError("Order must contain 1 to 50 items")

    clean, total = [], 0
    for line in lines:
        if not isinstance(line, dict):
            raise ValueError("Invalid order item")
        item_id = str(line.get("id", ""))
        qty = int(line.get("qty", 0))
        size = str(line["size"]) if line.get("size") is not None else None
        if item_id not in CATALOG or not 1 <= qty <= 20:
            raise ValueError("Invalid order item")
        product = CATALOG[item_id]
        if "sizes" in product:
            if size not in product["sizes"]:
                raise ValueError(f"Invalid size for {product['name']}")
            price = int(product["sizes"][size])
        else:
            price, size = int(product["price"]), None
        clean.append({"id": item_id, "name": product["name"], "size": size, "qty": qty, "unitPrice": price})
        total += price * qty

    return {
        "id": f"PB-{datetime.now(timezone.utc):%Y%m%d}-{secrets.token_hex(3).upper()}",
        "status": "received",
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "customer": {"name": name, "phone": phone, "address": address},
        "notes": str(body.get("notes", "")).strip()[:500],
        "items": clean,
        "total": total,
        "currency": "PKR",
    }


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"API listening on http://localhost:{port}/api")
    ThreadingHTTPServer(("0.0.0.0", port), API).serve_forever()