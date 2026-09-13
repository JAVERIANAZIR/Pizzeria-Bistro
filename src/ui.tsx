import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "./utils/cn";

/* Seal and wordmark redrawn from the supplied official menu artwork. */
export function PizzaMark({ className }: { className?: string }) {
  // Try loading the external logo first; if it fails, render the original inline SVG.
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <circle cx="50" cy="50" r="47" fill="#fbf0c9" stroke="#171713" strokeWidth="3" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#74c65f" strokeWidth="3" />
        <path d="M18 54c8-9 20-14 32-14s24 5 32 14v20H18z" fill="#171713" />
        <path d="M27 39 50 23l23 16" fill="none" stroke="#171713" strokeWidth="3" strokeLinecap="round" />
        <circle cx="38" cy="36" r="6" fill="#74c65f" stroke="#171713" strokeWidth="2" />
        <circle cx="62" cy="36" r="6" fill="#74c65f" stroke="#171713" strokeWidth="2" />
        <path d="M25 82h50M31 87h38" stroke="#171713" strokeWidth="2" strokeLinecap="round" />
        <text x="50" y="64" fill="#fbf0c9" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="Arial">PIZZERIA</text>
        <text x="50" y="74" fill="#74c65f" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="Georgia">BISTRO</text>
        <text x="50" y="17" fill="#171713" textAnchor="middle" fontSize="6.5" fontWeight="800" fontFamily="Arial">SLICE OF HAPPINESS</text>
        <text x="50" y="91.5" fill="#171713" textAnchor="middle" fontSize="5.5" fontWeight="800" fontFamily="Arial">EST. 2026</text>
      </svg>
    );
  }

  return (
    <img
      src="/images/pizzeria-logo.png"
      className={className}
      alt="Pizzeria Bistro logo"
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <a href="#home" className={cn("group flex items-center gap-2.5", className)} aria-label="Pizzeria Bistro home">
      <PizzaMark className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
      <span className="leading-none">
        <span className="block text-[1.05rem] font-black uppercase tracking-[-0.04em] text-tomato">
          Pizzeria <em className={cn("font-display text-[1.08rem] font-black normal-case tracking-tight", dark ? "text-charcoal" : "text-cream")}>Bistro</em>
        </span>
        <span className={cn("mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.28em]", dark ? "text-charcoal/60" : "text-cream/60")}>
          Mandi Bahauddin
        </span>
      </span>
    </a>
  );
}

/* ── Scroll reveal wrapper ───────────────────────────────────────── */
const rise: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={rise}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {children}
    </Tag>
  );
}

/* ── Section heading ─────────────────────────────────────────────── */
export function SectionHead({
  kicker,
  title,
  sub,
  dark = false,
  align = "center",
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.32em]",
            dark ? "text-gold" : "text-tomato"
          )}
        >
          <span className={cn("h-px w-8", dark ? "bg-gold/70" : "bg-tomato/60")} />
          {kicker}
          {align === "center" && <span className={cn("h-px w-8", dark ? "bg-gold/70" : "bg-tomato/60")} />}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-4 font-display text-4xl font-black leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-6xl",
            dark ? "text-cream" : "text-charcoal"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-cream/70" : "text-charcoal/65")}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Steam wisps rising above hot food ───────────────────────────── */
export function Steam({ className, count = 3 }: { className?: string; count?: number }) {
  return (
    <div className={cn("pointer-events-none absolute flex justify-center gap-5", className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block h-14 w-[7px] rounded-full bg-gradient-to-t from-transparent via-cream/50 to-cream/80 blur-[5px] animate-steam-rise"
          style={{ animationDelay: `${i * 1.1}s` }}
        />
      ))}
    </div>
  );
}

/* ── Magnetic hover wrapper (desktop nicety) ─────────────────────── */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform duration-300 ease-out will-change-transform">
      {children}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────── */
export function CTAButton({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark" | "gold";
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const styles = {
    primary:
      "bg-tomato text-espresso shadow-[0_12px_30px_-10px_rgb(116_198_95/0.65)] hover:bg-tomato-deep hover:text-mozza hover:shadow-[0_18px_40px_-12px_rgb(116_198_95/0.7)]",
    gold: "bg-gold text-espresso shadow-[0_12px_30px_-10px_rgb(116_198_95/0.6)] hover:bg-gold-soft",
    dark: "bg-espresso text-cream hover:bg-charcoal shadow-[0_12px_30px_-12px_rgb(23_16_9/0.8)]",
    ghost:
      "border border-cream/35 text-cream hover:border-cream hover:bg-cream hover:text-espresso backdrop-blur-sm",
  }[variant];

  const cls = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.8rem] font-extrabold uppercase tracking-[0.14em]",
    "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    styles,
    className
  );

  if (href)
    return (
      <a href={href} className={cls} aria-label={ariaLabel} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ── Google rating stars (4.2 from 5 reviews — verified research) ── */
export function RatingStars({ size = 14, className }: { size?: number; className?: string }) {
  const pct = (4.2 / 5) * 100;
  return (
    <span className={cn("relative inline-flex", className)} aria-label="Rated 4.2 out of 5 on Google">
      <span className="flex gap-0.5 text-cream/25">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span className="absolute inset-0 flex gap-0.5 overflow-hidden text-gold" style={{ width: `${pct}%` }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="shrink-0" />
        ))}
      </span>
    </span>
  );
}

/* ── Social brand marks (lucide no longer ships brand icons) ─────── */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v3.396h-1.72c-1.49 0-1.955.92-1.955 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

/* ── Scroll lock (pauses Lenis + native scroll while overlays open) ─ */
export const lockScroll = (lock: boolean) => {
  const l = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
  if (lock) l?.stop();
  else l?.start();

  const root = document.documentElement;
  root.style.overflow = lock ? "hidden" : "";
  root.style.height = lock ? "100%" : "";
  document.body.style.overflow = lock ? "hidden" : "";
  document.body.style.height = lock ? "100%" : "";
};

/* ── Smooth scroll helper ────────────────────────────────────────── */
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
};
