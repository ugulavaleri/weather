import Link from 'next/link';
import { getTheme } from '@/lib/countryConfig';

export default function CityGrid({ cities, locale, t }) {
  const theme = getTheme();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {cities.map((city, i) => (
        <Link
          key={city.slug}
          href={`/${locale}/city/${city.slug}`}
          className={`group relative bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:shadow-xl ${theme.cityCardHover} transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up`}
          style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
        >
          {/* Hover gradient accent */}
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-bold text-gray-900 ${theme.cityCardText} transition-colors text-sm sm:text-base`}>
                  {city.names[locale] || city.names.en}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{t.countries[city.country]}</p>
              </div>
              {/* Arrow icon on hover */}
              <div className={`w-7 h-7 rounded-full ${theme.accentLight} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0`}>
                <svg className={`w-3.5 h-3.5 ${theme.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>

            {/* Population indicator */}
            <div className="mt-3 flex items-center gap-1.5">
              <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-[10px] text-gray-400">
                {city.population >= 1000000
                  ? `${(city.population / 1000000).toFixed(1)}M`
                  : `${Math.round(city.population / 1000)}K`}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
