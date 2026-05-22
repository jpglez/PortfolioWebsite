import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";

const NAV_LINKS = [
  { key: "home", section: "hero" },
  { key: "work", section: "works" },
  { key: "stack", section: "stack" },
  { key: "resume", section: "stats" },
] as const;

type NavKey = (typeof NAV_LINKS)[number]["key"];

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavKey>("home");
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (key: NavKey, section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(key);
  };

  const scrollToFooter = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-2 sm:px-4"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <button
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          onClick={() => scrollTo("home", "hero")}
          aria-label={t.nav.home}
        >
          <span
            className="absolute inset-0 rounded-full p-[2px]"
            style={{
              background: logoHovered
                ? "linear-gradient(270deg, #89aacc 0%, #4e85bf 100%)"
                : "linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)",
              transition: "background 0.3s ease",
            }}
          >
            <span className="w-full h-full bg-bg rounded-full flex items-center justify-center text-[12px] sm:text-[13px] font-display italic text-text-primary">
              JP
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <button
            key={link.key}
            onClick={() => scrollTo(link.key, link.section)}
            className={`text-[11px] sm:text-sm rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              active === link.key
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {t.nav[link.key]}
          </button>
        ))}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="text-[11px] sm:text-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors duration-200"
          aria-label={t.nav.toggleLanguage}
        >
          {language.toUpperCase()}
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <button
          onClick={scrollToFooter}
          className="group relative text-[11px] sm:text-sm rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-text-primary transition-all duration-200"
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background: "linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)",
              inset: "-2px",
              borderRadius: "9999px",
            }}
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 -mx-2 sm:-mx-3 md:-mx-4 -my-1.5 sm:-my-2 backdrop-blur-md">
            {t.nav.sayHi}
            <svg
              className="w-3 h-3 text-muted"
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
        </button>
      </div>
    </motion.nav>
  );
}
