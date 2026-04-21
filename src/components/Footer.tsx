import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import HeroVideo from "./HeroVideo";
import { useLanguage } from "../i18n";

const SOCIALS = [
  { label: "Twitter / X", href: "https://x.com/jp_glez_smg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/juan-pablo-gonzalez-sanmiguel-50b26a340" },
  { label: "Dribbble", href: "https://dribbble.com/juan-pablo-gonzalez-sanmiguel" },
  { label: "GitHub", href: "https://github.com/jpglez" },
];

export default function Footer() {
  const { t, openEmail } = useLanguage();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background video */}
      <HeroVideo overlayClass="bg-black/60" flipY />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Marquee */}
        <div className="overflow-hidden mb-12 md:mb-16 -mx-6 md:-mx-10 lg:-mx-16">
          <div ref={marqueeRef} className="whitespace-nowrap inline-block">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10 select-none"
              >
                {t.footer.marquee}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-sm text-muted max-w-sm mx-auto mb-8">{t.footer.cta}</p>
          <motion.button
            onClick={openEmail}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-bg border-2 border-stroke rounded-full text-text-primary text-sm transition-all duration-200 hover:scale-105"
            whileTap={{ scale: 0.97 }}
          >
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
            <span className="relative z-10">{t.nav.sayHi}</span>
            <span className="relative z-10 text-muted group-hover:text-text-primary transition-colors">
              <svg
                className="w-4 h-4"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9L9 3M9 3H4.5M9 3V7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Footer bar */}
        <div className="border-t border-stroke pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Socials */}
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-all duration-200 hover:-translate-y-0.5"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Available indicator */}
          <div className="flex items-center gap-2">
            <div className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
              <span className="relative block w-2 h-2 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-muted">{t.footer.available}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
