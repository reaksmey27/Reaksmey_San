import { adminClasses } from "../styles/adminStyles";
import { useState } from "react";
import { Check, Plus, Search, X } from "lucide-react";
import {
  TECHNOLOGIES,
  findTechnology,
  technologyKey,
} from "../data/technologies";
import { TechIcon } from "./ui/TechIcon";

export function TechnologyPicker({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const selected = new Set(value.map(technologyKey));
  const trimmed = query.trim();
  const matches = TECHNOLOGIES.filter(
    (item) =>
      (group === "all" || (item.group || "technologies") === group) &&
      [item.name, item.label, ...(item.aliases || [])].some((name) =>
        name.toLowerCase().includes(trimmed.toLowerCase()),
      ),
  );
  function toggle(name) {
    const key = technologyKey(name);
    onChange(
      selected.has(key)
        ? value.filter((item) => technologyKey(item) !== key)
        : [...value, findTechnology(name)?.name || name.trim()],
    );
  }
  function addCustom() {
    if (!trimmed || selected.has(technologyKey(trimmed))) return;
    onChange([...value, findTechnology(trimmed)?.name || trimmed]);
    setQuery("");
  }
  return (
    <section
      className={adminClasses("admin-tech-picker")}
      aria-label="Technologies and tools"
    >
      <div className={adminClasses("admin-form-section-title")}>
        <h3>Technologies & tools</h3>
        <small>Optional</small>
      </div>
      <p>Choose what you used. Icons appear automatically on your project.</p>
      {value.length > 0 && (
        <ul
          className={adminClasses("admin-tech-selected")}
          aria-label="Selected technologies and tools"
        >
          {value.map((name, index) => (
            <li key={`${name}-${index}`}>
              <TechIcon name={name} />
              <span>{findTechnology(name)?.label || name}</span>
              <button
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() =>
                  onChange(
                    value.filter(
                      (item) => technologyKey(item) !== technologyKey(name),
                    ),
                  )
                }
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <label className={adminClasses("admin-tech-search")}>
        <span className="sr-only">
          Search technologies or add a custom tool
        </span>
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search React, Figma, Firebase…"
          maxLength={60}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
        />
      </label>
      <div
        className={adminClasses("admin-tech-filters")}
        role="group"
        aria-label="Technology categories"
      >
        {[
          ["all", "All"],
          ["technologies", "Technologies"],
          ["tools", "Tools"],
        ].map(([key, label]) => (
          <button
            type="button"
            key={key}
            aria-pressed={group === key}
            onClick={() => setGroup(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={adminClasses("admin-tech-options")}>
        {matches.map((item) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={selected.has(technologyKey(item.name))}
            aria-label={`Select ${item.label}`}
            onClick={() => toggle(item.name)}
          >
            <TechIcon name={item.name} />
            <span>{item.label}</span>
            {selected.has(technologyKey(item.name)) ? (
              <Check size={14} className={adminClasses("admin-tech-check")} />
            ) : (
              <Plus size={14} className={adminClasses("admin-tech-check")} />
            )}
          </button>
        ))}
      </div>
      {!matches.length && (
        <p>
          No matching presets. You can add a custom technology or tool below.
        </p>
      )}
      {trimmed &&
        !findTechnology(trimmed) &&
        !selected.has(technologyKey(trimmed)) && (
          <button
            type="button"
            className={adminClasses("admin-tech-custom")}
            onClick={addCustom}
          >
            <Plus size={16} />
            Add “{trimmed}” with a code icon
          </button>
        )}
      <small>
        {value.length} selected · Select again or use × to remove. Custom tools
        use a code icon.
      </small>
    </section>
  );
}
