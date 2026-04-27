import { cn } from "../../utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  centered = false,
  stacked = false,
  className,
  titleClassName,
}) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm">
        {eyebrow}
      </h2>
      <h3
        className={cn(
          "font-display text-2xl font-light sm:text-3xl md:text-4xl",
          titleClassName,
        )}
      >
        {title}
        {stacked ? <br /> : " "}
        <span className="font-bold">{highlight}</span>
      </h3>
    </div>
  );
}
