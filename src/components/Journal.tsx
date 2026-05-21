import { motion } from "framer-motion";
import { useLanguage } from "../i18n";

const ENTRIES = [
  {
    image: "/skills/ai-claude.svg",
    href: "https://estateai.digital/",
  },
  {
    image: "/skills/backend-database.svg",
    href: "https://www.coursera.org/account/accomplishments/specialization/FT80GW1CL7XJ",
  },
  {
    image: "/skills/realtime-maps.svg",
    href: "https://livecitygdl.com/",
  },
  {
    image: "/skills/integrations-automation.svg",
    href: "https://drive.google.com/file/d/1IxRxoYZtfMKXYhOSmvc4TECPGsKElCs7/view?pli=1",
  },
];

export default function Journal() {
  const { t } = useLanguage();

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {t.journal.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-medium text-text-primary leading-tight">
              {t.journal.headingPrefix}{" "}
              <em className="font-display" style={{ fontStyle: "italic" }}>
                {t.journal.headingEmphasis}
              </em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-xs">
              {t.journal.subtext}
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/juan-pablo-gonzalez-sanmiguel-50b26a340/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary transition-colors duration-200 relative"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <span className="relative z-10">{t.journal.viewAll}</span>
            <span className="relative z-10 text-muted group-hover:text-text-primary">
              →
            </span>
          </a>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={t.journal.entries[i].title}
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-200 cursor-pointer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.08,
              }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Image */}
              <div className="relative flex-shrink-0 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden border border-stroke group-hover:border-muted transition-colors duration-300">
                <img
                  src={entry.image}
                  alt={t.journal.entries[i].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.style.background =
                      "hsl(var(--surface))";
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/20 to-black/55 pointer-events-none" />
              </div>

              {/* Title */}
              <div className="transition-transform duration-200 group-hover:translate-x-1 flex-shrink min-w-0">
                <span className="text-base md:text-xl lg:text-2xl font-medium text-text-primary">
                  {t.journal.entries[i].title}
                </span>
                <p className="text-xs md:text-sm text-muted mt-1 max-w-xl line-clamp-2">
                  {t.journal.entries[i].description}
                </p>
              </div>

              {/* Dotted separator (desktop) */}
              <span className="hidden md:flex flex-grow h-px border-t border-dashed border-stroke/30" />

              {/* Meta */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted flex-shrink-0 ml-auto sm:ml-0">
                <span>{t.journal.entries[i].category}</span>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:bg-text-primary group-hover:text-bg group-hover:border-text-primary transition-all duration-200 ml-auto sm:ml-0">
                →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
