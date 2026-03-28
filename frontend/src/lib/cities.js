import { getCountryCode } from './countryConfig';

export const allCities = [
  // Kazakhstan
  { slug: 'almaty', names: { en: 'Almaty', ru: 'Алматы', kk: 'Алматы', az: 'Almatı' }, country: 'KZ', lat: 43.2551, lon: 76.9126, population: 2000000 },
  { slug: 'astana', names: { en: 'Astana', ru: 'Астана', kk: 'Астана', az: 'Astana' }, country: 'KZ', lat: 51.1694, lon: 71.4491, population: 1200000 },
  { slug: 'shymkent', names: { en: 'Shymkent', ru: 'Шымкент', kk: 'Шымкент', az: 'Şımkent' }, country: 'KZ', lat: 42.3417, lon: 69.5901, population: 1050000 },
  { slug: 'karaganda', names: { en: 'Karaganda', ru: 'Караганда', kk: 'Қарағанды', az: 'Karaqanda' }, country: 'KZ', lat: 49.8047, lon: 73.1094, population: 500000 },
  { slug: 'aktobe', names: { en: 'Aktobe', ru: 'Актобе', kk: 'Ақтөбе', az: 'Aktöbe' }, country: 'KZ', lat: 50.2839, lon: 57.167, population: 400000 },
  { slug: 'taraz', names: { en: 'Taraz', ru: 'Тараз', kk: 'Тараз', az: 'Taraz' }, country: 'KZ', lat: 42.9, lon: 71.3667, population: 360000 },
  { slug: 'pavlodar', names: { en: 'Pavlodar', ru: 'Павлодар', kk: 'Павлодар', az: 'Pavlodar' }, country: 'KZ', lat: 52.2873, lon: 76.9674, population: 350000 },
  { slug: 'ust-kamenogorsk', names: { en: 'Ust-Kamenogorsk', ru: 'Усть-Каменогорск', kk: 'Өскемен', az: 'Ust-Kamenoqorsk' }, country: 'KZ', lat: 49.9718, lon: 82.6059, population: 330000 },
  { slug: 'semey', names: { en: 'Semey', ru: 'Семей', kk: 'Семей', az: 'Semey' }, country: 'KZ', lat: 50.4111, lon: 80.2275, population: 320000 },
  { slug: 'atyrau', names: { en: 'Atyrau', ru: 'Атырау', kk: 'Атырау', az: 'Atırau' }, country: 'KZ', lat: 47.1167, lon: 51.8833, population: 270000 },
  { slug: 'kostanay', names: { en: 'Kostanay', ru: 'Костанай', kk: 'Қостанай', az: 'Kostanay' }, country: 'KZ', lat: 53.2144, lon: 63.6246, population: 240000 },
  { slug: 'petropavlovsk', names: { en: 'Petropavlovsk', ru: 'Петропавловск', kk: 'Петропавл', az: 'Petropavlovsk' }, country: 'KZ', lat: 54.8753, lon: 69.1627, population: 220000 },
  { slug: 'oral', names: { en: 'Oral', ru: 'Уральск', kk: 'Орал', az: 'Oral' }, country: 'KZ', lat: 51.2333, lon: 51.3667, population: 235000 },
  { slug: 'aktau', names: { en: 'Aktau', ru: 'Актау', kk: 'Ақтау', az: 'Aktau' }, country: 'KZ', lat: 43.65, lon: 51.15, population: 190000 },
  { slug: 'kyzylorda', names: { en: 'Kyzylorda', ru: 'Кызылорда', kk: 'Қызылорда', az: 'Kızılorda' }, country: 'KZ', lat: 44.8479, lon: 65.5093, population: 270000 },
  { slug: 'turkestan', names: { en: 'Turkestan', ru: 'Туркестан', kk: 'Түркістан', az: 'Türküstan' }, country: 'KZ', lat: 43.3017, lon: 68.2525, population: 170000 },
  { slug: 'taldykorgan', names: { en: 'Taldykorgan', ru: 'Талдыкорган', kk: 'Талдықорған', az: 'Taldıkorqan' }, country: 'KZ', lat: 45.0, lon: 78.3833, population: 145000 },
  { slug: 'ekibastuz', names: { en: 'Ekibastuz', ru: 'Экибастуз', kk: 'Екібастұз', az: 'Ekibastuz' }, country: 'KZ', lat: 51.7231, lon: 75.3239, population: 135000 },
  { slug: 'rudny', names: { en: 'Rudny', ru: 'Рудный', kk: 'Рудный', az: 'Rudnı' }, country: 'KZ', lat: 52.95, lon: 63.1167, population: 125000 },
  { slug: 'temirtau', names: { en: 'Temirtau', ru: 'Темиртау', kk: 'Теміртау', az: 'Temirtau' }, country: 'KZ', lat: 50.0547, lon: 72.9647, population: 180000 },
  { slug: 'kokshetau', names: { en: 'Kokshetau', ru: 'Кокшетау', kk: 'Көкшетау', az: 'Kökşetau' }, country: 'KZ', lat: 53.2833, lon: 69.4, population: 150000 },

  // Azerbaijan
  { slug: 'baku', names: { en: 'Baku', ru: 'Баку', kk: 'Баку', az: 'Bakı' }, country: 'AZ', lat: 40.4093, lon: 49.8671, population: 2300000 },
  { slug: 'ganja', names: { en: 'Ganja', ru: 'Гянджа', kk: 'Гянджа', az: 'Gəncə' }, country: 'AZ', lat: 40.6828, lon: 46.3606, population: 335000 },
  { slug: 'sumgait', names: { en: 'Sumgait', ru: 'Сумгаит', kk: 'Сумгаит', az: 'Sumqayıt' }, country: 'AZ', lat: 40.5897, lon: 49.6686, population: 340000 },
  { slug: 'mingachevir', names: { en: 'Mingachevir', ru: 'Мингечевир', kk: 'Мингечевир', az: 'Mingəçevir' }, country: 'AZ', lat: 40.7703, lon: 47.0489, population: 100000 },
  { slug: 'lankaran', names: { en: 'Lankaran', ru: 'Ленкорань', kk: 'Ленкорань', az: 'Lənkəran' }, country: 'AZ', lat: 38.7536, lon: 48.8511, population: 85000 },
  { slug: 'shirvan', names: { en: 'Shirvan', ru: 'Ширван', kk: 'Ширван', az: 'Şirvan' }, country: 'AZ', lat: 39.9381, lon: 48.9206, population: 80000 },
  { slug: 'nakhchivan', names: { en: 'Nakhchivan', ru: 'Нахичевань', kk: 'Нахичевань', az: 'Naxçıvan' }, country: 'AZ', lat: 39.2089, lon: 45.4122, population: 90000 },
  { slug: 'sheki', names: { en: 'Sheki', ru: 'Шеки', kk: 'Шеки', az: 'Şəki' }, country: 'AZ', lat: 41.1919, lon: 47.1706, population: 65000 },
  { slug: 'yevlakh', names: { en: 'Yevlakh', ru: 'Евлах', kk: 'Евлах', az: 'Yevlax' }, country: 'AZ', lat: 40.6186, lon: 47.15, population: 60000 },
  { slug: 'gabala', names: { en: 'Gabala', ru: 'Габала', kk: 'Габала', az: 'Qəbələ' }, country: 'AZ', lat: 40.9814, lon: 47.8458, population: 50000 },

  // Uzbekistan
  { slug: 'tashkent', names: { en: 'Tashkent', ru: 'Ташкент', kk: 'Ташкент', az: 'Daşkənd' }, country: 'UZ', lat: 41.2995, lon: 69.2401, population: 2500000 },
  { slug: 'samarkand', names: { en: 'Samarkand', ru: 'Самарканд', kk: 'Самарқанд', az: 'Səmərqənd' }, country: 'UZ', lat: 39.6542, lon: 66.9597, population: 530000 },
  { slug: 'bukhara', names: { en: 'Bukhara', ru: 'Бухара', kk: 'Бұхара', az: 'Buxara' }, country: 'UZ', lat: 39.7681, lon: 64.4556, population: 280000 },
  { slug: 'namangan', names: { en: 'Namangan', ru: 'Наманган', kk: 'Наманган', az: 'Namangan' }, country: 'UZ', lat: 41.0011, lon: 71.6722, population: 500000 },
  { slug: 'nukus', names: { en: 'Nukus', ru: 'Нукус', kk: 'Нөкіс', az: 'Nukus' }, country: 'UZ', lat: 42.4628, lon: 59.6036, population: 310000 },

  // Turkmenistan
  { slug: 'ashgabat', names: { en: 'Ashgabat', ru: 'Ашхабад', kk: 'Ашғабат', az: 'Aşqabad' }, country: 'TM', lat: 37.9601, lon: 58.3261, population: 1000000 },
  { slug: 'turkmenabat', names: { en: 'Turkmenabat', ru: 'Туркменабад', kk: 'Түркменабат', az: 'Türkmənabad' }, country: 'TM', lat: 39.0734, lon: 63.5786, population: 250000 },

  // Kyrgyzstan
  { slug: 'bishkek', names: { en: 'Bishkek', ru: 'Бишкек', kk: 'Бішкек', az: 'Bişkek' }, country: 'KG', lat: 42.8746, lon: 74.5698, population: 1060000 },
  { slug: 'osh', names: { en: 'Osh', ru: 'Ош', kk: 'Ош', az: 'Oş' }, country: 'KG', lat: 40.5283, lon: 72.7985, population: 300000 },

  // Tajikistan
  { slug: 'dushanbe', names: { en: 'Dushanbe', ru: 'Душанбе', kk: 'Душанбе', az: 'Düşənbə' }, country: 'TJ', lat: 38.5598, lon: 68.7738, population: 850000 },
  { slug: 'khujand', names: { en: 'Khujand', ru: 'Худжанд', kk: 'Хұжанд', az: 'Xucənd' }, country: 'TJ', lat: 40.2833, lon: 69.6333, population: 180000 },

  // Turkey
  { slug: 'istanbul', names: { en: 'Istanbul', tr: 'İstanbul', ru: 'Стамбул' }, country: 'TR', lat: 41.0082, lon: 28.9784, population: 15840000 },
  { slug: 'ankara', names: { en: 'Ankara', tr: 'Ankara', ru: 'Анкара' }, country: 'TR', lat: 39.9334, lon: 32.8597, population: 5747000 },
  { slug: 'izmir', names: { en: 'Izmir', tr: 'İzmir', ru: 'Измир' }, country: 'TR', lat: 38.4192, lon: 27.1287, population: 4394000 },
  { slug: 'bursa', names: { en: 'Bursa', tr: 'Bursa', ru: 'Бурса' }, country: 'TR', lat: 40.1885, lon: 29.0610, population: 3101000 },
  { slug: 'antalya', names: { en: 'Antalya', tr: 'Antalya', ru: 'Анталья' }, country: 'TR', lat: 36.8969, lon: 30.7133, population: 2548000 },
  { slug: 'adana', names: { en: 'Adana', tr: 'Adana', ru: 'Адана' }, country: 'TR', lat: 37.0000, lon: 35.3213, population: 2237000 },
  { slug: 'konya', names: { en: 'Konya', tr: 'Konya', ru: 'Конья' }, country: 'TR', lat: 37.8746, lon: 32.4932, population: 2277000 },
  { slug: 'gaziantep', names: { en: 'Gaziantep', tr: 'Gaziantep', ru: 'Газиантеп' }, country: 'TR', lat: 37.0662, lon: 37.3833, population: 2101000 },
  { slug: 'mersin', names: { en: 'Mersin', tr: 'Mersin', ru: 'Мерсин' }, country: 'TR', lat: 36.8121, lon: 34.6415, population: 1868000 },
  { slug: 'diyarbakir', names: { en: 'Diyarbakir', tr: 'Diyarbakır', ru: 'Диярбакыр' }, country: 'TR', lat: 37.9144, lon: 40.2306, population: 1783000 },
  { slug: 'kayseri', names: { en: 'Kayseri', tr: 'Kayseri', ru: 'Кайсери' }, country: 'TR', lat: 38.7312, lon: 35.4787, population: 1421000 },
  { slug: 'eskisehir', names: { en: 'Eskisehir', tr: 'Eskişehir', ru: 'Эскишехир' }, country: 'TR', lat: 39.7767, lon: 30.5206, population: 888000 },
  { slug: 'trabzon', names: { en: 'Trabzon', tr: 'Trabzon', ru: 'Трабзон' }, country: 'TR', lat: 41.0027, lon: 39.7168, population: 808000 },
  { slug: 'samsun', names: { en: 'Samsun', tr: 'Samsun', ru: 'Самсун' }, country: 'TR', lat: 41.2867, lon: 36.33, population: 1348000 },
  { slug: 'denizli', names: { en: 'Denizli', tr: 'Denizli', ru: 'Денизли' }, country: 'TR', lat: 37.7765, lon: 29.0864, population: 1037000 },
  { slug: 'malatya', names: { en: 'Malatya', tr: 'Malatya', ru: 'Малатья' }, country: 'TR', lat: 38.3554, lon: 38.3335, population: 800000 },
  { slug: 'erzurum', names: { en: 'Erzurum', tr: 'Erzurum', ru: 'Эрзурум' }, country: 'TR', lat: 39.9055, lon: 41.2658, population: 762000 },
  { slug: 'van', names: { en: 'Van', tr: 'Van', ru: 'Ван' }, country: 'TR', lat: 38.5012, lon: 43.3730, population: 1136000 },
  { slug: 'bodrum', names: { en: 'Bodrum', tr: 'Bodrum', ru: 'Бодрум' }, country: 'TR', lat: 37.0344, lon: 27.4305, population: 196000 },
  { slug: 'mugla', names: { en: 'Mugla', tr: 'Muğla', ru: 'Мугла' }, country: 'TR', lat: 37.2153, lon: 28.3636, population: 984000 },
];

// Get only cities for the configured country
export const cities = allCities.filter((c) => c.country === getCountryCode());

export function getCityBySlug(slug) {
  return cities.find((c) => c.slug === slug);
}

export function getPopularCities(limit = 12) {
  return [...cities].sort((a, b) => b.population - a.population).slice(0, limit);
}

export function searchCities(query) {
  const q = query.toLowerCase();
  return cities.filter(
    (c) =>
      c.slug.includes(q) ||
      Object.values(c.names).some((name) => name.toLowerCase().includes(q))
  );
}

export function getCapitalCity() {
  const { getCountryConfig } = require('./countryConfig');
  const config = getCountryConfig();
  return cities.find((c) => c.slug === config.capital) || cities[0];
}

export function getAllSlugs() {
  return cities.map((c) => c.slug);
}
