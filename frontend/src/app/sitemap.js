import { locales } from '@/lib/i18n';
import { cities } from '@/lib/cities';
import { getCountryConfig } from '@/lib/countryConfig';

export default function sitemap() {
  const config = getCountryConfig();
  const baseUrl = `https://${config.domain}`;
  const entries = [];

  // Home pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });
  }

  // City pages for each locale
  for (const city of cities) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/city/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}/city/${city.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
