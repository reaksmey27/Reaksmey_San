import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  X,
} from "lucide-react";
import { IoLogoJavascript } from "react-icons/io5";
import {
  FaCss3Alt,
  FaFacebookF,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaLaravel,
  FaNodeJs,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import {
  SiExpress,
  SiTailwindcss,
  SiPython,
  SiFlask,
  SiMysql,
  SiPostman,
} from "react-icons/si";
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
      return (
        <SiExpress className={`${className} text-[var(--color-foreground)]`} />
      );
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
    case "Python":
      return <SiPython className={`${className} text-[#3776AB]`} />;
    case "Flask":
      return <SiFlask className={`${className} text-[#000000]`} />;
    case "Vue.js":
      return <FaVuejs className={`${className} text-[#4FC08D]`} />;
    case "Laravel":
      return <FaLaravel className={`${className} text-[#FF2D20]`} />;
    case "MySQL":
      return <SiMysql className={`${className} text-[#4479A1]`} />;
    case "GitHub":
      return (
        <FaGithub className={`${className} text-[var(--color-foreground)]`} />
      );
    case "Postman":
      return <SiPostman className={`${className} text-[#FF6C37]`} />;
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
  const detailsDialog = useRef(null);
  const selectedProject = PROJECTS.find(
    (project) => project.id === expandedProjectId,
  );

  useEffect(() => {
    const dialog = detailsDialog.current;
    if (selectedProject) {
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        dialog.close();
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [selectedProject]);

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
    <section className="py-24 relative" id={SECTION_IDS.work}>
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
            className="text-left"
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
              aria-pressed={activeFilter === filter.key}
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
          <p className="text-center text-[var(--color-muted)]">
            {t.projects.noProjects}
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map((project) => {
                const hasSinglePrimaryLink =
                  project.links.length === 1 && project.links[0].primary;

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className="group min-w-0 h-full flex flex-col rounded-2xl p-4 bg-[var(--color-card)] border border-[var(--color-border)] transition-colors duration-300 hover:border-[var(--color-glass-border)]"
                  >
                    <motion.div
                      layout="position"
                      className="relative shrink-0 overflow-hidden rounded-xl mb-5 aspect-[4/3] bg-[var(--color-background)]"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                        loading="lazy"
                        onLoad={(e) => {
                          e.currentTarget.animate(
                            [
                              { opacity: 0, filter: "blur(10px)" },
                              { opacity: 1, filter: "blur(0)" },
                            ],
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
                            {getLocalizedValue(
                              project.links[0].label,
                              language,
                            )}
                          </a>
                        ) : (
                          <div className="flex gap-4">
                            {project.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={getLocalizedValue(
                                  link.label,
                                  language,
                                )}
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

                    <motion.div layout className="flex flex-1 flex-col gap-3">
                      <motion.div
                        layout
                        className="flex min-h-16 flex-col items-start justify-start gap-2"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-medium tracking-wider px-3 py-1 rounded-full ${getBadgeClasses(project.type)}`}
                          >
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
                        <span className="text-[11px] font-mono text-[var(--color-muted)] px-2 py-1 bg-[var(--color-card)] rounded-md border border-[var(--color-border)]">
                          {getLocalizedValue(project.date, language)}
                        </span>
                      </motion.div>

                      <motion.h4
                        layout
                        title={project.title}
                        className="line-clamp-2 text-lg sm:text-xl font-display font-medium leading-snug tracking-tight group-hover:text-[var(--color-primary)] transition-colors"
                      >
                        {project.title}
                      </motion.h4>

                      <motion.p
                        layout
                        className="line-clamp-2 min-h-[3.25em] text-[var(--color-muted)] text-sm leading-relaxed mb-1"
                      >
                        {getLocalizedValue(project.description, language)}
                      </motion.p>

                      <motion.div
                        layout
                        className="flex flex-wrap gap-2 mt-auto pt-2"
                      >
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
                        onClick={() => setExpandedProjectId(project.id)}
                        aria-haspopup="dialog"
                        className="mt-2 min-h-11 w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-sm font-medium text-[var(--color-primary)] hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors"
                      >
                        {t.projects.readMore}
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        <dialog
          ref={detailsDialog}
          onClose={() => setExpandedProjectId(null)}
          aria-labelledby="project-details-title"
          className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 text-[var(--color-foreground)] shadow-2xl backdrop:bg-black/60 sm:p-8"
        >
          {selectedProject && (
            <>
              <div className="sticky -top-6 z-10 -mx-6 -mt-6 mb-5 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-background)] px-6 py-5 sm:-top-8 sm:-mx-8 sm:-mt-8 sm:px-8">
                <h2
                  id="project-details-title"
                  className="font-display text-xl font-semibold sm:text-2xl"
                >
                  {selectedProject.title}
                </h2>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setExpandedProjectId(null)}
                  aria-label={t.projects.closeDetails}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-card-active)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-6 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
                <img
                  key={selectedProject.id}
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="block max-h-[40dvh] w-full object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {getLocalizedValue(selectedProject.description, language)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {getLocalizedValue(selectedProject.longDescription, language)}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs"
                  >
                    {getTechIcon(tech, "h-4 w-4 shrink-0")}
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {selectedProject.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {getLinkIcon(link.kind)}
                    {getLocalizedValue(link.label, language)}
                  </a>
                ))}
              </div>
            </>
          )}
        </dialog>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              aria-label={t.projects.previousPage}
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
                  aria-label={`${t.projects.page} ${index + 1}`}
                  aria-current={currentPage === index + 1 ? "page" : undefined}
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
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              aria-label={t.projects.nextPage}
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
