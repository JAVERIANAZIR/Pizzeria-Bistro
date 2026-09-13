import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, MapPin, Menu, Minus, Phone, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { submitOrder } from "./api";
import { useCart } from "./cart";
import { BUSINESS, rs } from "./data";
import { CTAButton, lockScroll, Logo, Magnetic, scrollToId } from "./ui";
import { cn } from "./utils/cn";

const NAV = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "specials", label: "Specials" },
  { id: "contact", label: "Contact" },
];

/* ══ Navbar ═══════════════════════════════════════════════════════ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  const dark = scrolled || open;

  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-tomato focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-mozza"
      >
        Skip to menu
      </a>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          dark ? "bg-cream/90 shadow-[0_10px_40px_-18px_rgb(23_16_9/0.35)] backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8" aria-label="Primary">
          <Logo dark={dark} />

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  className={cn(
                    "group relative py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] transition-colors",
                    dark ? "text-charcoal/75 hover:text-tomato" : "text-cream/80 hover:text-cream"
                  )}
                >
                  {n.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full",
                      dark ? "bg-tomato" : "bg-gold"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Open order cart, ${count} items`}
              className={cn(
                "relative grid h-11 w-11 place-items-center rounded-full border transition-all hover:-translate-y-0.5",
                dark ? "border-charcoal/15 text-charcoal hover:border-tomato hover:text-tomato" : "border-cream/30 text-cream hover:border-gold hover:text-gold"
              )}
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-tomato px-1 text-[0.62rem] font-extrabold text-mozza"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Magnetic>
              <CTAButton onClick={() => go("menu")} className="hidden !px-6 !py-3 sm:inline-flex">
                Order Now
              </CTAButton>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
                dark ? "border-charcoal/15 text-charcoal" : "border-cream/30 text-cream"
              )}
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-espresso/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              className="noise absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-cream px-7 pb-10 pt-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between">
                <Logo dark />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:text-tomato"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-10" aria-label="Mobile">
                <ul className="space-y-1">
                  {NAV.map((n, i) => (
                    <motion.li
                      key={n.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        onClick={() => go(n.id)}
                        className="group flex w-full items-center justify-between border-b border-charcoal/10 py-4 text-left"
                      >
                        <span className="font-display text-3xl font-black tracking-tight text-charcoal transition-colors group-hover:text-tomato">
                          {n.label}
                        </span>
                        <ArrowRight size={20} className="text-tomato opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto space-y-4 pt-10"
              >
                <CTAButton onClick={() => go("menu")} className="w-full">
                  <ShoppingBag size={16} /> Order Now
                </CTAButton>
                <p className="flex items-start gap-2 text-xs leading-relaxed text-charcoal/60">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-tomato" />
                  {BUSINESS.address.short}, {BUSINESS.address.area}, Mandi Bahauddin
                </p>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══ Cart drawer ══════════════════════════════════════════════════ */
export function CartDrawer() {
  const { lines, total, isOpen, setOpen, inc, dec, remove, clear, orderText } = useCart();
  const [copied, setCopied] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [isOpen, setOpen]);

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const waLink = BUSINESS.whatsapp
    ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(orderText())}`
    : null;
  const telLink = BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, "")}` : null;

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setOrderStatus(null);
    try {
      const order = await submitOrder(customer, lines);
      setOrderStatus({ type: "ok", text: `Order ${order.id} received. Total: ${rs(order.total)}.` });
      clear();
    } catch (error) {
      setOrderStatus({
        type: "error",
        text: error instanceof Error ? `${error.message}. You can still call to order.` : "Could not submit. Please call to order.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-espresso/45 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <motion.aside
            initial={{ x: "102%" }}
            animate={{ x: 0 }}
            exit={{ x: "102%" }}
            transition={{ type: "spring", stiffness: 290, damping: 32 }}
            className="absolute inset-y-3 right-3 flex h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] max-w-md flex-col overflow-hidden rounded-[30px] border border-charcoal/10 bg-[#f8f1dd] shadow-[0_30px_80px_-20px_rgb(23_16_9/0.6)]"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Your order"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-charcoal/10 bg-[#f8f1dd]/95 px-5 py-4 backdrop-blur-sm">
              <h3 className="font-display text-[2rem] font-black leading-none text-charcoal">Your Order</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/12 text-charcoal transition-colors hover:text-tomato"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-8 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-2">
                    <ShoppingBag size={30} className="text-charcoal/40" />
                  </span>
                  <p className="font-display text-xl font-bold text-charcoal">Your plate is empty</p>
                  <p className="text-sm text-charcoal/55">Add something hot &amp; cheesy from the menu.</p>
                  <CTAButton
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => scrollToId("menu"), 250);
                    }}
                  >
                    Browse Menu
                  </CTAButton>
                </div>
              ) : (
                <>
                  <div className="px-4 py-3">
                    <ul className="space-y-3">
                      <AnimatePresence initial={false}>
                        {lines.map((l) => (
                          <motion.li
                            key={l.key}
                            layout
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="flex items-center gap-3 rounded-[22px] border border-charcoal/8 bg-[#f5ebcb] p-3 shadow-[0_8px_18px_-14px_rgba(23,16,9,0.4)]"
                          >
                            {l.img ? (
                              <img src={l.img} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" loading="lazy" />
                            ) : (
                              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gold/20 font-display text-lg font-black text-gold-deep">
                                {l.name[0]}
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-charcoal">
                                {l.name} {l.size && <span className="text-tomato">({l.size})</span>}
                              </p>
                              <p className="text-xs font-semibold text-gold-deep">{rs(l.unitPrice)} each</p>
                              <div className="mt-1.5 flex items-center gap-2">
                                <button onClick={() => dec(l.key)} aria-label={`Decrease ${l.name}`} className="grid h-6 w-6 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-tomato hover:text-tomato">
                                  <Minus size={12} />
                                </button>
                                <span className="w-5 text-center text-sm font-extrabold">{l.qty}</span>
                                <button onClick={() => inc(l.key)} aria-label={`Increase ${l.name}`} className="grid h-6 w-6 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-tomato hover:text-tomato">
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-sm font-extrabold text-charcoal">{rs(l.unitPrice * l.qty)}</span>
                              <button onClick={() => remove(l.key)} aria-label={`Remove ${l.name}`} className="text-charcoal/35 transition-colors hover:text-tomato">
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </div>

                  <div className="space-y-4 border-t border-charcoal/10 bg-[#f8f1dd]/95 px-5 pb-5 pt-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal/55">Subtotal</span>
                      <span className="font-display text-[2rem] font-black leading-none text-tomato">{rs(total)}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-charcoal/55">
                      {BUSINESS.services.join(" & ")} available — pay at the counter or on pickup.
                    </p>

                    <form onSubmit={placeOrder} className="grid gap-2.5">
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          required
                          minLength={2}
                          value={customer.name}
                          onChange={(e) => setCustomer((value) => ({ ...value, name: e.target.value }))}
                          placeholder="Your name"
                          aria-label="Your name"
                          className="min-w-0 rounded-2xl border border-charcoal/15 bg-[#efe2ad] px-3.5 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-tomato"
                        />
                        <input
                          required
                          type="tel"
                          value={customer.phone}
                          onChange={(e) => setCustomer((value) => ({ ...value, phone: e.target.value }))}
                          placeholder="Phone number"
                          aria-label="Phone number"
                          className="min-w-0 rounded-2xl border border-charcoal/15 bg-[#efe2ad] px-3.5 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-tomato"
                        />
                      </div>
                      <input
                        value={customer.address}
                        onChange={(e) => setCustomer((value) => ({ ...value, address: e.target.value }))}
                        placeholder="Delivery address (optional)"
                        aria-label="Delivery address"
                        className="rounded-2xl border border-charcoal/15 bg-[#efe2ad] px-3.5 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-tomato"
                      />
                      <button
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tomato px-5 py-3.5 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-espresso shadow-[0_14px_28px_-12px_rgba(116,198,95,0.72)] transition-colors hover:bg-tomato-deep hover:text-mozza disabled:cursor-wait disabled:opacity-60"
                      >
                        <ShoppingBag size={15} /> {submitting ? "Sending..." : "Place Order Online"}
                      </button>
                    </form>

                    {orderStatus && (
                      <p role="status" className={cn("rounded-xl px-3.5 py-2.5 text-xs font-semibold", orderStatus.type === "ok" ? "bg-basil/15 text-basil-deep" : "bg-cream-3 text-charcoal") }>
                        {orderStatus.text}
                      </p>
                    )}

                    {waLink && (
                      <CTAButton href={waLink} className="w-full !bg-[#1faa53] !shadow-[0_12px_30px_-10px_rgb(31_170_83/0.6)]">
                        Order on WhatsApp <ArrowRight size={16} />
                      </CTAButton>
                    )}
                    {telLink && (
                      <CTAButton href={telLink} variant="dark" className="w-full">
                        <Phone size={15} /> Call to Order
                      </CTAButton>
                    )}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={copyOrder}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] transition-all",
                          copied ? "border-basil bg-basil text-mozza" : "border-charcoal/20 bg-[#f6efdf] text-charcoal hover:border-gold-deep hover:text-gold-deep"
                        )}
                      >
                        <Copy size={14} /> {copied ? "Copied!" : "Copy Order"}
                      </button>
                      <a
                        href={BUSINESS.links.directions}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/20 px-4 py-3 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-charcoal transition-all hover:border-tomato hover:text-tomato"
                      >
                        <MapPin size={14} /> Directions
                      </a>
                    </div>
                    <button onClick={clear} className="w-full text-center text-xs font-semibold text-charcoal/40 transition-colors hover:text-tomato">
                      Clear order
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══ Mobile quick-action bar ═══════════════════════════════════════ */
export function MobileBar() {
  const { count, setOpen } = useCart();
  const callHref = BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, "")}` : BUSINESS.links.directions;
  return (
    <motion.div
      initial={{ y: 90 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 overflow-hidden rounded-2xl border border-charcoal/10 bg-espresso/95 shadow-[0_18px_40px_-12px_rgb(23_16_9/0.6)] backdrop-blur-xl md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <a
        href={callHref}
        target={BUSINESS.phone ? undefined : "_blank"}
        rel="noreferrer"
        className="flex flex-col items-center gap-1 py-3 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-cream/85 transition-colors hover:text-gold"
      >
        {BUSINESS.phone ? <Phone size={17} /> : <MapPin size={17} />}
        {BUSINESS.phone ? "Call" : "Directions"}
      </a>
      <button
        onClick={() => scrollToId("menu")}
        className="flex flex-col items-center gap-1 border-x border-cream/10 py-3 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-cream/85 transition-colors hover:text-gold"
      >
        <Menu size={17} /> Menu
      </button>
      <button
        onClick={() => setOpen(true)}
        className="relative flex flex-col items-center gap-1 bg-tomato py-3 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-mozza transition-colors hover:bg-tomato-deep"
      >
        <ShoppingBag size={17} /> Order Now
        {count > 0 && (
          <span className="absolute right-3 top-2 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[0.58rem] font-extrabold text-espresso">
            {count}
          </span>
        )}
      </button>
    </motion.div>
  );
}
