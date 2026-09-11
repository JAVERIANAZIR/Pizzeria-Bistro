import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Shrink, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BUSINESS, GALLERY, type GalleryShot } from "./data";
import { lockScroll, Reveal, SectionHead } from "./ui";
import { cn } from "./utils/cn";

/* ══ Lightbox ═════════════════════════════════════════════════════ */
function Lightbox({
  shots,
  index,
  onClose,
  onNav,
}: {
  shots: GalleryShot[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const [zoom, setZoom] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = shots[index];
  const big = shot.src.replace(/w=\d+/, "w=1600");

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [onClose, onNav]);

  useEffect(() => setZoom(false), [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${shot.alt}`}
      onClick={onClose}
    >
      {/* controls */}
      <div className="absolute right-4 top-4 z-10 flex gap-2 sm:right-6 sm:top-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoom((z) => !z);
          }}
          aria-label={zoom ? "Zoom out" : "Zoom in"}
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
        >
          {zoom ? <Shrink size={18} /> : <Expand size={18} />}
        </button>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close photo viewer"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-tomato-soft hover:text-tomato-soft"
        >
          <X size={18} />
        </button>
      </div>

      <span className="absolute left-5 top-6 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-cream/50">
        {index + 1} — {shots.length}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream transition-all hover:border-gold hover:text-gold sm:left-6"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream transition-all hover:border-gold hover:text-gold sm:right-6"
      >
        <ChevronRight size={22} />
      </button>

      <div className={cn("max-h-full max-w-5xl", zoom && "overflow-auto")} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={shot.src}
            src={big}
            alt={shot.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: zoom ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) onNav(1);
              if (info.offset.x > 70) onNav(-1);
            }}
            onClick={() => setZoom((z) => !z)}
            className={cn(
              "max-h-[78vh] w-auto max-w-full select-none rounded-2xl shadow-plate",
              zoom ? "cursor-zoom-out" : "cursor-zoom-in"
            )}
          />
        </AnimatePresence>
        <p className="mt-4 text-center text-sm text-cream/60">{shot.alt}</p>
      </div>
    </motion.div>
  );
}

/* ══ Gallery ══════════════════════════════════════════════════════ */
const FILTERS = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "kitchen", label: "Kitchen Craft" },
  { id: "moments", label: "Moments" },
] as const;

export function GallerySection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shots = useMemo(() => (filter === "all" ? GALLERY : GALLERY.filter((g) => g.cat === filter)), [filter]);

  const nav = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? null : (i + dir + shots.length) % shots.length)),
    [shots.length]
  );

  const ratio = (i: number, tall?: boolean) =>
    tall ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]";

  return (
    <section id="gallery" className="noise ember-glow relative scroll-mt-20 bg-espresso py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          dark
          kicker="The Gallery"
          title={
            <>
              A Feast For <em className="italic text-gold-soft">The Eyes.</em>
            </>
          }
          sub="Fresh bakes, the oven's glow and those stretchy cheese moments — tap any photo to step closer."
        />

        {/* filters */}
        <Reveal delay={0.12} className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  setLightbox(null);
                }}
                aria-pressed={filter === f.id}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] transition-colors duration-300",
                  filter === f.id ? "text-espresso" : "text-cream/55 hover:text-gold"
                )}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="gal-pill"
                    className="absolute inset-0 rounded-full bg-gold shadow-[0_10px_25px_-8px_rgb(116_198_95/0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* masonry */}
        <motion.div layout className="masonry mt-12 columns-2 md:columns-3">
          <AnimatePresence mode="popLayout">
            {shots.map((g, i) => (
              <motion.button
                layout
                key={g.src}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(i)}
                aria-label={`Open photo: ${g.alt}`}
                className={cn(
                  "group relative mb-5 block w-full overflow-hidden rounded-3xl shadow-card focus-visible:outline-tomato-soft",
                  ratio(i, g.tall)
                )}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left text-[0.78rem] font-semibold leading-snug text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.alt}
                </span>
                <span className="absolute right-4 top-4 grid h-9 w-9 scale-75 place-items-center rounded-full bg-mozza/90 text-charcoal opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Expand size={15} />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1} className="mt-8 text-center">
          <a
            href={BUSINESS.links.googleProfile}
            target="_blank"
            rel="noreferrer"
            className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-cream/40 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            See live photos on our Google profile
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox !== null && shots[lightbox] && (
          <Lightbox shots={shots} index={lightbox} onClose={() => setLightbox(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </section>
  );
}
