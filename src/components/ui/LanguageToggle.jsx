import { motion } from "motion/react";
import { LANGUAGE_OPTIONS } from "../../config/site";
import { cn } from "../../utils/cn";

const toggleStyles = {
  desktop: {
    button: "px-3 py-1.5 text-xs",
    flag: "w-4",
    label: "inline",
  },
  mobile: {
    button: "px-2 py-1 text-[10px] sm:text-xs",
    flag: "w-3.5",
    label: "hidden sm:inline",
  },
};

export function LanguageToggle({
  language,
  onChange,
  size = "desktop",
  layoutId,
}) {
  const styles = toggleStyles[size];

  return (
    <div className="relative flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] p-1">
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = language === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 font-bold uppercase transition-colors duration-300",
              styles.button,
              isActive
                ? "text-[var(--color-background)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            )}
          >
            {isActive ? (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[var(--color-foreground)] shadow-sm"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            ) : null}
            <img
              src={option.flagSrc}
              srcSet={option.flagSrcSet}
              alt={option.name}
              className={cn("h-auto rounded-sm relative z-10", styles.flag)}
            />
            <span className={cn("relative z-10", styles.label)}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
