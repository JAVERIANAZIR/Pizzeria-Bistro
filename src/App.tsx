import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import { About } from "./About";
import { CartProvider } from "./cart";
import { CartDrawer, MobileBar, Navbar } from "./chrome";
import { ContactSection, Footer } from "./Closing";
import { GallerySection } from "./GallerySection";
import { Hero, TasteMarquee } from "./Hero";
import { MenuSection } from "./MenuSection";
import { OfferBand, SocialSection } from "./OfferSocial";
import { Showcase } from "./Showcase";

export default function App() {
  /* Lenis buttery smooth scroll — skipped for reduced-motion users */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Navbar />
        <main>
          <Hero />
          <TasteMarquee />
          <MenuSection />
          <Showcase />
          <About />
          <GallerySection />
          <OfferBand />
          <SocialSection />
          <ContactSection />
        </main>
        <Footer />
        <CartDrawer />
        <MobileBar />
      </CartProvider>
    </MotionConfig>
  );
}
