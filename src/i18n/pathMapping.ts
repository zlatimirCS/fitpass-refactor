export type Locale = "en" | "cg" | "sr" | "fr";
export type PathKey = "about" | "contact" | "explore-network";

export const pathMapping: Record<Locale, Record<PathKey, string>> = {
  en: {
    about: "about",
    contact: "contact",
    "explore-network": "explore-network",
  },
  cg: {
    about: "a-propos",
    contact: "contact",
    "explore-network": "istrazi-mrezu",
  },
  sr: {
    about: "o-nama",
    contact: "kontakt",
    "explore-network": "istrazi-mrezu",
  },
  fr: {
    about: "a-propos",
    contact: "contact",
    "explore-network": "explorer-reseau",
  },
};

export const reversePathMapping: Record<Locale, Record<string, PathKey>> = {
  en: {
    about: "about",
    contact: "contact",
    "explore-network": "explore-network",
  },
  cg: {
    "a-propos": "about",
    contact: "contact",
    "istrazi-mrezu": "explore-network",
  },
  sr: {
    "o-nama": "about",
    kontakt: "contact",
    "istrazi-mrezu": "explore-network",
  },
  fr: {
    "a-propos": "about",
    contact: "contact",
    "explorer-reseau": "explore-network",
  },
};
