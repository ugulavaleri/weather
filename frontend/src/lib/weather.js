const PARSER_API = process.env.NEXT_PUBLIC_PARSER_API || 'http://localhost:5000';

export async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(`${PARSER_API}/api/weather?lat=${lat}&lon=${lon}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Weather API error');
    return await res.json();
  } catch {
    return getMockWeather();
  }
}

export async function fetchForecast(lat, lon) {
  try {
    const res = await fetch(`${PARSER_API}/api/forecast?lat=${lat}&lon=${lon}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Forecast API error');
    return await res.json();
  } catch {
    return getMockForecast();
  }
}

function getMockWeather() {
  return {
    temp: 18,
    feels_like: 16,
    humidity: 55,
    pressure: 1013,
    wind_speed: 12,
    wind_deg: 180,
    visibility: 10,
    description: 'Partly cloudy',
    icon: '02d',
    sunrise: '06:30',
    sunset: '19:45',
    uv_index: 5,
    dew_point: 9,
    cloud_cover: 40,
  };
}

function getMockForecast() {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      temp_high: 18 + Math.round(Math.random() * 10),
      temp_low: 8 + Math.round(Math.random() * 6),
      humidity: 40 + Math.round(Math.random() * 30),
      wind_speed: 5 + Math.round(Math.random() * 15),
      description: ['Sunny', 'Partly cloudy', 'Cloudy', 'Light rain', 'Clear'][Math.floor(Math.random() * 5)],
      icon: ['01d', '02d', '03d', '10d', '01d'][Math.floor(Math.random() * 5)],
    });
  }

  const hourly = [];
  for (let i = 0; i < 24; i++) {
    hourly.push({
      hour: `${String(i).padStart(2, '0')}:00`,
      temp: 12 + Math.round(Math.sin((i - 6) * 0.26) * 8),
      icon: i >= 6 && i <= 19 ? '01d' : '01n',
      description: 'Clear',
    });
  }

  return { daily: days, hourly };
}

export function getWeatherIcon(iconCode) {
  const icons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '🌨️', '13n': '🌨️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return icons[iconCode] || '☀️';
}

export function getWeatherBackground(iconCode) {
  if (!iconCode) return 'from-blue-400 to-blue-600';
  const code = iconCode.replace(/[dn]$/, '');
  const isNight = iconCode.endsWith('n');
  const backgrounds = {
    '01': isNight ? 'from-indigo-900 to-slate-900' : 'from-yellow-400 to-orange-400',
    '02': isNight ? 'from-indigo-800 to-slate-800' : 'from-blue-400 to-cyan-300',
    '03': 'from-gray-400 to-gray-500',
    '04': 'from-gray-500 to-gray-600',
    '09': 'from-gray-600 to-blue-700',
    '10': 'from-gray-500 to-blue-600',
    '11': 'from-gray-700 to-purple-900',
    '13': 'from-blue-100 to-gray-300',
    '50': 'from-gray-300 to-gray-400',
  };
  return backgrounds[code] || 'from-blue-400 to-blue-600';
}

export function getWindDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
}
