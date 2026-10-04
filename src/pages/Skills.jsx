import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { getSkillLevel, SKILL_CATEGORIES, SKILLS } from "../data/skills";
import { getLocalizedValue } from "../utils/localization";

export function Skills() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory,
  );

  return (
    <section className="py-24 relative" id={SECTION_IDS.skills}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <SectionHeading
            eyebrow={t.skills.titlePrefix}
            title={t.skills.headlineStart}
            highlight={t.skills.headlineEnd}
            titleClassName="text-3xl sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          role="group"
          aria-label={`${t.skills.headlineStart} ${t.skills.headlineEnd}`}
          className="mb-6 flex w-fit max-w-full flex-wrap items-center gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-1.5 sm:mb-8"
        >
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              aria-pressed={activeCategory === category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                activeCategory === category.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--color-foreground)]/75 hover:bg-blue-500/10 hover:text-[var(--color-primary)]"
              }`}
            >
              {getLocalizedValue(category.label, language)}
              <span
                aria-hidden="true"
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[10px] font-semibold tabular-nums ${
                  activeCategory === category.key
                    ? "bg-white/20 text-white"
                    : "bg-[var(--color-foreground)]/5 text-[var(--color-foreground)]/60"
                }`}
              >
                {category.key === "All"
                  ? SKILLS.length
                  : SKILLS.filter((skill) => skill.category === category.key)
                      .length}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className="min-w-0 h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors duration-200 hover:border-blue-500/30"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
                    <skill.icon
                      className="h-5 w-5"
                      style={{ color: skill.color }}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-[var(--color-foreground)]">
                      {skill.name}
                    </h4>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-muted)]">
                      {getLocalizedValue(
                        getSkillLevel(skill.percentage),
                        language,
                      )}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-[var(--color-foreground)]">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full">
                  <div
                    role="meter"
                    aria-label={skill.name}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={skill.percentage}
                    className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${skill.percentage}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
