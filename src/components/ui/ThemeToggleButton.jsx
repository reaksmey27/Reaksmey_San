import { Moon, Sun } from "lucide-react";
import { cn } from "../../utils/cn";

const sizeClassNames = {
  desktop: "p-2",
  mobile: "p-1.5",
};

const iconSizes = {
  desktop: 18,
  mobile: 16,
};

export function ThemeToggleButton({ theme, onToggle, size = "desktop" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted)] transition-colors duration-300 hover:bg-[var(--color-card-active)] hover:text-[var(--color-foreground)]",
        sizeClassNames[size],
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={iconSizes[size]} />
      ) : (
        <Moon size={iconSizes[size]} />
      )}
    </button>
  );
}
