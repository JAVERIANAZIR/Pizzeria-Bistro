# Pizzeria Bistro Backend

Two equivalent, dependency-free backend options are included. Use one in production, not both.

## Endpoints

- `GET /api/health`
- `GET /api/menu`
- `POST /api/orders`

Orders are server-priced from `backend/catalog.json`; frontend prices are never trusted. Accepted orders are appended to `backend/data/orders.jsonl`. Ensure the web-server user can write to `backend/data`.

## Python

Requires Python 3.10 or newer.

```bash
python backend/python/app.py
```

The default address is `http://localhost:8000`. Set `PORT` and `ALLOWED_ORIGIN` through environment variables when deploying.

## PHP

Requires PHP 8 or newer. Point `/api/*` to `backend/php/index.php`. For local testing from the project root:

```bash
php -S localhost:8000 backend/php/index.php
```

Set `ALLOWED_ORIGIN` to the website origin in production. The frontend uses `/api/orders` by default; set `VITE_API_URL` when the API is hosted on another domain.

## Order Body

```json
{
  "customer": {"name": "Customer", "phone": "03001234567", "address": "Delivery address"},
  "notes": "Optional instructions",
  "items": [{"id": "r-tikka", "size": "M", "qty": 1}]
}
```