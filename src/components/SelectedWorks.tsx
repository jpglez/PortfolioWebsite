import { motion } from "framer-motion";
import { useLanguage } from "../i18n";

const PROJECTS = [
  {
    slug: "livecitygdl",
    title: "LiveCity GDL",
    image: "/projects/livecitygdl.png",
    span: "md:col-span-7",
    url: "https://livecitygdl.com/",
    inDevelopment: false,
  },
  {
    slug: "estateai",
    title: "Estate AI",
    image: "/projects/estateai.png",
    span: "md:col-span-5",
    url: null,
    inDevelopment: true,
  },
  {
    slug: "primenest",
    title: "PrimeNest Realty",
    image: "/projects/primenest.png",
    span: "md:col-span-5",
    url: "https://jpglez.github.io/PrimeNest-Realty/",
    inDevelopment: false,
  },
  {
    slug: "littlelemon",
    title: "Little Lemon Restaurant",
    image: "/projects/littlelemon.png",
    span: "md:col-span-7",
    url: "https://jpglez.github.io/LITTLE-LEMON/",
    inDevelopment: false,
  },
] as const;

function SectionHeader() {
  const { t } = useLanguage();

  return (
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
            {t.selectedWorks.eyebrow}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-body font-medium text-text-primary leading-tight">
          {t.selectedWorks.headingPrefix}{" "}
          <em className="font-display italic not-italic" style={{ fontStyle: "italic" }}>
            {t.selectedWorks.headingEmphasis}
          </em>
        </h2>
        <p className="text-sm text-muted mt-3 max-w-xs">{t.selectedWorks.subtext}</p>
      </div>

      <a
        href="https://github.com/jpglez"
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
        <span className="relative z-10">{t.selectedWorks.viewAll}</span>
        <span className="relative z-10 text-muted group-hover:text-text-primary transition-colors">
          →
        </span>
      </a>
    </motion.div>
  );
}

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

function CardInner({ project }: { project: (typeof PROJECTS)[number] }) {
  const { t } = useLanguage();
  const description = t.selectedWorks.projectDescriptions[project.slug];

  return (
    <>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={description}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.75] saturate-[0.55]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Polarized film overlay - always visible */}
        <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />
      </div>

      {/* Halftone texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg" />

      {/* Hover label */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="relative inline-flex items-center rounded-full bg-white/90 px-5 py-2.5 text-bg text-sm font-medium">
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)",
              padding: "2px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <span className="relative z-10">
            {project.inDevelopment ? (
              t.selectedWorks.inDevelopment
            ) : (
              <>
                {t.selectedWorks.view} —{" "}
                <em className="font-display italic">{project.title}</em>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Bottom title (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm font-medium">{project.title}</p>
          {project.inDevelopment && (
            <span className="text-[10px] uppercase tracking-widest text-white/60 border border-white/20 rounded-full px-2 py-0.5">
              {t.selectedWorks.inDevelopmentShort}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project, index, isFirst, isLast }: ProjectCardProps) {
  const aspectClass =
    isFirst || isLast ? "aspect-[4/3]" : "aspect-[4/3] md:h-full";

  const sharedMotionProps = {
    className: `group relative overflow-hidden rounded-3xl bg-surface border border-stroke ${project.span} ${aspectClass} ${project.inDevelopment ? "cursor-default" : "cursor-pointer"}`,
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: index * 0.1 },
    viewport: { once: true, margin: "-80px" },
  };

  if (project.inDevelopment || !project.url) {
    return (
      <motion.div {...sharedMotionProps}>
        <CardInner project={project} />
      </motion.div>
    );
  }

  return (
    <motion.a
      {...sharedMotionProps}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardInner project={project} />
    </motion.a>
  );
}

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 md:grid-rows-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              isFirst={i === 0}
              isLast={i === PROJECTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
