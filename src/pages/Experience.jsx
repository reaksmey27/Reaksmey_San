import { motion } from "motion/react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { EXPERIENCES } from "../data/experience";

export function Experience() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-[var(--color-background)]" id={SECTION_IDS.experience}>
      <div className="container mx-auto px-6 max-w-4xl pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <SectionHeading
            eyebrow={t.experience.titlePrefix}
            title={t.experience.headlineStart}
            highlight={t.experience.headlineEnd}
            centered
            titleClassName="text-3xl sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <div className="relative pl-4 md:pl-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-card-active)] -translate-x-1/2" />
          
          <div className="flex flex-col gap-12 md:gap-24">
            {EXPERIENCES.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-center justify-between group ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-[-21px] z-10 h-3 w-3 rounded-full bg-[var(--color-foreground)] shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 md:left-1/2 md:-translate-x-1/2 md:shadow-none md:group-hover:scale-150 md:group-hover:bg-[var(--color-foreground)] md:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                
                <div className="md:hidden absolute left-[-16px] top-4 bottom-[-48px] w-[1px] bg-[var(--color-card-active)]" />

                <div className="w-full md:w-[45%] flex flex-col justify-center">
                  <div className={`p-6 sm:p-8 glass rounded-2xl hover:bg-[var(--color-card)] transition-colors ${index % 2 === 0 ? "md:text-left" : "md:text-left"}`}>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#FF6321]">{experience.period}</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-display font-medium tracking-tight mb-1">
                      {t.experience[experience.roleKey]}
                    </h4>
                    <h5 className="text-base sm:text-lg font-light text-[var(--color-foreground)]/70 mb-4">
                      {t.experience[experience.companyKey]}
                    </h5>
                    <p className="text-[var(--color-muted)] font-light leading-relaxed text-sm lg:text-base">
                      {t.experience[experience.descriptionKey]}
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
