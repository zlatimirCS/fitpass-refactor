export type Locale = "en" | "cg" | "sr" | "fr";
export type PathKey = "about" | "contact";

export const pathMapping: Record<Locale, Record<PathKey, string>> = {
  en: { about: "about", contact: "contact" },
  cg: { about: "a-propos", contact: "contact" },
  sr: { about: "o-nama", contact: "kontakt" },
  fr: { about: "a-propos", contact: "contact" },
};

export const reversePathMapping: Record<Locale, Record<string, PathKey>> = {
  en: { about: "about", contact: "contact" },
  cg: { "a-propos": "about", contact: "contact" },
  sr: { "o-nama": "about", kontakt: "contact" },
  fr: { "a-propos": "about", contact: "contact" },
};
