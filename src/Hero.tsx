import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Flame, MapPin, Phone, ShoppingBag, UtensilsCrossed } from "lucide-react";
import type { MouseEvent } from "react";
import { useCart } from "./cart";
import { BUSINESS, IMG } from "./data";
import { CTAButton, Magnetic, PizzaMark, RatingStars, scrollToId, Steam } from "./ui";

/* ══ HERO ═════════════════════════════════════════════════════════ */
export function Hero() {
  const reduce = useReducedMotion();
  const { count, setOpen } = useCart();

  /* pointer-driven 3D plate */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 55, damping: 16 });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 55, damping: 16 });
  const shiftX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 40, damping: 18 });
  const shiftY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 40, damping: 18 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const lineUp = (delay: number) => ({
    initial: { y: "110%" },
    animate: { y: 0 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section
      id="home"
      onMouseMove={onMove}
      className="noise ember-glow relative flex min-h-[100svh] items-center overflow-hidden bg-espresso pb-28 pt-32 lg:pb-24"
    >
      {/* ambient glow behind plate */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(116_198_95/0.18),transparent_60%)] animate-pulse-glow" />

      {/* giant ghost word */}
      <span aria-hidden="true" className="text-outline pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[19vw] font-black uppercase leading-none opacity-60 lg:text-[13rem]">
        Pizzeria
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto flex w-fit flex-wrap items-center justify-center gap-2.5 lg:mx-0"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-cream/80 backdrop-blur-sm">
              <UtensilsCrossed size={12} className="text-gold" />
              Pizza · Fast Food · Dine-In · Takeaway · Home Delivery
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            lang="ur"
            dir="rtl"
            className="mt-5 font-urdu text-lg leading-loose text-gold/90"
          >
            {BUSINESS.urduAccent}
          </motion.p>

          <h1 className="mt-3 font-display font-black tracking-tight text-cream">
            <span className="block overflow-hidden pb-1">
              <motion.span {...lineUp(0.45)} className="block text-[11.5vw] leading-[0.98] sm:text-6xl lg:text-7xl">
                Freshly Baked.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span {...lineUp(0.58)} className="block text-[11.5vw] leading-[0.98] sm:text-6xl lg:text-7xl">
                Seriously
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span {...lineUp(0.71)} className="block text-[11.5vw] leading-[0.98] sm:text-6xl lg:text-7xl">
                <em className="font-display italic text-transparent [background:linear-gradient(100deg,#fbf0c9,#a6dc86_45%,#74c65f)] [-webkit-background-clip:text] [background-clip:text]">
                  Delicious.
                </em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg lg:mx-0"
          >
            Welcome to <strong className="font-bold text-gold-soft">Pizzeria Bistro</strong> — bringing fresh, hot and
            delicious food to Mandi Bahauddin. Baked to order at Qainchi Mor, Old Rasul Road.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <Magnetic>
              <CTAButton onClick={() => (count > 0 ? setOpen(true) : scrollToId("menu"))}>
                <ShoppingBag size={16} /> Order Now
              </CTAButton>
            </Magnetic>
            <Magnetic>
              <CTAButton variant="ghost" onClick={() => scrollToId("menu")}>
                View Menu
              </CTAButton>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm lg:justify-start"
          >
            <a
              href={BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, "")}` : BUSINESS.links.directions}
              target={BUSINESS.phone ? undefined : "_blank"}
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-[0.72rem] text-cream/75 transition-colors hover:text-gold"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-all group-hover:border-gold group-hover:text-gold">
                {BUSINESS.phone ? <Phone size={14} /> : <MapPin size={14} />}
              </span>
              {BUSINESS.phone ? "Call Us" : "Find Us"}
            </a>
            <a
              href={BUSINESS.links.directions}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-[0.72rem] text-cream/75 transition-colors hover:text-gold"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-all group-hover:border-gold group-hover:text-gold">
                <MapPin size={14} />
              </span>
              Get Directions
            </a>

            {/* verified Google rating */}
            <a href={BUSINESS.links.googleProfile} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 backdrop-blur-sm transition-colors hover:border-gold/50">
              <span className="font-display text-lg font-black text-gold">{BUSINESS.rating.value}</span>
              <span className="flex flex-col items-start gap-0.5">
                <RatingStars size={11} />
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cream/55">
                  {BUSINESS.rating.count} Google reviews
                </span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* ── The plate ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="relative mx-auto w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-[30rem]"
          style={{ perspective: 1100 }}
        >
          <motion.div style={reduce ? undefined : { rotateX: rX, rotateY: rY }} className="relative aspect-square">
            {/* pan rings */}
            <div className="absolute inset-[-4%] rounded-full border border-dashed border-gold/25" />
            <div className="absolute inset-[-10%] rounded-full border border-cream/8" />

            {/* glow */}
            <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_35%,rgb(116_198_95/0.35),transparent_65%)] blur-2xl" />

            {/* pizza — slow settle 1.06 → 1 + eternal slow spin */}
            <motion.div
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden rounded-full shadow-plate ring-1 ring-cream/20"
            >
              <motion.img
                src={IMG.heroPizza}
                alt="Pepperoni pizza with green chillies on melted cheese, overhead view"
                className="h-full w-full object-cover animate-spin-slower"
                style={reduce ? { animation: "none" } : undefined}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_90px_30px_rgb(23_16_9/0.55)]" />
            </motion.div>

            <Steam className="left-1/2 top-[-5%] -translate-x-1/2" />

            {/* parallax floaters */}
            <motion.div style={reduce ? undefined : { x: shiftX, y: shiftY }} className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-6 top-[16%] rounded-2xl border border-cream/15 bg-espresso/70 px-4 py-3 shadow-plate backdrop-blur-md animate-float-y sm:-left-12" style={{ ["--fl-rot" as string]: "-4deg" }}>
                <p className="flex items-center gap-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-gold">
                  <Flame size={12} /> Hot · Fresh
                </p>
                <p className="mt-1 font-display text-sm font-bold text-cream">Out of the oven</p>
              </div>

              <div className="absolute -right-4 bottom-[14%] rounded-2xl border border-cream/15 bg-espresso/70 px-4 py-3 shadow-plate backdrop-blur-md animate-float-y [animation-delay:1.4s] sm:-right-10" style={{ ["--fl-rot" as string]: "3deg" }}>
                <p className="font-display text-sm font-bold text-cream">Golden cheese pull</p>
                <p className="mt-1 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-cream/55">in every slice</p>
              </div>

              <span className="absolute -top-3 left-[22%] h-3.5 w-3.5 rounded-full bg-basil shadow-lg animate-float-y [animation-delay:0.7s]" />
              <span className="absolute -right-2 top-[38%] h-4 w-4 rounded-full bg-tomato shadow-lg animate-float-y [animation-delay:2s]" />
              <PizzaMark className="absolute -left-2 bottom-[4%] h-11 w-11 text-gold animate-float-y [animation-delay:1s]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToId("menu")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/45 transition-colors hover:text-gold lg:flex"
        aria-label="Scroll to menu"
      >
        <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-9 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.button>
    </section>
  );
}

/* ══ Flavour marquee ══════════════════════════════════════════════ */
const WORDS = ["Hot", "Fresh", "Cheesy", "Premium", "Authentic"];

export function TasteMarquee() {
  const row = [...WORDS, ...WORDS, ...WORDS];
  return (
    <div className="relative z-20 -my-7 overflow-hidden" aria-hidden="true">
      <div className="-rotate-[1.4deg] scale-[1.03] border-y border-tomato-deep/60 bg-tomato py-4 shadow-[0_20px_50px_-20px_rgb(116_198_95/0.55)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center gap-10">
              {row.map((w, i) => (
                <span key={`${half}-${i}`} className="flex items-center gap-10">
                  <span
                    className={
                      i % 2
                        ? "font-display text-2xl font-black uppercase italic tracking-tight text-mozza/25 [-webkit-text-stroke:1px_rgb(255_250_239/0.55)]"
                        : "font-display text-2xl font-black uppercase italic tracking-tight text-mozza"
                    }
                  >
                    {w}
                  </span>
                  <PizzaMark className="h-5 w-5 text-mozza/80" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
