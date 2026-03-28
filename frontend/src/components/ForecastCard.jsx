import { getWeatherIcon } from '@/lib/weather';
import { getTheme } from '@/lib/countryConfig';

export default function ForecastCard({ forecast, t }) {
  const theme = getTheme();

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100/80 p-6 sm:p-8">
      {/* Hourly Forecast - horizontal scroll */}
      {forecast.hourly && forecast.hourly.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.hourly}
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {forecast.hourly.map((hour, i) => (
              <div
                key={hour.hour}
                className={`flex-none w-[72px] text-center rounded-2xl py-3 px-2 transition-all duration-200 ${
                  i === 0 ? `bg-gradient-to-b ${theme.primary} text-white shadow-lg` : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`text-xs mb-1.5 font-medium ${i === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                  {i === 0 ? t.today?.substring(0, 3) || 'Now' : hour.hour}
                </div>
                <div className="text-xl mb-1.5">{getWeatherIcon(hour.icon)}</div>
                <div className={`text-sm font-bold ${i === 0 ? '' : 'text-gray-900'}`}>
                  {Math.round(hour.temp)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Forecast */}
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        {t.weekForecast}
      </h2>
      <div className="space-y-1">
        {forecast.daily?.map((day, i) => (
          <DayRow key={day.date} day={day} isToday={i === 0} t={t} theme={theme} index={i} />
        ))}
      </div>
    </div>
  );
}

function DayRow({ day, isToday, t, theme, index }) {
  const date = new Date(day.date);
  const dayName = isToday
    ? t.today
    : date.toLocaleDateString('en', { weekday: 'short' });

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 py-2.5 px-3 rounded-xl transition-all duration-200 animate-fade-in-up ${
        isToday ? `${theme.accentLight} ${theme.accentBorder} border` : 'hover:bg-gray-50'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`w-14 text-sm font-semibold ${isToday ? theme.accent : 'text-gray-700'}`}>
        {dayName}
      </div>
      <div className="text-xl w-8 text-center">{getWeatherIcon(day.icon)}</div>
      <div className="flex-1 hidden sm:block">
        <div className="text-xs text-gray-400 capitalize truncate">{day.description}</div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-bold text-gray-900 w-8 text-right">{Math.round(day.temp_high)}°</span>
        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${theme.primary} rounded-full animate-grow-bar`}
            style={{
              width: `${Math.min(100, Math.max(20, ((day.temp_high - day.temp_low) / 25) * 100))}%`,
              animationDelay: `${index * 80}ms`
            }}
          />
        </div>
        <span className="text-gray-400 w-8">{Math.round(day.temp_low)}°</span>
      </div>
    </div>
  );
}
