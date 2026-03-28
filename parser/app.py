import os
import time
import json
import requests
from datetime import datetime, timezone
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from bs4 import BeautifulSoup

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('OPENWEATHER_API_KEY', '')
CACHE_DURATION = int(os.getenv('CACHE_DURATION', 1800))

# In-memory cache
weather_cache = {}
forecast_cache = {}


def get_cache_key(lat, lon):
    return f"{round(lat, 2)}_{round(lon, 2)}"


def is_cache_valid(cache_entry):
    if not cache_entry:
        return False
    return (time.time() - cache_entry['timestamp']) < CACHE_DURATION


# ==================== FREE WEATHER DATA SOURCES ====================

def fetch_from_openweathermap(lat, lon):
    """Fetch weather from OpenWeatherMap free API (1000 calls/day)."""
    if not API_KEY:
        return None
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        return {
            'temp': round(data['main']['temp']),
            'feels_like': round(data['main']['feels_like']),
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'wind_speed': round(data['wind']['speed'] * 3.6),  # m/s to km/h
            'wind_deg': data['wind'].get('deg', 0),
            'visibility': round(data.get('visibility', 10000) / 1000, 1),
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'sunrise': datetime.fromtimestamp(data['sys']['sunrise'], tz=timezone.utc).strftime('%H:%M'),
            'sunset': datetime.fromtimestamp(data['sys']['sunset'], tz=timezone.utc).strftime('%H:%M'),
            'uv_index': 0,
            'dew_point': 0,
            'cloud_cover': data['clouds']['all'],
        }
    except Exception as e:
        print(f"OpenWeatherMap error: {e}")
        return None


def fetch_forecast_from_openweathermap(lat, lon):
    """Fetch 5-day forecast from OpenWeatherMap free API."""
    if not API_KEY:
        return None
    try:
        url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        # Process hourly (3-hour intervals)
        hourly = []
        for item in data['list'][:8]:
            dt = datetime.fromtimestamp(item['dt'], tz=timezone.utc)
            hourly.append({
                'hour': dt.strftime('%H:%M'),
                'temp': round(item['main']['temp']),
                'icon': item['weather'][0]['icon'],
                'description': item['weather'][0]['description'],
            })

        # Process daily (group by date)
        daily_map = {}
        for item in data['list']:
            date = datetime.fromtimestamp(item['dt'], tz=timezone.utc).strftime('%Y-%m-%d')
            if date not in daily_map:
                daily_map[date] = {
                    'date': date,
                    'temps': [],
                    'humidity': [],
                    'wind': [],
                    'icon': item['weather'][0]['icon'],
                    'description': item['weather'][0]['description'],
                }
            daily_map[date]['temps'].append(item['main']['temp'])
            daily_map[date]['humidity'].append(item['main']['humidity'])
            daily_map[date]['wind'].append(item['wind']['speed'] * 3.6)

        daily = []
        for date, info in list(daily_map.items())[:7]:
            daily.append({
                'date': info['date'],
                'temp_high': round(max(info['temps'])),
                'temp_low': round(min(info['temps'])),
                'humidity': round(sum(info['humidity']) / len(info['humidity'])),
                'wind_speed': round(sum(info['wind']) / len(info['wind'])),
                'description': info['description'],
                'icon': info['icon'],
            })

        return {'daily': daily, 'hourly': hourly}
    except Exception as e:
        print(f"OpenWeatherMap forecast error: {e}")
        return None


def scrape_open_meteo(lat, lon):
    """Fetch weather from Open-Meteo (completely free, no API key needed)."""
    try:
        url = (
            f"https://api.open-meteo.com/v1/forecast?"
            f"latitude={lat}&longitude={lon}"
            f"&current=temperature_2m,relative_humidity_2m,apparent_temperature,"
            f"weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,"
            f"cloud_cover,uv_index"
            f"&timezone=auto"
        )
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        current = data['current']

        wmo_code = current.get('weather_code', 0)
        icon, description = wmo_to_icon(wmo_code)

        return {
            'temp': round(current['temperature_2m']),
            'feels_like': round(current['apparent_temperature']),
            'humidity': current['relative_humidity_2m'],
            'pressure': round(current['surface_pressure']),
            'wind_speed': round(current['wind_speed_10m']),
            'wind_deg': current['wind_direction_10m'],
            'visibility': 10,
            'description': description,
            'icon': icon,
            'sunrise': '06:00',
            'sunset': '19:00',
            'uv_index': round(current.get('uv_index', 0)),
            'dew_point': 0,
            'cloud_cover': current.get('cloud_cover', 0),
        }
    except Exception as e:
        print(f"Open-Meteo error: {e}")
        return None


def scrape_forecast_open_meteo(lat, lon):
    """Fetch forecast from Open-Meteo (free, no API key)."""
    try:
        url = (
            f"https://api.open-meteo.com/v1/forecast?"
            f"latitude={lat}&longitude={lon}"
            f"&daily=temperature_2m_max,temperature_2m_min,weather_code,"
            f"relative_humidity_2m_mean,wind_speed_10m_max"
            f"&hourly=temperature_2m,weather_code"
            f"&timezone=auto&forecast_days=7"
        )
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        daily = []
        for i in range(len(data['daily']['time'])):
            wmo_code = data['daily']['weather_code'][i]
            icon, description = wmo_to_icon(wmo_code)
            daily.append({
                'date': data['daily']['time'][i],
                'temp_high': round(data['daily']['temperature_2m_max'][i]),
                'temp_low': round(data['daily']['temperature_2m_min'][i]),
                'humidity': round(data['daily'].get('relative_humidity_2m_mean', [50] * 7)[i]),
                'wind_speed': round(data['daily']['wind_speed_10m_max'][i]),
                'description': description,
                'icon': icon,
            })

        hourly = []
        now_hour = datetime.now().hour
        for i in range(now_hour, min(now_hour + 24, len(data['hourly']['time']))):
            wmo_code = data['hourly']['weather_code'][i]
            icon, _ = wmo_to_icon(wmo_code, i % 24)
            hourly.append({
                'hour': data['hourly']['time'][i].split('T')[1],
                'temp': round(data['hourly']['temperature_2m'][i]),
                'icon': icon,
                'description': '',
            })

        return {'daily': daily, 'hourly': hourly[:24]}
    except Exception as e:
        print(f"Open-Meteo forecast error: {e}")
        return None


def wmo_to_icon(code, hour=12):
    """Convert WMO weather code to icon code and description."""
    is_day = 6 <= hour <= 19
    suffix = 'd' if is_day else 'n'

    mapping = {
        0: (f'01{suffix}', 'Clear sky'),
        1: (f'01{suffix}', 'Mainly clear'),
        2: (f'02{suffix}', 'Partly cloudy'),
        3: (f'04{suffix}', 'Overcast'),
        45: (f'50{suffix}', 'Fog'),
        48: (f'50{suffix}', 'Depositing rime fog'),
        51: (f'09{suffix}', 'Light drizzle'),
        53: (f'09{suffix}', 'Moderate drizzle'),
        55: (f'09{suffix}', 'Dense drizzle'),
        61: (f'10{suffix}', 'Slight rain'),
        63: (f'10{suffix}', 'Moderate rain'),
        65: (f'10{suffix}', 'Heavy rain'),
        71: (f'13{suffix}', 'Slight snow'),
        73: (f'13{suffix}', 'Moderate snow'),
        75: (f'13{suffix}', 'Heavy snow'),
        80: (f'09{suffix}', 'Rain showers'),
        81: (f'09{suffix}', 'Moderate rain showers'),
        82: (f'09{suffix}', 'Heavy rain showers'),
        85: (f'13{suffix}', 'Snow showers'),
        86: (f'13{suffix}', 'Heavy snow showers'),
        95: (f'11{suffix}', 'Thunderstorm'),
        96: (f'11{suffix}', 'Thunderstorm with hail'),
        99: (f'11{suffix}', 'Thunderstorm with heavy hail'),
    }
    return mapping.get(code, (f'02{suffix}', 'Partly cloudy'))


# ==================== API ROUTES ====================

@app.route('/api/weather')
def get_weather():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    if lat is None or lon is None:
        return jsonify({'error': 'lat and lon are required'}), 400

    cache_key = get_cache_key(lat, lon)

    # Check cache
    if cache_key in weather_cache and is_cache_valid(weather_cache[cache_key]):
        return jsonify(weather_cache[cache_key]['data'])

    # Try Open-Meteo first (free, no key needed)
    data = scrape_open_meteo(lat, lon)

    # Fallback to OpenWeatherMap
    if not data:
        data = fetch_from_openweathermap(lat, lon)

    if data:
        weather_cache[cache_key] = {'data': data, 'timestamp': time.time()}
        return jsonify(data)

    return jsonify({'error': 'Could not fetch weather data'}), 500


@app.route('/api/forecast')
def get_forecast():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    if lat is None or lon is None:
        return jsonify({'error': 'lat and lon are required'}), 400

    cache_key = get_cache_key(lat, lon)

    # Check cache
    if cache_key in forecast_cache and is_cache_valid(forecast_cache[cache_key]):
        return jsonify(forecast_cache[cache_key]['data'])

    # Try Open-Meteo first (free)
    data = scrape_forecast_open_meteo(lat, lon)

    # Fallback to OpenWeatherMap
    if not data:
        data = fetch_forecast_from_openweathermap(lat, lon)

    if data:
        forecast_cache[cache_key] = {'data': data, 'timestamp': time.time()}
        return jsonify(data)

    return jsonify({'error': 'Could not fetch forecast data'}), 500


@app.route('/api/health')
def health():
    return jsonify({
        'status': 'ok',
        'cache_entries': len(weather_cache),
        'has_api_key': bool(API_KEY),
    })


if __name__ == '__main__':
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'true').lower() == 'true'
    print(f"🌤️  HavaCast Weather Parser running on {host}:{port}")
    print(f"📡 Primary source: Open-Meteo (free, no API key)")
    print(f"📡 Fallback: OpenWeatherMap ({'configured' if API_KEY else 'no API key'})")
    app.run(host=host, port=port, debug=debug)
