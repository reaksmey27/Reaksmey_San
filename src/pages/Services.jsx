import { motion } from "motion/react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { SERVICES } from "../data/services";

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      className="py-24 bg-[var(--color-background)]"
      id={SECTION_IDS.services}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <SectionHeading
            eyebrow={t.services.titlePrefix}
            title={t.services.headlineStart}
            highlight={t.services.headlineEnd}
            titleClassName="text-3xl sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 sm:gap-5">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex h-full min-w-0 flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-7 transition-colors duration-200 hover:border-blue-500/30"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-[var(--color-primary)]">
                  <service.icon
                    className="h-5 w-5"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="text-xs font-mono text-[var(--color-muted)]"
                >
                  {service.id}
                </span>
              </div>
              <h4 className="mb-3 text-lg sm:text-xl font-display font-semibold leading-snug tracking-tight">
                {t.services[service.titleKey]}
              </h4>
              <p className="max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
                {t.services[service.descriptionKey]}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
