import type { CartLine } from "./cart";

const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
};

export async function submitOrder(customer: CustomerDetails, lines: CartLine[]) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: { name: customer.name, phone: customer.phone, address: customer.address },
      notes: customer.notes || "",
      items: lines.map(({ id, size, qty }) => ({ id, size, qty })),
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Could not submit order");
  return data.order as { id: string; status: string; total: number; currency: string };
}