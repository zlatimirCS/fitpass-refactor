import { routeTranslations } from '@/lib/routeTranslations';
import { defineRouting } from 'next-intl/routing';

// Helper function to get localized path
export const getLocalizedPath = (locale: string, route: string) => {
  const translation =
    routeTranslations[locale as keyof typeof routeTranslations];
  const path = translation?.[route as keyof typeof translation] || route;
  return `/${path}`;
};

export const routing = defineRouting({
  locales: ['en', process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about-us': {
      en: '/about-us',
      [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]:
        getLocalizedPath(
          process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string,
          'about-us'
        ),
    },
  },
});
