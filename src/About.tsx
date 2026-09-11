import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin, ShoppingBag, Star, UtensilsCrossed } from "lucide-react";
import { useRef } from "react";
import { BUSINESS, IMG } from "./data";
import { Reveal, Steam } from "./ui";

/* ══ About — editorial story, verified facts only ═════════════════ */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -50]);
  const yCard = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-15, 30]);

  return (
    <section id="about" ref={ref} className="noise relative scroll-mt-20 overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Editorial copy ── */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.32em] text-tomato">
              <span className="h-px w-8 bg-tomato/60" /> Our Story
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight text-charcoal sm:text-5xl">
              Hot From The Oven, In The <em className="italic text-tomato">Heart</em> Of Mandi Bahauddin.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-charcoal/70 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-tomato">
              {BUSINESS.name} is a local pizza and fast-food kitchen at {BUSINESS.address.short} — {BUSINESS.address.landmark}, in{" "}
              {BUSINESS.address.area}. Being part of this city&apos;s everyday food life is what drives us: dough worked by
              hand, toppings that don&apos;t hold back, and cheese that actually stretches.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-5 text-base leading-relaxed text-charcoal/65">
              No long legends — just a simple promise: every order is made fresh, served properly hot, and finished the
              way good pizza should be. Take a seat inside, or carry your box home while it&apos;s still steaming.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <blockquote className="mt-8 border-l-4 border-gold pl-5 font-display text-2xl font-bold italic leading-snug text-brick">
              “Fresh, hot and delicious — that&apos;s the whole idea.”
            </blockquote>
          </Reveal>

          {/* verified fact chips */}
          <Reveal delay={0.34}>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Star, top: "4.2 / 5", sub: "Google rating" },
                { icon: UtensilsCrossed, top: "Dine-In", sub: "Eat with us" },
                { icon: ShoppingBag, top: "Takeaway", sub: "Grab & go" },
                { icon: MapPin, top: "Qainchi Mor", sub: "Old Rasul Rd" },
              ].map((s) => (
                <div
                  key={s.sub}
                  className="group rounded-2xl border border-charcoal/8 bg-mozza p-4 text-center shadow-card transition-all duration-400 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
                >
                  <s.icon size={18} className="mx-auto text-tomato transition-transform duration-400 group-hover:scale-110" />
                  <p className="mt-2 font-display text-base font-black text-charcoal">{s.top}</p>
                  <p className="mt-0.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-charcoal/45">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Image collage — the craft ── */}
        <div className="relative mx-auto w-full max-w-xl">
          <motion.div style={{ y: yImg }} className="relative overflow-hidden rounded-[2.2rem] shadow-plate">
            <img
              src={IMG.aboutOven}
              alt="Pizzas baking inside a wood-fired oven with flames"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105 sm:aspect-[5/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
            <Steam className="left-8 top-8" count={2} />
          </motion.div>

          <motion.div
            style={{ y: yCard }}
            className="absolute -bottom-8 -left-4 w-44 overflow-hidden rounded-3xl border-4 border-cream shadow-lift sm:-left-10 sm:w-56"
          >
            <img src={IMG.aboutStone} alt="Pizza baking in a traditional stone oven" loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
          </motion.div>

          <div className="absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border border-charcoal/8 bg-mozza/95 px-5 py-4 shadow-lift backdrop-blur-sm animate-float-y sm:-right-6" style={{ ["--fl-rot" as string]: "2deg" }}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-tomato/10 text-tomato">
              <UtensilsCrossed size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-black text-charcoal">Made to order</p>
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-charcoal/45">Fresh · Hot · Honest</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
