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
  heroImage: new URL("../assets/images/hero.webp", import.meta.url).href,
  aboutImage: new URL("../assets/images/about.webp", import.meta.url).href,
};

export const CONTACT_DETAILS = {
  email: "reaksmeysan.official@gmail.com",
  location: "Sangkat Tek Thla, Khan SenSok, Phnom Penh, Cambodia",
  resumeHref: new URL("../assets/CV/REAKSMEY SAN-CV.pdf", import.meta.url).href,
  resumeFilename: "REAKSMEY SAN-CV.pdf",
};

export const SOCIAL_LINKS = [
  {
    label: "Telegram",
    href: "https://t.me/SMEY_QUALITY27?utm_source=chatgpt.com",
    kind: "telegram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@i_am_smey27",
    kind: "tiktok",
  },
  {
    label: "GitHub",
    href: "https://github.com/reaksmey27",
    kind: "github",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/19jVxok7nj/?mibextid=wwXIfr",
    kind: "facebook",
  },
  {
    label: "Facebook Page",
    href: "https://www.facebook.com/people/SMEY-Quality/100071068442748/",
    kind: "facebook",
  },
];
