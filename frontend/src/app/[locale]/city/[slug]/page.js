import { notFound } from 'next/navigation';
import { locales, getTranslation, formatSeoString } from '@/lib/i18n';
import { getCityBySlug, getAllSlugs, getPopularCities } from '@/lib/cities';
import { getCountryConfig, getTheme } from '@/lib/countryConfig';
import { fetchWeather, fetchForecast } from '@/lib/weather';
import { CityWeatherJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import CountryEmblem from '@/components/CountryEmblem';
import Flag from '@/components/Flag';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const t = getTranslation(locale);
  const config = getCountryConfig();
  const cityName = city.names[locale] || city.names.en;

  const title = formatSeoString(t.seoTitle, { city: cityName });
  const description = formatSeoString(t.seoDescription, { city: cityName, days: '7' });

  return {
    title,
    description,
    alternates: {
      canonical: `https://${config.domain}/${locale}/city/${slug}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `https://${config.domain}/${loc}/city/${slug}`])
      ),
    },
    openGraph: { title, description, locale, type: 'article', url: `https://${config.domain}/${locale}/city/${slug}` },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CityPage({ params }) {
  const { locale, slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const t = getTranslation(locale);
  const config = getCountryConfig();
  const theme = getTheme();
  const cityName = city.names[locale] || city.names.en;

  const [weather, forecast] = await Promise.all([
    fetchWeather(city.lat, city.lon),
    fetchForecast(city.lat, city.lon),
  ]);

  const otherCities = getPopularCities(10).filter((c) => c.slug !== slug);

  const breadcrumbs = [
    { name: t.home, url: `https://${config.domain}/${locale}` },
    { name: cityName, url: `https://${config.domain}/${locale}/city/${slug}` },
  ];

  return (
    <>
      <CityWeatherJsonLd city={city} weather={weather} locale={locale} t={t} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* City hero banner with country colors */}
      <div className={`relative bg-gradient-to-r ${theme.primary} overflow-hidden`}>
        {/* Emblem watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.08]">
          <CountryEmblem className="w-[200px] h-[200px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <a href={`/${locale}`} className="hover:text-white transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                  </svg>
                  {t.home}
                </a>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium flex items-center gap-1.5">
                <Flag size="small" className="rounded-sm w-5 h-3.5" />
                {cityName}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <WeatherCard weather={weather} city={city} locale={locale} t={t} />

        <div className="mt-6">
          <ForecastCard forecast={forecast} t={t} />
        </div>

        {/* Other cities quick links */}
        {otherCities.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t.allCities}</h3>
            <div className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <a
                  key={c.slug}
                  href={`/${locale}/city/${c.slug}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border ${theme.accentBorder} bg-white ${theme.accent} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                >
                  {c.names[locale] || c.names.en}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <article className="mt-8 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Flag size="small" className="rounded-sm" />
            {t.weatherIn} {cityName}
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            {locale === 'tr' && (
              <>
                <p>{cityName} şehrinde güncel hava durumu. Hava sıcaklığı, nem, rüzgar hızı ve yönü, atmosfer basıncı ve görüş mesafesi hakkında detaylı bilgi.</p>
                <p>{cityName} hava durumu her saat güncellenir. Saatlik ve 7 günlük tahmin sunuyoruz.</p>
              </>
            )}
            {locale === 'ru' && (
              <>
                <p>Актуальный прогноз погоды в городе {cityName}. Подробная информация о температуре воздуха, влажности, скорости и направлении ветра, атмосферном давлении и видимости.</p>
                <p>Прогноз погоды в {cityName} обновляется каждый час. Мы предоставляем почасовой и 7-дневный прогноз.</p>
              </>
            )}
            {locale === 'kk' && (
              <>
                <p>{cityName} қаласындағы ауа райының өзекті болжамы. Ауа температурасы, ылғалдылық, жел жылдамдығы, атмосфералық қысым туралы толық ақпарат.</p>
                <p>{cityName} ауа райы болжамы сағат сайын жаңартылады.</p>
              </>
            )}
            {locale === 'az' && (
              <>
                <p>{cityName} şəhərində aktual hava proqnozu. Hava temperaturu, rütubət, küləyin sürəti və istiqaməti, atmosfer təzyiqi haqqında ətraflı məlumat.</p>
                <p>{cityName} hava proqnozu hər saat yenilənir. Saatlıq və 7 günlük proqnoz təqdim edirik.</p>
              </>
            )}
            {locale === 'en' && (
              <>
                <p>Current weather forecast for {cityName}. Detailed information about air temperature, humidity, wind speed and direction, atmospheric pressure and visibility.</p>
                <p>Weather forecast for {cityName} is updated every hour. We provide hourly and 7-day forecasts.</p>
              </>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
