import { prepareProjectDates } from "./projectDates.js";

export const CATEGORY_BADGES = {
  web: "Web Development",
  design: "Design",
  vlog: "Vlog",
};
export const LINK_LABELS = {
  live: "Live Demo",
  code: "Source Code",
  facebook: "Facebook",
  figma: "View Design",
  video: "Watch Video",
};

export function prepareProject(data, fallbackOrder = 0) {
  const localized = {};
  for (const field of ["badge", "date", "description", "longDescription"]) {
    const en =
      data[field]?.en?.trim() ||
      (field === "badge" ? CATEGORY_BADGES[data.type] : "");
    localized[field] = { en, km: data[field]?.km?.trim() || en };
  }
  return {
    ...data,
    ...localized,
    date: prepareProjectDates(data.date),
    title: data.title.trim(),
    image: data.image.trim(),
    order: data.order === "" ? fallbackOrder : Number(data.order),
    tech: [...new Set(data.tech.map((item) => item.trim()).filter(Boolean))],
    links: data.links
      .filter((link) => link.url.trim())
      .map((link) => {
        const en =
          (typeof link.label === "string"
            ? link.label
            : link.label?.en
          )?.trim() ||
          LINK_LABELS[link.kind] ||
          "View project";
        return {
          ...link,
          url: link.url.trim(),
          label: { en, km: link.label?.km?.trim() || en },
        };
      }),
  };
}
