'use client';

import Link from 'next/link';
import { useState } from 'react';
import { locales, localeNames } from '@/lib/i18n';
import { getTheme, getCountryConfig } from '@/lib/countryConfig';
import SearchBar from './SearchBar';
import Flag from './Flag';

export default function Header({ locale, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = getTheme();
  const config = getCountryConfig();

  return (
    <header className={`bg-white/80 backdrop-blur-md border-b ${theme.headerBorder} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className={`w-9 h-9 bg-gradient-to-br ${theme.logo} rounded-xl flex items-center justify-center`}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <Flag size="small" className="rounded-sm overflow-hidden" />
            <span className={`text-xl font-bold bg-gradient-to-r ${theme.logoText} bg-clip-text text-transparent`}>
              {config.siteName}
            </span>
          </Link>

          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar locale={locale} t={t} />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {localeNames[locale]}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={`/${loc}`}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        loc === locale ? `${theme.langActive} font-medium` : 'text-gray-700'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {localeNames[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar locale={locale} t={t} />
        </div>
      </div>
    </header>
  );
}
