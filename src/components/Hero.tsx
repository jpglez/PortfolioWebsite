import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import HeroVideo from "./HeroVideo";
import { useLanguage } from "../i18n";

interface GradientButtonProps {
  children: ReactNode;
  solid?: boolean;
  href?: string;
  onClick?: () => void;
}

function GradientButton({ children, solid, href, onClick }: GradientButtonProps) {
  const base =
    "group relative inline-flex items-center rounded-full text-sm px-7 py-3.5 transition-all duration-200 hover:scale-105 font-body";

  const inner = solid
    ? "bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary"
    : "border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent";

  const content = (
    <>
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)",
          padding: "2px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${inner}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${inner}`}>
      {content}
    </button>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % t.hero.roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [t.hero.roles.length]);

  const scrollToWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFooter = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <HeroVideo overlayClass="bg-black/20" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          {t.hero.collection}
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Juan Pablo González
        </h1>

        <p className="blur-in text-base md:text-lg text-muted mb-4">
          {t.hero.intro}{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className="font-display italic text-text-primary inline-block"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {t.hero.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>{" "}
          {t.hero.based}
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          {t.hero.description}
        </p>

        <div className="blur-in flex items-center justify-center gap-4 flex-wrap">
          <GradientButton solid onClick={scrollToWorks}>
            {t.hero.seeWorks}
          </GradientButton>
          <GradientButton onClick={scrollToFooter}>
            {t.hero.reachOut}
          </GradientButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          {t.hero.scroll}
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
