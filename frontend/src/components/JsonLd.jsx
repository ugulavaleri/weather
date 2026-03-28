import { getCountryConfig } from '@/lib/countryConfig';

function getBaseUrl() {
  return `https://${getCountryConfig().domain}`;
}

export function WebsiteJsonLd({ locale, t }) {
  const baseUrl = getBaseUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.siteName,
    description: t.siteDescription,
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/${locale}/city/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CityWeatherJsonLd({ city, weather, locale, t }) {
  const baseUrl = getBaseUrl();
  const cityName = city.names[locale] || city.names.en;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${t.weatherIn} ${cityName}`,
    description: `${t.currentWeather} ${cityName}: ${Math.round(weather.temp)}°C, ${weather.description}`,
    url: `${baseUrl}/${locale}/city/${city.slug}`,
    inLanguage: locale,
    about: {
      '@type': 'City',
      name: cityName,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lon,
      },
      containedInPlace: {
        '@type': 'Country',
        name: t.countries[city.country],
      },
    },
    mainEntity: {
      '@type': 'Observation',
      measuredProperty: 'Weather',
      measuredValue: `${Math.round(weather.temp)}°C`,
      observationDate: new Date().toISOString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
