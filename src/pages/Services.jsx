import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { SERVICES } from "../data/services";

export function Services() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[var(--color-background)]" id={SECTION_IDS.services}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <SectionHeading
            eyebrow={t.services.titlePrefix}
            title={t.services.headlineStart}
            highlight={t.services.headlineEnd}
          />
        </motion.div>

        <div className="flex flex-col gap-3">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 glass rounded-3xl hover:bg-[var(--color-card-active)] transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start md:items-center gap-6 mb-5 md:mb-0">
                <span className="text-lg sm:text-xl font-mono font-light text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors">{service.id}</span>
                <h4 className="text-lg sm:text-xl md:text-3xl font-display font-medium tracking-tight group-hover:pl-3 transition-all duration-300">
                  {t.services[service.titleKey]}
                </h4>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 max-w-md md:text-right">
                <p className="text-[var(--color-muted)] font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  {t.services[service.descriptionKey]}
                </p>
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-foreground)] group-hover:text-[var(--color-background)] transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
