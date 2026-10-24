import { Code2 } from "lucide-react";
import { findTechnology } from "../../data/technologies";

export function TechIcon({ name, className = "w-4 h-4" }) {
  const technology = findTechnology(name);
  const Icon = technology?.icon || Code2;
  return (
    <Icon
      className={className}
      style={{ color: technology?.color || "currentColor", flexShrink: 0 }}
      aria-hidden="true"
    />
  );
}
