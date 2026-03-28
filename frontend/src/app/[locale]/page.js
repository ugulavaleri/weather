import { getTranslation } from '@/lib/i18n';
import { getPopularCities, getCapitalCity } from '@/lib/cities';
import { fetchWeather, fetchForecast } from '@/lib/weather';
import { getCountryConfig, getTheme } from '@/lib/countryConfig';
import { WebsiteJsonLd } from '@/components/JsonLd';
import ForecastCard from '@/components/ForecastCard';
import CityGrid from '@/components/CityGrid';
import HeroSection from '@/components/HeroSection';

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = getTranslation(locale);
  const config = getCountryConfig();
  const theme = getTheme();
  const capital = getCapitalCity();
  const otherCities = getPopularCities(20).filter((c) => c.slug !== capital.slug);

  const [weather, forecast] = await Promise.all([
    fetchWeather(capital.lat, capital.lon),
    fetchForecast(capital.lat, capital.lon),
  ]);

  return (
    <>
      <WebsiteJsonLd locale={locale} t={t} />

      <HeroSection weather={weather} capital={capital} locale={locale} t={t} config={config} />

      {/* Quick city links - visible right after hero */}
      {otherCities.length > 0 && (
        <section className={`bg-gradient-to-b ${theme.accentLight} to-white border-b ${theme.accentBorder}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {otherCities.slice(0, 12).map((city) => (
                <a
                  key={city.slug}
                  href={`/${locale}/city/${city.slug}`}
                  className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border ${theme.accentBorder} bg-white ${theme.accent} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                >
                  {city.names[locale] || city.names.en}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Forecast */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ForecastCard forecast={forecast} t={t} />
      </section>

      {/* All Cities Grid */}
      {otherCities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.allCities}</h2>
          <CityGrid cities={otherCities} locale={locale} t={t} />
        </section>
      )}

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {config.seoTitle[locale] || config.seoTitle[config.defaultLocale]}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed space-y-3">
            {(config.seoContent[locale] || config.seoContent[config.defaultLocale])?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
