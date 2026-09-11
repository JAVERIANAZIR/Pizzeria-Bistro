import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "./cart";
import { BUSINESS, GALLERY, MENU, rs } from "./data";
import { CTAButton, FacebookIcon, InstagramIcon, PizzaMark, Reveal, scrollToId, SectionHead, TikTokIcon } from "./ui";

/* Deals transcribed from the official menu supplied by the owner. */
export function OfferBand() {
  const { add, setOpen } = useCart();
  const deals = MENU.find((category) => category.id === "deals")?.items ?? [];

  return (
    <section id="specials" className="noise ember-glow relative scroll-mt-20 overflow-hidden bg-espresso py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-soft via-gold to-gold-deep p-1 shadow-[0_40px_90px_-30px_rgb(116_198_95/0.5)]">
            <div className="relative overflow-hidden rounded-[2.3rem] bg-gradient-to-br from-[#fbf0c9] via-[#f6e8b8] to-[#a6dc86] px-8 py-12 sm:px-12 lg:px-16">
              {/* decorative marks */}
              <PizzaMark className="absolute -left-10 -top-10 h-44 w-44 text-tomato/15 animate-spin-slower" />
              <PizzaMark className="absolute -bottom-14 right-[38%] hidden h-56 w-56 text-brick/10 animate-spin-slower lg:block" />
              <span aria-hidden="true" className="pointer-events-none absolute -right-4 bottom-2 select-none font-display text-[7rem] font-black uppercase leading-none text-espresso/[0.05]">
                Deals
              </span>

              <div className="relative text-center">
                <span className="inline-flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.32em] text-brick">
                  <span className="h-px w-8 bg-brick/60" /> Official Menu Deals <span className="h-px w-8 bg-brick/60" />
                </span>
                <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight text-espresso sm:text-5xl lg:text-6xl">
                  Pizza <em className="italic text-tomato-deep">Deals.</em>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-espresso/70 sm:text-lg">
                  The exact combinations and prices shown on Pizzeria Bistro&apos;s official menu.
                </p>
              </div>

              <div className="relative mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {deals.map((deal, index) => (
                  <motion.article
                    key={deal.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.55 }}
                    className="group flex min-h-56 flex-col rounded-[1.6rem] border border-espresso/10 bg-mozza/85 p-5 shadow-card backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-tomato-deep">Deal {index + 1}</span>
                    <h3 className="mt-3 flex-1 font-display text-xl font-black leading-tight text-espresso">{deal.name}</h3>
                    <p className="mt-4 font-display text-3xl font-black text-tomato-deep">{rs(deal.price ?? 0)}</p>
                    <button
                      onClick={() => {
                        add(deal);
                        setOpen(true);
                      }}
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-4 py-3 text-[0.66rem] font-extrabold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-tomato-deep"
                    >
                      <ShoppingBag size={14} /> Add Deal
                    </button>
                  </motion.article>
                ))}
              </div>

              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <CTAButton href={BUSINESS.links.directions} variant="dark">
                  <MapPin size={15} /> Get Directions
                </CTAButton>
                <CTAButton onClick={() => scrollToId("menu")}>
                  View Full Menu
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══ Follow The Flavor — social wall (config-driven, never faked) ═ */
export function SocialSection() {
  const socials = [
    { id: "instagram", label: "Instagram", icon: InstagramIcon, url: BUSINESS.socials.instagram },
    { id: "facebook", label: "Facebook", icon: FacebookIcon, url: BUSINESS.socials.facebook },
    { id: "tiktok", label: "TikTok", icon: TikTokIcon, url: BUSINESS.socials.tiktok },
  ].filter((s) => s.url);

  const tiles = GALLERY.slice(0, 6);

  return (
    <section id="social" className="noise relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker="Social"
          title={
            <>
              Follow <em className="italic text-tomato">The Flavor.</em>
            </>
          }
          sub="The bakes, the pulls, the golden crusts — a taste of what lands on our tables every day."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((t, i) => (
            <Reveal key={t.src} delay={0.05 * i} className={i === 0 || i === 5 ? "row-span-2" : ""}>
              <a
                href={BUSINESS.links.googleProfile}
                target="_blank"
                rel="noreferrer"
                className={`group relative block overflow-hidden rounded-3xl shadow-card ${i === 0 || i === 5 ? "aspect-[3/4.6]" : "aspect-[3/4]"}`}
                aria-label={`${t.alt} — see more on Google`}
              >
                <img
                  src={t.src}
                  alt={t.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-tomato/80 via-espresso/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="line-clamp-2 text-[0.7rem] font-bold leading-snug">{t.alt}</span>
                  <ArrowUpRight size={16} className="shrink-0" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* honest social status */}
        <Reveal delay={0.15} className="mt-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border border-charcoal/8 bg-mozza px-8 py-8 text-center shadow-card">
            {socials.length > 0 ? (
              <>
                <p className="font-display text-xl font-black text-charcoal">We&apos;re social — say salam.</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Pizzeria Bistro on ${s.label}`}
                      className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/12 text-charcoal transition-all hover:-translate-y-1 hover:border-tomato hover:bg-tomato hover:text-mozza"
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="font-display text-xl font-black text-charcoal">Our official social pages are on the way.</p>
                <p className="-mt-2 text-sm leading-relaxed text-charcoal/60">
                  Until then, photos, updates and directions live on our Google profile — and the real experience lives
                  at {BUSINESS.address.short}.
                </p>
                <CTAButton href={BUSINESS.links.googleProfile} variant="dark">
                  <MapPin size={15} /> Find Us on Google
                </CTAButton>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
