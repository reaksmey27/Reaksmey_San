export const SITE_NAME = "SMEY";

export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_THEME = "dark";

export const STORAGE_KEYS = {
  language: "smey-portfolio-language",
  theme: "smey-portfolio-theme",
};

export const LANGUAGE_OPTIONS = [
  {
    value: "en",
    label: "EN",
    name: "English",
    flagSrc: "https://flagcdn.com/w20/gb.png",
    flagSrcSet: "https://flagcdn.com/w40/gb.png 2x",
  },
  {
    value: "km",
    label: "KM",
    name: "Khmer",
    flagSrc: "https://flagcdn.com/w20/kh.png",
    flagSrcSet: "https://flagcdn.com/w40/kh.png 2x",
  },
];

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  skills: "skills",
  services: "services",
  work: "work",
  experience: "experience",
  contact: "contact",
};

export const PROFILE_ASSETS = {
  heroImage: new URL("../assets/images/hero.png", import.meta.url).href,
  aboutImage: new URL("../assets/images/about.png", import.meta.url).href,
};

export const CONTACT_DETAILS = {
  email: "reaksmey.san@student.passerellesnumeriques.org",
  location: "Phnom Penh, Cambodia",
  resumeHref: new URL("../assets/CV/CV & CL REAKSMEY SAN.pdf", import.meta.url).href,
};

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/reaksmey27",
    kind: "github",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/reel/2579802185738910",
    kind: "facebook",
  },
];
