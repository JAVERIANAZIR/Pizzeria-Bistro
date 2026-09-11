import { AnimatePresence, motion } from "framer-motion";
import { Check, GlassWater, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart";
import { MENU, minPrice, rs, type MenuItem } from "./data";
import { Reveal, SectionHead } from "./ui";
import { cn } from "./utils/cn";

/* ══ Food card ════════════════════════════════════════════════════ */
function FoodCard({ item, index }: { item: MenuItem; index: number }) {
  const { add, setOpen } = useCart();
  const [size, setSize] = useState<string | undefined>(item.sizes?.[1]?.label);
  const [added, setAdded] = useState(false);

  const price = item.sizes ? item.sizes.find((s) => s.label === size)?.price ?? minPrice(item) : item.price ?? 0;

  const addToCart = (thenOpen = false) => {
    add(item, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    if (thenOpen) setTimeout(() => setOpen(true), 350);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.55, delay: 0.05 * (index % 6), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-charcoal/8 bg-mozza shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {item.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-espresso shadow-lg">
            {item.tag}
          </span>
        )}
        <span className="absolute bottom-4 right-4 translate-y-3 rounded-full bg-mozza/95 px-4 py-2 font-display text-lg font-black text-tomato opacity-0 shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {rs(price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-black tracking-tight text-charcoal">{item.name}</h3>
        {item.desc ? <p className="mt-1.5 flex-1 text-[0.83rem] leading-relaxed text-charcoal/60">{item.desc}</p> : <div className="flex-1" />}

        {item.sizes && (
          <div className="mt-4 flex items-center gap-1.5" role="radiogroup" aria-label={`${item.name} size`}>
            {item.sizes.map((s) => (
              <button
                key={s.label}
                role="radio"
                aria-checked={size === s.label}
                onClick={() => setSize(s.label)}
                className={cn(
                  "grid h-8 min-w-8 place-items-center rounded-full border px-2 text-[0.7rem] font-extrabold transition-all duration-300",
                  size === s.label
                    ? "border-tomato bg-tomato text-espresso shadow-[0_6px_16px_-6px_rgb(116_198_95/0.7)]"
                    : "border-charcoal/15 text-charcoal/60 hover:border-gold-deep hover:text-gold-deep"
                )}
              >
                {s.label}
              </button>
            ))}
            <span className="ml-auto text-[0.6rem] font-bold uppercase tracking-[0.16em] text-charcoal/40">Size</span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-charcoal/12 pt-4">
          <div className="leading-none">
            {item.sizes && (
              <span className="block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-charcoal/40">
                Size {size} · from {rs(minPrice(item))}
              </span>
            )}
            <span className="font-display text-2xl font-black text-gold-deep transition-colors duration-300 group-hover:text-tomato">
              {rs(price)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCart(false)}
              aria-label={`Add ${item.name} to order`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] transition-all duration-300 active:scale-95",
                added
                  ? "bg-basil text-mozza"
                  : "bg-tomato text-espresso shadow-[0_10px_24px_-10px_rgb(116_198_95/0.7)] hover:-translate-y-0.5 hover:bg-tomato-deep hover:text-mozza"
              )}
            >
              {added ? <Check size={14} /> : <Plus size={14} />}
              {added ? "Added" : "Add"}
            </button>
            <button
              onClick={() => addToCart(true)}
              aria-label={`Order ${item.name} now`}
              className="rounded-full border border-charcoal/15 px-4 py-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-charcoal transition-all duration-300 hover:border-gold-deep hover:text-gold-deep active:scale-95"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ══ Beverage row (elegant list — no photo needed) ════════════════ */
function DrinkRow({ item, index }: { item: MenuItem; index: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group flex items-center gap-4 rounded-2xl border border-charcoal/8 bg-mozza px-6 py-5 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-card"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep transition-colors duration-300 group-hover:bg-tomato group-hover:text-mozza">
        <GlassWater size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg font-black text-charcoal">{item.name}</h3>
        <p className="truncate text-[0.8rem] text-charcoal/55">{item.desc}</p>
      </div>
      <span className="hidden flex-1 self-end pb-1.5 dotted-leader text-charcoal/25 sm:block" aria-hidden="true" />
      <span className="font-display text-xl font-black text-gold-deep">{rs(item.price ?? 0)}</span>
      <button
        onClick={() => {
          add(item);
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
        }}
        aria-label={`Add ${item.name}`}
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-300 active:scale-90",
          added ? "bg-basil text-mozza" : "bg-tomato text-mozza hover:bg-tomato-deep"
        )}
      >
        {added ? <Check size={16} /> : <Plus size={16} />}
      </button>
    </motion.li>
  );
}

/* ══ Menu section ═════════════════════════════════════════════════ */
export function MenuSection() {
  const [cat, setCat] = useState(MENU[0].id);
  const active = MENU.find((c) => c.id === cat) ?? MENU[0];
  const isDrinks = active.id === "drinks";

  return (
    <section id="menu" className="noise relative scroll-mt-20 overflow-hidden bg-cream py-24 sm:py-32">
      {/* decorative side word */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 top-40 hidden select-none font-display text-[9rem] font-black uppercase leading-none text-charcoal/[0.045] [writing-mode:vertical-rl] xl:block">
        Menu
      </span>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker="The Menu"
          title={
            <>
              Crafted To <em className="italic text-tomato">Crave.</em>
            </>
          }
          sub="Hand-finished pizzas, crispy fast food and hot sides — prepared fresh when you order, for dine-in or takeaway."
        />

        {/* category tabs */}
        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Menu categories">
            {MENU.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] transition-colors duration-300 sm:px-6 sm:py-3",
                  cat === c.id ? "text-mozza" : "text-charcoal/60 hover:text-tomato"
                )}
              >
                {cat === c.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-tomato shadow-[0_10px_25px_-8px_rgb(116_198_95/0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {c.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[0.58rem] font-extrabold",
                      cat === c.id ? "bg-mozza/25 text-mozza" : "bg-charcoal/8 text-charcoal/45"
                    )}
                  >
                    {c.items.length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* items */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {isDrinks ? (
              <motion.ul key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-3xl space-y-3">
                {active.items.map((item, i) => (
                  <DrinkRow key={item.id} item={item} index={i} />
                ))}
              </motion.ul>
            ) : (
              <motion.div
                key={cat}
                layout
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {active.items.map((item, i) => (
                  <FoodCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/45">
            Official menu prices from the supplied Pizzeria Bistro menu · S = Small · M = Medium · L = Large · F = Family
          </p>
        </Reveal>
      </div>
    </section>
  );
}
