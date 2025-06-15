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
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|cg|sr|fr)/:path*"],
};
