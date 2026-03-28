'use client';

import { getTheme } from '@/lib/countryConfig';
import CountryEmblem from './CountryEmblem';
import Flag from './Flag';

export default function HeroSection({ weather, capital, locale, t, config }) {
  const theme = getTheme();
  const cityName = capital.names[locale] || capital.names.en;
  const slogan = config.siteSlogan[locale] || config.siteSlogan[config.defaultLocale];

  return (
    <section className={`relative bg-gradient-to-b ${theme.hero} text-white overflow-hidden`}>
      {/* Background emblem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CountryEmblem className="w-[400px] h-[400px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Slogan - centered */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h2 className="text-sm sm:text-base font-medium text-white/70">
            <span className="font-bold text-white">{config.siteName}</span> — {slogan}
          </h2>
        </div>

        {/* Main weather - all centered */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          {/* City + Flag */}
          <div className="flex items-center gap-2 justify-center mb-3">
            <Flag size="small" className="rounded-sm shadow-sm" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{cityName}</h1>
          </div>

          {/* Temperature */}
          <div className="flex items-baseline gap-1 justify-center">
            <span className="text-7xl sm:text-8xl font-extralight tracking-tighter leading-none">
              {Math.round(weather.temp)}
            </span>
            <span className="text-3xl font-thin text-white/60">°C</span>
          </div>

          {/* Description */}
          <p className="text-lg capitalize text-white/90 font-light mt-2">{weather.description}</p>
          <p className="text-sm text-white/50 mt-1">{t.feelsLike} {Math.round(weather.feels_like)}°C</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-white/50 justify-center">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 animate-wind-wave" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M4 8h11a3 3 0 100-6M4 16h8a3 3 0 110 6" /></svg>
              {weather.wind_speed} {t.kmh}
            </span>
            <span>{t.humidity}: {weather.humidity}%</span>
          </div>
        </div>

        {/* Stats row - centered */}
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            <MiniStat label={t.pressure} value={`${weather.pressure} ${t.hPa}`} />
            <MiniStat label={t.visibility} value={`${weather.visibility} ${t.km}`} />
            <MiniStat label={t.sunrise} value={weather.sunrise} />
            <MiniStat label={t.sunset} value={weather.sunset} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-sm rounded-xl border border-white/[0.06] transition-all duration-200 text-center min-w-[100px]">
      <div className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">{label}</div>
      <div className="text-xs font-semibold">{value}</div>
    </div>
  );
}
