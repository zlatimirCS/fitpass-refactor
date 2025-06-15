import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "cg", "sr", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  localePrefix: "always",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      cg: "/a-propos",
      sr: "/o-nama",
      fr: "/a-propos",
    },
    "/contact": {
      en: "/contact",
      cg: "/contact",
      sr: "/kontakt",
      fr: "/contact",
    },
    "/explore-network": {
      en: "/explore-network",
      cg: "/istrazi-mrezu",
      sr: "/istrazi-mrezu",
      fr: "/explorer-reseau",
    },
    "/explore-network/[slug]": {
      en: "/explore-network/[slug]",
      cg: "/istrazi-mrezu/[slug]",
      sr: "/istrazi-mrezu/[slug]",
      fr: "/explorer-reseau/[slug]",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|cg|sr|fr)/:path*"],
};
