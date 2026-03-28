import Link from 'next/link';
import { locales, localeNames } from '@/lib/i18n';
import { cities } from '@/lib/cities';
import { getCountryConfig, getTheme } from '@/lib/countryConfig';
import CountryEmblem from './CountryEmblem';
import Flag from './Flag';

export default function Footer({ locale, t }) {
  const config = getCountryConfig();
  const theme = getTheme();

  return (
    <footer className={`${theme.footerBg} text-gray-300 mt-auto relative overflow-hidden`}>
      {/* Emblem watermark */}
      <div className="absolute right-8 bottom-8 opacity-[0.03] pointer-events-none">
        <CountryEmblem className="w-[250px] h-[250px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Cities grid */}
        <div className="mb-10">
          <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
            <Flag size="small" className="rounded-sm opacity-70" />
            {t.allCities}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${locale}/city/${city.slug}`}
                className="text-xs text-gray-400 hover:text-white transition-colors py-1"
              >
                {city.names[locale] || city.names.en}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 bg-gradient-to-br ${theme.logo} rounded-lg flex items-center justify-center`}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">{config.siteName}</span>
            <span className="text-xs text-gray-500">© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-3">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={`text-xs transition-colors ${
                  loc === locale ? theme.footerLinkActive : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
