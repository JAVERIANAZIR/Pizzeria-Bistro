import { Clock, Globe2, MapPin, Navigation, Phone, ShoppingBag, Star, UtensilsCrossed } from "lucide-react";
import { BUSINESS } from "./data";
import { Logo, CTAButton, Reveal, SectionHead, scrollToId } from "./ui";

/* ══ Contact ══════════════════════════════════════════════════════ */
export function ContactSection() {
  const tel = BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, "")}` : null;

  return (
    <section id="contact" className="noise relative scroll-mt-20 overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker="Find Us"
          title={
            <>
              Come Say <em className="italic text-tomato">Salam.</em>
            </>
          }
          sub="We're right where Old Rasul Road meets Qainchi Mor — easy to reach, hard to leave hungry."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* info card */}
          <Reveal>
            <div className="noise ember-glow relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-espresso p-8 text-cream shadow-plate sm:p-10">
              <Logo />

              <ul className="mt-9 space-y-6">
                <li className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tomato/15 text-tomato-soft">
                    <MapPin size={19} />
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">Address</p>
                    <p className="mt-1.5 max-w-sm text-[0.95rem] leading-relaxed text-cream/85">
                      {BUSINESS.address.short}, {BUSINESS.address.landmark}, {BUSINESS.address.area},{" "}
                      {BUSINESS.address.city} {BUSINESS.address.postalCode}, Pakistan
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
                    <UtensilsCrossed size={19} />
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">Services</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {BUSINESS.services.map((s) => (
                        <span key={s} className="rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-cream/80">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-basil/20 text-basil">
                    <Clock size={19} />
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">Hours</p>
                    {BUSINESS.openingHours ? (
                      <p className="mt-1.5 text-[0.95rem] text-cream/85">{BUSINESS.openingHours}</p>
                    ) : (
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-cream/85">
                        See today&apos;s confirmed timings on{" "}
                        <a href={BUSINESS.links.googleProfile} target="_blank" rel="noreferrer" className="font-bold text-gold underline-offset-4 hover:underline">
                          our Google profile
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </li>

                {tel && (
                  <li className="flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream/10 text-cream">
                      <Phone size={19} />
                    </span>
                    <div>
                      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">Phone</p>
                      <a href={tel} className="mt-1.5 block text-[0.95rem] font-bold text-cream hover:text-gold">
                        {BUSINESS.phone}
                      </a>
                    </div>
                  </li>
                )}

                <li className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tomato/15 text-tomato-soft">
                    <Globe2 size={19} />
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">Website</p>
                    <a href={BUSINESS.website} className="mt-1.5 block text-[0.95rem] font-bold text-cream hover:text-gold">
                      pizzeriabistro.pk
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
                    <Star size={19} />
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">Rated</p>
                    <a href={BUSINESS.links.googleProfile} target="_blank" rel="noreferrer" className="mt-1.5 block text-[0.95rem] text-cream/85 transition-colors hover:text-gold">
                      {BUSINESS.rating.value} / 5 on Google · {BUSINESS.rating.count} reviews
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-cream/10 pt-8">
                {tel && (
                  <CTAButton href={tel}>
                    <Phone size={15} /> Call Now
                  </CTAButton>
                )}
                <CTAButton href={BUSINESS.links.directions} variant={tel ? "ghost" : "primary"}>
                  <Navigation size={15} /> Get Directions
                </CTAButton>
                <CTAButton variant="gold" onClick={() => scrollToId("menu")}>
                  <ShoppingBag size={15} /> Order Now
                </CTAButton>
              </div>
            </div>
          </Reveal>

          {/* map */}
          <Reveal delay={0.12}>
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-plate">
              <iframe
                title="Map — Pizzeria Bistro, Qainchi Mor, Old Rasul Road, Mandi Bahauddin"
                src={BUSINESS.links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full [filter:sepia(0.28)_saturate(1.15)_contrast(1.02)]"
              />
              <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-charcoal/10 bg-mozza/95 px-5 py-4 shadow-lift backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tomato text-mozza">
                  <MapPin size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-black text-charcoal">Pizzeria Bistro</p>
                  <p className="truncate text-xs text-charcoal/55">
                    {BUSINESS.address.short} · near Nabeel Hospital, Shadman Town
                  </p>
                </div>
                <a
                  href={BUSINESS.links.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto ml-auto shrink-0 rounded-full bg-espresso px-4 py-2.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-tomato"
                >
                  Navigate
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══ Footer ═══════════════════════════════════════════════════════ */
export function Footer() {
  const quick = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <footer className="noise ember-glow relative overflow-hidden bg-espresso pb-24 pt-20 text-cream md:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-cream/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Fresh pizza and fast food from the heart of Mandi Bahauddin — baked when you order, served properly hot.
              Dine in, take it away, or call for home delivery.
            </p>
            <p lang="ur" dir="rtl" className="mt-4 font-urdu text-base leading-loose text-gold/85">
              {BUSINESS.urduAccent}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-[0.68rem] font-extrabold uppercase tracking-[0.26em] text-gold">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quick.map((q) => (
                <li key={q.id}>
                  <button
                    onClick={() => scrollToId(q.id)}
                    className="text-sm text-cream/65 transition-all hover:pl-1.5 hover:text-gold"
                  >
                    {q.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.68rem] font-extrabold uppercase tracking-[0.26em] text-gold">Visit Us</h3>
            <address className="mt-5 text-sm not-italic leading-relaxed text-cream/65">
              {BUSINESS.address.short}
              <br />
              {BUSINESS.address.landmark}, {BUSINESS.address.area}
              <br />
              {BUSINESS.address.city} {BUSINESS.address.postalCode}, Pakistan
            </address>
            <a
              href={BUSINESS.links.directions}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold underline-offset-4 hover:underline"
            >
              <Navigation size={14} /> Get Directions
            </a>
            <a href={BUSINESS.website} className="mt-3 flex items-center gap-2 text-sm font-bold text-gold underline-offset-4 hover:underline">
              <Globe2 size={14} /> pizzeriabistro.pk
            </a>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-extrabold uppercase tracking-[0.26em] text-gold">Good To Know</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/65">
              <li className="flex items-center gap-2.5">
                <UtensilsCrossed size={14} className="text-tomato-soft" /> {BUSINESS.services.join(" & ")}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-tomato-soft" /> Confirmed timings on Google
              </li>
              <li className="flex items-center gap-2.5">
                <Star size={14} className="text-tomato-soft" /> {BUSINESS.rating.value} · {BUSINESS.rating.count} Google
                reviews
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} Pizzeria Bistro — Mandi Bahauddin. All rights reserved.
          </p>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.26em] text-cream/35">
            Hot · Fresh · Cheesy · Premium · Authentic
          </p>
        </div>
      </div>
    </footer>
  );
}
