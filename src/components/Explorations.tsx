import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const iconUrl = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;

type CategoryKey =
  | "frontend"
  | "backend"
  | "databases"
  | "deployment"
  | "languages"
  | "apis"
  | "design";

interface TechItem {
  id: number;
  name: string;
  category: CategoryKey;
  icon?: string;
  fallback: string;
}

const TECH_STACK: TechItem[] = [
  { id: 1, name: "JavaScript", category: "frontend", icon: iconUrl("javascript", "#F7DF1E"), fallback: "JS" },
  { id: 2, name: "TypeScript", category: "frontend", icon: iconUrl("typescript", "#3178C6"), fallback: "TS" },
  { id: 3, name: "HTML5", category: "frontend", icon: iconUrl("html5", "#E34F26"), fallback: "H5" },
  { id: 4, name: "CSS3", category: "frontend", icon: iconUrl("css", "#1572B6"), fallback: "C3" },
  { id: 5, name: "React", category: "frontend", icon: iconUrl("react", "#61DAFB"), fallback: "R" },
  { id: 6, name: "Next.js", category: "frontend", icon: iconUrl("nextdotjs", "#FFFFFF"), fallback: "N" },
  { id: 7, name: "Tailwind CSS", category: "frontend", icon: iconUrl("tailwindcss", "#06B6D4"), fallback: "TW" },
  { id: 8, name: "Framer Motion", category: "frontend", icon: iconUrl("framer", "#0055FF"), fallback: "FM" },
  { id: 9, name: "GSAP", category: "design", icon: iconUrl("greensock", "#88CE02"), fallback: "GS" },
  { id: 10, name: "Node.js", category: "backend", icon: iconUrl("nodedotjs", "#5FA04E"), fallback: "NO" },
  { id: 11, name: "Python", category: "backend", icon: iconUrl("python", "#3776AB"), fallback: "PY" },
  { id: 12, name: "SQL", category: "backend", icon: iconUrl("postgresql", "#4169E1"), fallback: "SQL" },
  { id: 13, name: "REST API", category: "backend", fallback: "API" },
  { id: 14, name: "GraphQL", category: "backend", icon: iconUrl("graphql", "#E10098"), fallback: "GQL" },
  { id: 15, name: "Supabase", category: "databases", icon: iconUrl("supabase", "#3FCF8E"), fallback: "SB" },
  { id: 16, name: "Firebase", category: "databases", icon: iconUrl("firebase", "#FFCA28"), fallback: "FB" },
  { id: 17, name: "Google Cloud", category: "databases", icon: iconUrl("googlecloud", "#4285F4"), fallback: "GC" },
  { id: 18, name: "Vercel", category: "deployment", icon: iconUrl("vercel", "#FFFFFF"), fallback: "V" },
  { id: 19, name: "GitHub", category: "deployment", icon: iconUrl("github", "#FFFFFF"), fallback: "GH" },
  { id: 20, name: "Git", category: "deployment", icon: iconUrl("git", "#F05032"), fallback: "Git" },
  { id: 21, name: "Docker", category: "deployment", icon: iconUrl("docker", "#2496ED"), fallback: "DK" },
  { id: 22, name: "C", category: "languages", icon: iconUrl("c", "#A8B9CC"), fallback: "C" },
  { id: 23, name: "Claude API", category: "apis", icon: iconUrl("anthropic", "#D4A27F"), fallback: "AI" },
  { id: 24, name: "Twilio", category: "apis", icon: "/tech/twilio.svg", fallback: "TW" },
  { id: 25, name: "Google Calendar API", category: "apis", icon: iconUrl("googlecalendar", "#4285F4"), fallback: "GC" },
  { id: 26, name: "DeepL API", category: "apis", icon: iconUrl("deepl", "#0F2B46"), fallback: "DL" },
  { id: 27, name: "Google Maps API", category: "apis", icon: iconUrl("googlemaps", "#4285F4"), fallback: "GM" },
  { id: 28, name: "Leaflet", category: "apis", icon: iconUrl("leaflet", "#199900"), fallback: "LF" },
  { id: 29, name: "Figma", category: "design", icon: iconUrl("figma", "#F24E1E"), fallback: "FG" },
];

const leftItems = TECH_STACK.filter((_, i) => i % 2 === 0);
const rightItems = TECH_STACK.filter((_, i) => i % 2 !== 0);

interface LightboxProps {
  item: TechItem | null;
  onClose: () => void;
}

function TechMark({ item, large = false }: { item: TechItem; large?: boolean }) {
  const [hasError, setHasError] = useState(false);
  const sizeClass = large ? "w-24 h-24" : "w-14 h-14 sm:w-16 sm:h-16";

  if (!item.icon || hasError) {
    return (
      <div
        className={`${sizeClass} rounded-2xl border border-stroke bg-bg/70 flex items-center justify-center text-text-primary font-display italic text-xl`}
      >
        {item.fallback}
      </div>
    );
  }

  return (
    <img
      src={item.icon}
      alt={item.name}
      className={`${sizeClass} object-contain transition-transform duration-500 group-hover:scale-110`}
      onError={() => setHasError(true)}
    />
  );
}

function Lightbox({ item, onClose }: LightboxProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-md w-full cursor-default"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square overflow-hidden rounded-2xl bg-surface border border-stroke flex flex-col items-center justify-center gap-5 p-8">
              <TechMark item={item} large />
              <div className="text-center">
                <p className="text-text-primary font-medium text-2xl">{item.name}</p>
                <p className="text-sm text-muted mt-1">
                  {t.explorations.categories[item.category as CategoryKey]}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-text-primary hover:border-text-primary transition-colors"
                aria-label={t.explorations.close}
              >
                ×
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TechCardProps {
  item: TechItem;
  onClick: () => void;
}

function TechCard({ item, onClick }: TechCardProps) {
  const { t } = useLanguage();
  const rotation = (item.id % 2 === 0 ? 1 : -1) * (0.5 + (item.id % 3) * 0.35);

  return (
    <button
      className="group relative max-w-[150px] sm:max-w-[180px] w-full aspect-square cursor-pointer text-left"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={onClick}
    >
      {/* Outer border frame */}
      <div className="absolute -inset-3 rounded-[32px] border border-stroke/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-surface border border-stroke flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300 group-hover:border-muted group-hover:shadow-[0_0_28px_rgba(137,170,204,0.18)]">
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <TechMark item={item} />
          <div className="text-center">
            <p className="text-text-primary font-medium text-sm sm:text-base leading-tight">
              {item.name}
            </p>
            <p className="text-[10px] text-muted uppercase tracking-[0.18em] mt-1">
              {t.explorations.categories[item.category as CategoryKey]}
            </p>
          </div>
        </div>

        {/* Hover content */}
        <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-4 z-20">
          <TechMark item={item} />
          <p className="text-text-primary font-medium text-center">{item.name}</p>
          <p className="text-xs text-muted uppercase tracking-[0.2em] text-center">
            {t.explorations.categories[item.category as CategoryKey]}
          </p>
          <div
            className="mt-1 px-4 py-2 rounded-full text-xs text-white"
            style={{ background: "linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)" }}
          >
            {t.explorations.view}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Explorations() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [lightboxItem, setLightboxItem] = useState<TechItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!leftColRef.current || !rightColRef.current) return;

      gsap.fromTo(
        leftColRef.current,
        { y: "8vh" },
        {
          y: "-150vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { y: "24vh" },
        {
          y: "-135vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      <section id="stack" ref={sectionRef} className="relative bg-bg" style={{ minHeight: "300vh" }}>
        {/* Sticky header */}
        <div className="sticky top-0 h-[42vh] md:h-[48vh] flex items-end justify-center relative z-30 pointer-events-none bg-gradient-to-b from-bg via-bg/95 to-transparent">
          <div className="text-center px-6 max-w-xl mx-auto pb-10 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-stroke" />
                <span className="text-xs text-muted uppercase tracking-[0.3em]">
                  {t.explorations.eyebrow}
                </span>
                <span className="w-8 h-px bg-stroke" />
              </div>
              <h2 className="text-4xl md:text-5xl font-body font-medium text-text-primary leading-tight mb-4">
                {t.explorations.headingPrefix}{" "}
                <em className="font-display" style={{ fontStyle: "italic" }}>
                  {t.explorations.headingEmphasis}
                </em>
              </h2>
              <p className="text-sm text-muted max-w-sm mx-auto">
                {t.explorations.subtext}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Parallax columns - absolute positioned over the scroll track */}
        <div className="absolute inset-x-0 top-[40vh] md:top-[46vh] bottom-0 flex items-start justify-center pointer-events-none">
          <div className="relative w-full max-w-[1400px] px-6 pointer-events-auto">
            <div className="grid grid-cols-2 gap-10 md:gap-40">
              {/* Left column */}
              <div ref={leftColRef} className="flex flex-col items-center gap-6 md:gap-8">
                <div className="h-[6vh]" />
                {leftItems.map((item) => (
                  <TechCard
                    key={item.id}
                    item={item}
                    onClick={() => setLightboxItem(item)}
                  />
                ))}
              </div>

              {/* Right column */}
              <div ref={rightColRef} className="flex flex-col items-center gap-6 md:gap-8">
                <div className="h-[18vh]" />
                {rightItems.map((item) => (
                  <TechCard
                    key={item.id}
                    item={item}
                    onClick={() => setLightboxItem(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
