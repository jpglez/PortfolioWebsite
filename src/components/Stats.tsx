import { motion } from "framer-motion";
import { useLanguage } from "../i18n";

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              {t.stats.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-medium text-text-primary leading-tight mb-3">
            {t.stats.headingPrefix}{" "}
            <em className="font-display" style={{ fontStyle: "italic" }}>
              {t.stats.headingEmphasis}
            </em>
          </h2>
          <p className="text-sm text-muted max-w-md">
            {t.stats.subtext}{" "}
            <button
              onClick={() => {}}
              className="inline-flex align-baseline rounded-full border border-stroke px-3 py-1 text-xs text-muted hover:text-text-primary hover:border-text-primary transition-all duration-200 cursor-pointer"
            >
              {t.nav.viewCV}
            </button>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.stats.items.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-surface border border-stroke rounded-3xl p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.1,
              }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <p className="text-6xl sm:text-7xl font-medium tracking-tight text-text-primary leading-none mb-6 text-center">
                {stat.number}
              </p>
              <div className="h-px bg-stroke mb-5" />
              <p className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-muted">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
