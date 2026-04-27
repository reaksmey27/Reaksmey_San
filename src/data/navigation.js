import { SECTION_IDS } from "../config/site";

export const NAVIGATION_ITEMS = [
  { id: SECTION_IDS.hero, labelKey: "home" },
  { id: SECTION_IDS.about, labelKey: "about" },
  { id: SECTION_IDS.skills, labelKey: "skills" },
  { id: SECTION_IDS.services, labelKey: "services" },
  { id: SECTION_IDS.work, labelKey: "work" },
  { id: SECTION_IDS.experience, labelKey: "experience" },
  { id: SECTION_IDS.contact, labelKey: "contact" },
];

export function getNavigationLinks(navTranslations) {
  return NAVIGATION_ITEMS.map(({ id, labelKey }) => ({
    id,
    href: `#${id}`,
    name: navTranslations[labelKey],
  }));
}
