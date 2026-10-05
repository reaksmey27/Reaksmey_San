import { motion } from "motion/react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { EXPERIENCES } from "../data/experience";

export function Experience() {
  const { t } = useLanguage();

  return (
    <section
      className="py-24 bg-[var(--color-background)]"
      id={SECTION_IDS.experience}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <SectionHeading
            eyebrow={t.experience.titlePrefix}
            title={t.experience.headlineStart}
            highlight={t.experience.headlineEnd}
            titleClassName="text-3xl sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <div>
          {EXPERIENCES.map((experience, index) => (
            <motion.article
              key={experience.roleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] md:gap-x-6"
            >
              <div
                className="relative col-start-1 row-start-1 flex justify-center md:col-start-2"
                aria-hidden="true"
              >
                {index < EXPERIENCES.length - 1 && (
                  <span className="absolute top-8 -bottom-16 border-l-2 border-dashed border-blue-500/35" />
                )}
                <span className="relative z-10 mt-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[var(--color-background)] bg-blue-600 text-xs font-bold text-white ring-1 ring-blue-500/30 md:h-12 md:w-12 md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={`relative col-start-2 row-start-1 min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:p-6 ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-11 -left-4 w-4 border-t-2 border-dashed border-blue-500/35 md:top-12 md:w-8 ${index % 2 === 0 ? "md:left-auto md:-right-8" : "md:-left-8"}`}
                />
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-[var(--color-primary)]">
                    <experience.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                      {t.experience[experience.typeKey]}
                    </p>
                    {experience.period && (
                      <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                        {experience.period}
                      </p>
                    )}
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-display font-semibold leading-snug text-[var(--color-foreground)]">
                  {t.experience[experience.roleKey]}
                </h4>
                <p className="mt-2 text-sm font-medium text-[var(--color-foreground)]/75">
                  {t.experience[experience.companyKey]}
                </p>
                {experience.highlightsKey ? (
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--color-muted)] marker:text-[var(--color-primary)]">
                    {t.experience[experience.highlightsKey].map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : experience.descriptionKey ? (
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                    {t.experience[experience.descriptionKey]}
                  </p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
