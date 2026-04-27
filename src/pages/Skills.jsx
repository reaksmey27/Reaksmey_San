import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { SKILL_CATEGORIES, SKILLS } from "../data/skills";
import { getLocalizedValue } from "../utils/localization";

export function Skills() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory,
  );

  return (
    <section className="py-20 relative" id={SECTION_IDS.skills}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <SectionHeading
            eyebrow={t.skills.titlePrefix}
            title={t.skills.headlineStart}
            highlight={t.skills.headlineEnd}
            centered
          />
          <div className="w-24 md:w-36 h-1 bg-blue-500 mx-auto rounded-full mt-5"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-12"
        >
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category.key
                  ? "bg-blue-500 text-[var(--color-foreground)] shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : "border border-blue-500 text-blue-500 hover:bg-blue-500/10"
              }`}
            >
              {getLocalizedValue(category.label, language)}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="flex flex-wrap justify-center gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className="w-[96px] h-[96px] sm:w-[116px] sm:h-[116px] lg:w-[138px] lg:h-[132px] bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 hover:bg-[var(--color-card-active)] hover:border-[var(--color-glass-border)] transition-all duration-300 hover:scale-105 shadow-xl glass cursor-pointer"
              >
                <skill.icon
                  className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300"
                  style={{ color: skill.color }}
                />
                <span className="text-xs sm:text-sm md:text-base font-semibold text-[var(--color-foreground)]/90">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
