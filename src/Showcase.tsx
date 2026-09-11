import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { IMG } from "./data";

/* ══ "Made To Make You Hungry." — cinematic horizontal showcase ═══ */

const PANELS = [
  { img: IMG.showcaseSlice, title: "The Cheese Pull", sub: "Margherita, straight from the oven" },
  { img: IMG.showcasePizza, title: "Loaded & Proud", sub: "Every topping, edge to edge" },
  { img: IMG.showcaseBurger, title: "The Crunch", sub: "Crispy fillet, toasted bun" },
  { img: IMG.showcaseShawarma, title: "The Wrap", sub: "Grilled, garlicky, gone fast" },
  { img: IMG.showcaseMargherita, title: "The Classic", sub: "Basil, mozzarella, tomato" },
  { img: IMG.showcaseFries, title: "The Sidekick", sub: "Golden & loaded with cheese" },
];

function Panel({ p, i }: { p: (typeof PANELS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setT({
      x: ((e.clientX - r.left) / r.width - 0.5) * 22,
      y: ((e.clientY - r.top) / r.height - 0.5) * 14,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="group relative h-[62vh] w-[82vw] shrink-0 snap-center overflow-hidden rounded-[2rem] shadow-plate sm:w-[26rem] lg:w-[30rem]"
      style={{ perspective: 900 }}
    >
      <motion.img
        src={p.img}
        alt={p.title}
        loading={i < 2 ? "eager" : "lazy"}
        decoding="async"
        animate={{ x: t.x, y: t.y, scale: t.x || t.y ? 1.12 : 1.08 }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />

      <div className="absolute left-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-cream/25 bg-espresso/40 font-display text-sm font-black text-gold backdrop-blur-md">
        {String(i + 1).padStart(2, "0")}
      </div>

      <div className="absolute inset-x-6 bottom-6 transition-transform duration-500 group-hover:-translate-y-1.5">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.26em] text-gold">{p.sub}</p>
        <h3 className="mt-1.5 font-display text-3xl font-black tracking-tight text-cream">{p.title}</h3>
      </div>
    </div>
  );
}

export function Showcase() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [40, -range]);
  const progress = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const header = (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.32em] text-gold">
            <span className="h-px w-8 bg-gold/70" /> Signature Bites
          </span>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Made To Make <em className="italic text-gold-soft">You Hungry.</em>
          </h2>
        </div>
        <p className="hidden items-center gap-2 pb-2 text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-cream/40 lg:flex">
          <MoveHorizontal size={16} className="text-gold" /> Keep scrolling — the table unfolds
        </p>
      </div>
    </div>
  );

  /* Touch / reduced-motion: native snap scroller */
  if (reduce) {
    return (
      <section className="noise relative bg-espresso py-24">
        <div className="space-y-12">{header}</div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5">
          {PANELS.map((p, i) => (
            <Panel key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapRef} className="noise relative h-[320vh] bg-espresso">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden py-10">
        {header}

        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 pl-5 will-change-transform sm:gap-7 sm:pl-8">
          {PANELS.map((p, i) => (
            <Panel key={p.title} p={p} i={i} />
          ))}
        </motion.div>

        {/* progress */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-cream/10">
            <motion.div style={{ scaleX: progress }} className="h-full w-full origin-left rounded-full bg-gradient-to-r from-gold to-tomato" />
          </div>
        </div>
      </div>

      {/* mobile snap fallback */}
      <span className="sr-only">Horizontal food gallery</span>
    </section>
  );
}
