'use client';

import { getWeatherBackground, getWindDirection } from '@/lib/weather';
import { AnimatedWeatherIcon, WindTurbine } from './WeatherAnimations';

export default function WeatherCard({ weather, city, locale, t }) {
  const cityName = city.names[locale] || city.names.en;
  const bg = getWeatherBackground(weather.icon);

  return (
    <div className={`relative rounded-3xl bg-gradient-to-br ${bg} text-white p-6 sm:p-8 shadow-2xl overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs text-white/60 uppercase tracking-wider">{t.currentWeather}</p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">{cityName}</h1>
            <p className="text-white/60 text-sm">{t.countries[city.country]}</p>
          </div>
          <WindTurbine speed={weather.wind_speed} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-8">
          <AnimatedWeatherIcon icon={weather.icon} size={100} />
          <div className="text-center sm:text-left">
            <div className="flex items-baseline gap-1">
              <span className="text-7xl sm:text-8xl font-extralight tracking-tighter">
                {Math.round(weather.temp)}
              </span>
              <span className="text-3xl font-thin text-white/60">°C</span>
            </div>
            <p className="text-xl text-white/90 capitalize mt-1 font-light">{weather.description}</p>
            <p className="text-sm text-white/60 mt-1">
              {t.feelsLike} {Math.round(weather.feels_like)}°C
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <GlassCard label={t.humidity} value={`${weather.humidity}%`} icon={<DropIcon />} />
          <GlassCard
            label={t.wind}
            value={`${weather.wind_speed} ${t.kmh}`}
            sub={getWindDirection(weather.wind_deg)}
            icon={<WindSmallIcon />}
          />
          <GlassCard label={t.pressure} value={`${weather.pressure}`} sub={t.hPa} icon={<GaugeIcon />} />
          <GlassCard label={t.visibility} value={`${weather.visibility}`} sub={t.km} icon={<EyeSmallIcon />} />
        </div>

        {/* Sunrise/Sunset */}
        <div className="mt-6 flex items-center justify-center gap-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.364.636l-2.121 2.121M21 12h-3M18.364 18.364l-2.121-2.121M12 21v-3m-6.364-.636l2.121-2.121M3 12h3m.636-6.364l2.121 2.121M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase">{t.sunrise}</div>
              <div className="font-semibold">{weather.sunrise}</div>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-400/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase">{t.sunset}</div>
              <div className="font-semibold">{weather.sunset}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-2xl p-3.5 text-center transition-all duration-300 group">
      <div className="flex justify-center mb-1.5 text-white/50 group-hover:text-white/80 transition-colors">
        {icon}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">{label}</div>
      <div className="text-sm font-bold">
        {value}
        {sub && <span className="text-xs font-normal text-white/50 ml-1">{sub}</span>}
      </div>
    </div>
  );
}

function DropIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 3 5 11 5 15.5C5 19.09 8.13 22 12 22C15.87 22 19 19.09 19 15.5C19 11 12 3 12 3Z" /></svg>;
}

function WindSmallIcon() {
  return <svg className="w-4 h-4 animate-wind-wave" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h11a3 3 0 100-6M4 12h15a3 3 0 110 6M4 16h8a3 3 0 110 6" /></svg>;
}

function GaugeIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" /></svg>;
}

function EyeSmallIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
