import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
} from "lucide-react";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCss3Alt, FaFacebookF, FaFigma, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { SiExpress, SiTailwindcss } from "react-icons/si";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import {
  PROJECT_BADGE_CLASS_NAMES,
  PROJECT_FILTERS,
  PROJECTS,
  PROJECTS_PER_PAGE,
} from "../data/projects";
import { getLocalizedValue } from "../utils/localization";

function getTechIcon(tech, className = "w-4 h-4") {
  switch (tech) {
    case "React":
      return <FaReact className={`${className} text-[#61DAFB]`} />;
    case "Node.js":
      return <FaNodeJs className={`${className} text-[#5FA04E]`} />;
    case "Express.js":
      return <SiExpress className={`${className} text-[var(--color-foreground)]`} />;
    case "Tailwind":
      return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
    case "HTML":
      return <FaHtml5 className={`${className} text-[#E34F26]`} />;
    case "CSS":
      return <FaCss3Alt className={`${className} text-[#1572B6]`} />;
    case "JS":
      return <IoLogoJavascript className={`${className} text-[#F7DF1E]`} />;
    case "Facebook":
      return <FaFacebookF className={`${className} text-[#1877F2]`} />;
    case "Figma":
      return <FaFigma className={`${className} text-[#F24E1E]`} />;
    default:
      return null;
  }
}

function getLinkIcon(kind, className = "w-4 h-4") {
  switch (kind) {
    case "live":
      return <ExternalLink className={className} />;
    case "code":
      return <Github className={className} />;
    case "facebook":
      return <FaFacebookF className={className} />;
    case "figma":
      return <FaFigma className={className} />;
    default:
      return <Play className={className} />;
  }
}

function getBadgeClasses(type) {
  return (
    PROJECT_BADGE_CLASS_NAMES[type] ??
    "bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-border)]"
  );
}

export function Projects() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedProjectId(null);
  }, [activeFilter]);

  useEffect(() => {
    const workSection = document.getElementById(SECTION_IDS.work);
    if (workSection && currentPage !== 1) {
      const scrollTimeout = window.setTimeout(() => {
        workSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      return () => window.clearTimeout(scrollTimeout);
    }

    return undefined;
  }, [currentPage]);

  const filteredProjects = PROJECTS.filter(
    (project) => activeFilter === "all" || project.type === activeFilter,
  );

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE,
  );

  return (
    <section className="py-32 relative" id={SECTION_IDS.work}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8"
        >
          <SectionHeading
            eyebrow={t.projects.titlePrefix}
            title={t.projects.headlineStart}
            highlight={t.projects.headlineEnd}
            className="text-center md:text-left"
            titleClassName="text-3xl sm:text-4xl md:text-5xl"
          />
          <div className="self-center md:self-auto px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {PROJECTS.length} {t.projects.totalLabel}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 mb-16"
        >
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-[var(--color-foreground)] text-[var(--color-background)] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)]/70 hover:bg-[var(--color-card-active)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {getLocalizedValue(filter.label, language)}
            </button>
          ))}
        </motion.div>

        {paginatedProjects.length === 0 ? (
          <p className="text-center text-[var(--color-muted)]">{t.projects.noProjects}</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-24">
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map((project, index) => {
                const isExpanded = expandedProjectId === project.id;
                const hasSinglePrimaryLink = project.links.length === 1 && project.links[0].primary;

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`group flex flex-col rounded-3xl p-4 sm:p-5 transition-all duration-500 hover:bg-[var(--color-foreground)]/[0.02] border border-transparent hover:border-white/5 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.08)] ${
                      paginatedProjects.length % 2 !== 0 && index === paginatedProjects.length - 1 ? "md:col-span-2" : ""
                    }`}
                  >
                    <motion.div layout="position" className="relative overflow-hidden rounded-2xl mb-8 aspect-[4/3] bg-[var(--color-background)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                        loading="lazy"
                        onLoad={(e) => {
                          e.currentTarget.animate(
                            [{ opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0)" }],
                            { duration: 700, easing: "ease-out" },
                          );
                        }}
                      />
                      <div className="absolute inset-0 bg-[var(--color-background)]/20 group-hover:bg-transparent transition-colors duration-500" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[var(--color-background)]/50 backdrop-blur-sm">
                        {hasSinglePrimaryLink ? (
                          <a
                            href={project.links[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-foreground)] text-[var(--color-background)] px-5 py-3 text-sm font-medium hover:scale-105 transition-transform"
                          >
                            {getLinkIcon(project.links[0].kind, "w-4 h-4")}
                            {getLocalizedValue(project.links[0].label, language)}
                          </a>
                        ) : (
                          <div className="flex gap-4">
                            {project.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={getLocalizedValue(link.label, language)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                                  link.kind === "code"
                                    ? "bg-[var(--color-background)]/55 text-[var(--color-foreground)] border border-[var(--color-glass-border)]"
                                    : "bg-[var(--color-foreground)] text-[var(--color-background)]"
                                }`}
                              >
                                {getLinkIcon(link.kind, "w-5 h-5")}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div layout className="flex flex-col gap-3">
                      <motion.div layout className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`text-xs font-medium tracking-wider px-3 py-1 rounded-full ${getBadgeClasses(project.type)}`}>
                            {getLocalizedValue(project.badge, language)}
                          </span>
                          {project.isNew && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                            >
                              {t.projects.newest}
                            </motion.span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-[var(--color-muted)] tracking-wider px-2 py-1 bg-[var(--color-card)] rounded-md border border-white/5">
                          {getLocalizedValue(project.date, language)}
                        </span>
                      </motion.div>

                      <motion.h4 layout className="text-xl sm:text-2xl font-display font-medium tracking-tight group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </motion.h4>

                      <motion.p layout className="text-[var(--color-muted)] text-sm sm:text-base font-light leading-relaxed mb-1 max-w-xl">
                        {getLocalizedValue(project.description, language)}
                      </motion.p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-5 pt-3 pb-4">
                              <p className="text-[var(--color-muted)] font-light leading-relaxed text-sm">
                                {getLocalizedValue(project.longDescription, language)}
                              </p>
                              <div className="flex flex-wrap gap-3">
                                {project.links.map((link) => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors flex items-center gap-2 ${
                                      link.kind === "code"
                                        ? "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-card-active)]"
                                        : "bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-gray-200"
                                    }`}
                                  >
                                    {getLinkIcon(link.kind, "w-4 h-4")}
                                    {getLocalizedValue(link.label, language)}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div layout className="flex flex-wrap gap-2 mt-2">
                        {project.tech.map((techItem) => (
                          <div
                            key={techItem}
                            className="group/tech relative flex items-center justify-center w-9 h-9 bg-[var(--color-card)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-card-active)] hover:border-[var(--color-glass-border)] transition-all cursor-help"
                          >
                            {getTechIcon(techItem, "w-4 h-4")}
                            <span className="absolute -top-8 opacity-0 group-hover/tech:opacity-100 transition-opacity bg-[var(--color-background)]/80 text-[var(--color-foreground)] text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-[var(--color-border)]">
                              {techItem}
                            </span>
                          </div>
                        ))}
                      </motion.div>

                      <motion.button
                        layout
                        type="button"
                        onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                        className="mt-5 w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-[var(--color-card)] text-xs font-medium tracking-widest uppercase text-[var(--color-foreground)]/70 group-hover:bg-[var(--color-foreground)] group-hover:text-[var(--color-background)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                      >
                        {isExpanded ? t.projects.viewLess : t.projects.viewDetails}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-16 pb-8"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="p-2 sm:p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)]/70 hover:bg-[var(--color-card-active)] hover:text-[var(--color-foreground)] hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[var(--color-card)] disabled:hover:text-[var(--color-foreground)]/70 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-[var(--color-foreground)] shadow-[0_0_24px_rgba(59,130,246,0.5)] scale-110 border border-blue-400"
                      : "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)]/60 hover:bg-[var(--color-card-active)] hover:text-[var(--color-foreground)] hover:scale-105 hover:border-[var(--color-glass-border)]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="p-2 sm:p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)]/70 hover:bg-[var(--color-card-active)] hover:text-[var(--color-foreground)] hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[var(--color-card)] disabled:hover:text-[var(--color-foreground)]/70 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
