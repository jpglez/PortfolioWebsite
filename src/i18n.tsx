/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "es" | "en";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

export const translations = {
  es: {
    meta: {
      title: "Juan Pablo González — Portafolio",
    },
    nav: {
      home: "Inicio",
      work: "Trabajo",
      stack: "Stack",
      resume: "CV",
      sayHi: "Conectar",
      viewCV: "Ver CV",
    },
    loading: {
      label: "Portafolio",
      words: ["Diseñar", "Crear", "Inspirar"],
    },
    hero: {
      collection: "INGENIERO EN COMPUTACIÓN",
      roles: [
        "Ingeniero de Software",
        "Desarrollador Full Stack",
        "Entusiasta de IA",
        "Constructor",
      ],
      intro: "Un",
      based: "con base en Guadalajara, México.",
      description:
        "Construyendo aplicaciones web escalables y soluciones impulsadas por IA. Actualmente creando productos SaaS innovadores mientras estudio Ingeniería en Computación en Guadalajara, México.",
      seeWorks: "Ver Trabajos",
      reachOut: "Conectar...",
      scroll: "DESPLÁZATE",
    },
    selectedWorks: {
      eyebrow: "Trabajo Seleccionado",
      headingPrefix: "Proyectos",
      headingEmphasis: "Destacados",
      subtext:
        "Una selección de proyectos en los que he trabajado, desde el concepto hasta el lanzamiento.",
      viewAll: "Ver todo el trabajo",
      view: "Ver",
      inDevelopment: "En Desarrollo",
      inDevelopmentShort: "En Dev",
      projectDescriptions: {
        livecitygdl:
          "Descubre experiencias, lugares, restaurantes, bares y eventos en Guadalajara con mapa interactivo y planes a tu medida.",
        estateai:
          "Plataforma inmobiliaria con IA para automatizar atención, mostrar propiedades, dar seguimiento y facilitar decisiones.",
        vexa:
          "Agencia digital que crea sitios web modernos y funcionales para negocios locales, mejorando su presencia online.",
      },
    },
    journal: {
      eyebrow: "Skills y Certificaciones",
      headingPrefix: "Skills y",
      headingEmphasis: "Certificaciones",
      subtext:
        "Una selección de mis habilidades técnicas, certificaciones y áreas de especialización que he desarrollado a través de proyectos y aprendizaje continuo.",
      viewAll: "Ver más",
      entries: [
        {
          title: "AI y Claude API",
          description:
            "Experiencia integrando Claude API, Anthropic SDK, y características impulsadas por LLM en aplicaciones de producción. Desarrollo de chatbots, análisis de texto y soluciones de IA.",
          category: "Habilidad",
        },
        {
          title: "Frontend y Control de Versiones",
          description:
            "Experiencia construyendo interfaces responsivas con React, Next.js y Tailwind CSS, cuidando componentes reutilizables, rendimiento, accesibilidad y flujos de trabajo con Git y GitHub.",
          category: "Certificación",
        },
        {
          title: "Aplicaciones en Tiempo Real y Mapas",
          description:
            "Desarrollo de aplicaciones en tiempo real con Leaflet, WebSockets y Supabase Realtime. Integración de mapas interactivos, geolocalización y actualizaciones en vivo.",
          category: "Habilidad",
        },
        {
          title: "Integraciones y Automatización",
          description:
            "Dominio de integraciones con Twilio (WhatsApp), Google Calendar API, DeepL API y servicios de terceros. Automatización de flujos de trabajo y procesos complejos.",
          category: "Certificación",
        },
      ],
    },
    explorations: {
      eyebrow: "Stack",
      headingPrefix: "Mi Stack",
      headingEmphasis: "Tecnológico",
      subtext:
        "Las tecnologías, lenguajes y herramientas que utilizo para construir aplicaciones modernas, escalables y eficientes.",
      view: "Ver",
      close: "Cerrar",
      categories: {
        frontend: "Frontend",
        backend: "Backend y API",
        databases: "Bases de Datos y Servicios",
        deployment: "Deployment y DevOps",
        languages: "Lenguajes",
        apis: "APIs e Integraciones",
        design: "Diseño y Animación",
      },
    },
    stats: {
      eyebrow: "Estadísticas y Datos",
      headingPrefix: "Causando un",
      headingEmphasis: "impacto",
      subtext:
        "Desde victorias en hackathons hasta productos SaaS en producción: creando soluciones reales, aprendiendo en cada paso y empujando los límites de lo posible con tecnología web moderna e IA.",
      items: [
        {
          number: "15+",
          label: "Proyectos Completados",
          sublabel:
            "Desde el concepto hasta el lanzamiento, en aplicaciones frontend, backend y full-stack.",
        },
        {
          number: "3",
          label: "Años Aprendiendo",
          sublabel:
            "Actualmente estudio Ingeniería en Computación en una universidad de Guadalajara, México.",
        },
        {
          number: "100%",
          label: "Comprometido",
          sublabel:
            "Dedicado a construir soluciones innovadoras y entregar código de calidad todos los días.",
        },
      ],
    },
    footer: {
      marquee: "CONSTRUYENDO EL FUTURO • ",
      cta:
        "¿Tienes un proyecto en mente o quieres colaborar? Siempre estoy abierto a nuevas ideas, asociaciones y oportunidades para crear algo increíble. ¡Creemos juntos!",
      available: "Disponible para proyectos",
    },
    email: {
      subject: "Conectemos",
      body:
        "Hola Juan Pablo,\n\nTe vi en tu portafolio y me gustaría conectar contigo. Me interesa tu trabajo.\n\nEspero tu respuesta.\n\n¡Saludos!",
    },
  },
  en: {
    meta: {
      title: "Juan Pablo González — Portfolio",
    },
    nav: {
      home: "Home",
      work: "Work",
      stack: "Stack",
      resume: "Resume",
      sayHi: "Say hi",
      viewCV: "See Resume",
    },
    loading: {
      label: "Portfolio",
      words: ["Design", "Create", "Inspire"],
    },
    hero: {
      collection: "COMPUTER ENGINEER",
      roles: ["Software Engineer", "Full Stack Developer", "AI Enthusiast", "Builder"],
      intro: "A",
      based: "based in Guadalajara, Mexico.",
      description:
        "Building scalable web applications and AI-powered solutions. Currently crafting innovative SaaS products while studying Computer Science in Guadalajara, Mexico.",
      seeWorks: "See Works",
      reachOut: "Reach out...",
      scroll: "SCROLL",
    },
    selectedWorks: {
      eyebrow: "Selected Work",
      headingPrefix: "Featured",
      headingEmphasis: "projects",
      subtext: "A selection of projects I've worked on, from concept to launch.",
      viewAll: "View all work",
      view: "View",
      inDevelopment: "In Development",
      inDevelopmentShort: "In Dev",
      projectDescriptions: {
        livecitygdl:
          "Descubre experiencias, lugares, restaurantes, bares y eventos en Guadalajara con mapa interactivo y planes a tu medida.",
        estateai:
          "Plataforma inmobiliaria con IA para automatizar atención, mostrar propiedades, dar seguimiento y facilitar decisiones.",
        vexa:
          "Agencia digital que crea sitios web modernos y funcionales para negocios locales, mejorando su presencia online.",
      },
    },
    journal: {
      eyebrow: "Skills & Certifications",
      headingPrefix: "Skills &",
      headingEmphasis: "Certifications",
      subtext:
        "A selection of my technical skills, certifications, and areas of expertise that I've developed through projects and continuous learning.",
      viewAll: "View all",
      entries: [
        {
          title: "AI & Claude API",
          description:
            "Experience integrating Claude API, Anthropic SDK, and LLM-powered features into production applications. Development of chatbots, text analysis, and AI solutions.",
          category: "Skill",
        },
        {
          title: "Frontend & Version Control",
          description:
            "Experience building responsive interfaces with React, Next.js, and Tailwind CSS, focusing on reusable components, performance, accessibility, and Git/GitHub workflows.",
          category: "Certification",
        },
        {
          title: "Real-Time Applications & Maps",
          description:
            "Development of real-time applications with Leaflet, WebSockets, and Supabase Realtime. Integration of interactive maps, geolocation, and live updates.",
          category: "Skill",
        },
        {
          title: "Integrations & Automation",
          description:
            "Mastery of integrations with Twilio (WhatsApp), Google Calendar API, DeepL API, and third-party services. Automation of workflows and complex processes.",
          category: "Certification",
        },
      ],
    },
    explorations: {
      eyebrow: "Stack",
      headingPrefix: "My Tech",
      headingEmphasis: "Stack",
      subtext:
        "The technologies, languages, and tools I use to build modern, scalable, and efficient applications.",
      view: "View",
      close: "Close",
      categories: {
        frontend: "Frontend",
        backend: "Backend & API",
        databases: "Databases & Services",
        deployment: "Deployment & DevOps",
        languages: "Languages",
        apis: "APIs & Integrations",
        design: "Design & Animation",
      },
    },
    stats: {
      eyebrow: "Stats & Facts",
      headingPrefix: "Making an",
      headingEmphasis: "impact",
      subtext:
        "From hackathon wins to production SaaS products — shipping real solutions, learning every step of the way, and pushing the boundaries of what's possible with modern web tech and AI.",
      items: [
        {
          number: "15+",
          label: "Projects Completed",
          sublabel:
            "From concept to launch, across frontend, backend, and full-stack applications.",
        },
        {
          number: "3",
          label: "Years Learning",
          sublabel:
            "Currently studying Computer Engineering at a university in Guadalajara, Mexico.",
        },
        {
          number: "100%",
          label: "Committed",
          sublabel:
            "Dedicated to building innovative solutions and shipping quality code every single day.",
        },
      ],
    },
    footer: {
      marquee: "BUILDING THE FUTURE • ",
      cta:
        "Have a project in mind or want to collaborate? I'm always open to new ideas, partnerships, and opportunities to build something amazing. Let's create together.",
      available: "Available for projects",
    },
    email: {
      subject: "Let's Connect",
      body:
        "Hi Juan Pablo,\n\nI saw your portfolio and would like to connect with you. I'm interested in your work.\n\nLooking forward to your reply.\n\nBest regards!",
    },
  },
} as const;

type TranslationTree = (typeof translations)[Language];

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationTree;
  openEmail: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" || stored === "es" ? stored : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
  }, [language]);

  const value = useMemo(() => {
    const currentTranslations = translations[language];
    return {
      language,
      toggleLanguage: () => setLanguage((current) => (current === "es" ? "en" : "es")),
      t: currentTranslations,
      openEmail: () => {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jp.gonzalezsanmiguel@gmail.com&su=${encodeURIComponent(
          currentTranslations.email.subject
        )}&body=${encodeURIComponent(currentTranslations.email.body)}`;

        window.open(gmailUrl, "_blank", "noopener,noreferrer");
      },
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
