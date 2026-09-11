import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "./data";
import { BUSINESS } from "./data";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  size?: string;
  unitPrice: number;
  img: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  add: (item: MenuItem, size?: string) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  orderText: () => string;
};

const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((item: MenuItem, size?: string) => {
    const unit = item.sizes
      ? item.sizes.find((s) => s.label === size)?.price ?? item.sizes[1]?.price ?? item.sizes[0].price
      : item.price ?? 0;
    const sz = item.sizes ? size ?? item.sizes[1]?.label ?? item.sizes[0].label : undefined;
    const key = `${item.id}:${sz ?? "-"}`;
    setLines((ls) => {
      const ex = ls.find((l) => l.key === key);
      if (ex) return ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      return [...ls, { key, id: item.id, name: item.name, size: sz, unitPrice: unit, img: item.img, qty: 1 }];
    });
  }, []);

  const inc = useCallback((key: string) => setLines((ls) => ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))), []);
  const dec = useCallback(
    (key: string) =>
      setLines((ls) => ls.map((l) => (l.key === key ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0)),
    []
  );
  const remove = useCallback((key: string) => setLines((ls) => ls.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const orderText = useCallback(() => {
    const list = lines.map((l) => `• ${l.qty}× ${l.name}${l.size ? ` (${l.size})` : ""} — Rs. ${l.unitPrice * l.qty}`);
    const total = lines.reduce((a, l) => a + l.unitPrice * l.qty, 0);
    return [
      `Assalam-o-Alaikum ${BUSINESS.name}! I'd like to order:`,
      ...list,
      `Total: Rs. ${total}`,
      "",
      `${BUSINESS.address.short}, Mandi Bahauddin`,
    ].join("\n");
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((a, l) => a + l.qty, 0);
    const total = lines.reduce((a, l) => a + l.unitPrice * l.qty, 0);
    return { lines, count, total, isOpen, setOpen, add, inc, dec, remove, clear, orderText };
  }, [lines, isOpen, add, inc, dec, remove, clear, orderText]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
