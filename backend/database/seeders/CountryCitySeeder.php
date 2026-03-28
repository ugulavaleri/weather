<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Seeder;

class CountryCitySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['code' => 'KZ', 'name_en' => 'Kazakhstan', 'name_ru' => 'Казахстан', 'name_kk' => 'Қазақстан', 'name_az' => 'Qazaxıstan', 'sort_order' => 1],
            ['code' => 'AZ', 'name_en' => 'Azerbaijan', 'name_ru' => 'Азербайджан', 'name_kk' => 'Әзірбайжан', 'name_az' => 'Azərbaycan', 'sort_order' => 2],
            ['code' => 'UZ', 'name_en' => 'Uzbekistan', 'name_ru' => 'Узбекистан', 'name_kk' => 'Өзбекстан', 'name_az' => 'Özbəkistan', 'sort_order' => 3],
            ['code' => 'TM', 'name_en' => 'Turkmenistan', 'name_ru' => 'Туркменистан', 'name_kk' => 'Түрікменстан', 'name_az' => 'Türkmənistan', 'sort_order' => 4],
            ['code' => 'KG', 'name_en' => 'Kyrgyzstan', 'name_ru' => 'Кыргызстан', 'name_kk' => 'Қырғызстан', 'name_az' => 'Qırğızıstan', 'sort_order' => 5],
            ['code' => 'TJ', 'name_en' => 'Tajikistan', 'name_ru' => 'Таджикистан', 'name_kk' => 'Тәжікстан', 'name_az' => 'Tacikistan', 'sort_order' => 6],
        ];

        foreach ($countries as $data) {
            Country::updateOrCreate(['code' => $data['code']], $data);
        }

        $cities = [
            ['slug' => 'almaty', 'name_en' => 'Almaty', 'name_ru' => 'Алматы', 'name_kk' => 'Алматы', 'name_az' => 'Almatı', 'country' => 'KZ', 'lat' => 43.2551, 'lon' => 76.9126, 'pop' => 2000000, 'popular' => true],
            ['slug' => 'astana', 'name_en' => 'Astana', 'name_ru' => 'Астана', 'name_kk' => 'Астана', 'name_az' => 'Astana', 'country' => 'KZ', 'lat' => 51.1694, 'lon' => 71.4491, 'pop' => 1200000, 'popular' => true],
            ['slug' => 'shymkent', 'name_en' => 'Shymkent', 'name_ru' => 'Шымкент', 'name_kk' => 'Шымкент', 'name_az' => 'Şımkent', 'country' => 'KZ', 'lat' => 42.3417, 'lon' => 69.5901, 'pop' => 1050000, 'popular' => true],
            ['slug' => 'baku', 'name_en' => 'Baku', 'name_ru' => 'Баку', 'name_kk' => 'Баку', 'name_az' => 'Bakı', 'country' => 'AZ', 'lat' => 40.4093, 'lon' => 49.8671, 'pop' => 2300000, 'popular' => true],
            ['slug' => 'tashkent', 'name_en' => 'Tashkent', 'name_ru' => 'Ташкент', 'name_kk' => 'Ташкент', 'name_az' => 'Daşkənd', 'country' => 'UZ', 'lat' => 41.2995, 'lon' => 69.2401, 'pop' => 2500000, 'popular' => true],
            ['slug' => 'bishkek', 'name_en' => 'Bishkek', 'name_ru' => 'Бишкек', 'name_kk' => 'Бішкек', 'name_az' => 'Bişkek', 'country' => 'KG', 'lat' => 42.8746, 'lon' => 74.5698, 'pop' => 1060000, 'popular' => true],
            ['slug' => 'dushanbe', 'name_en' => 'Dushanbe', 'name_ru' => 'Душанбе', 'name_kk' => 'Душанбе', 'name_az' => 'Düşənbə', 'country' => 'TJ', 'lat' => 38.5598, 'lon' => 68.7738, 'pop' => 850000, 'popular' => true],
            ['slug' => 'ashgabat', 'name_en' => 'Ashgabat', 'name_ru' => 'Ашхабад', 'name_kk' => 'Ашғабат', 'name_az' => 'Aşqabad', 'country' => 'TM', 'lat' => 37.9601, 'lon' => 58.3261, 'pop' => 1000000, 'popular' => true],
            ['slug' => 'karaganda', 'name_en' => 'Karaganda', 'name_ru' => 'Караганда', 'name_kk' => 'Қарағанды', 'name_az' => 'Karaqanda', 'country' => 'KZ', 'lat' => 49.8047, 'lon' => 73.1094, 'pop' => 500000, 'popular' => false],
            ['slug' => 'ganja', 'name_en' => 'Ganja', 'name_ru' => 'Гянджа', 'name_kk' => 'Гянджа', 'name_az' => 'Gəncə', 'country' => 'AZ', 'lat' => 40.6828, 'lon' => 46.3606, 'pop' => 335000, 'popular' => false],
            ['slug' => 'samarkand', 'name_en' => 'Samarkand', 'name_ru' => 'Самарканд', 'name_kk' => 'Самарқанд', 'name_az' => 'Səmərqənd', 'country' => 'UZ', 'lat' => 39.6542, 'lon' => 66.9597, 'pop' => 530000, 'popular' => true],
        ];

        foreach ($cities as $data) {
            $country = Country::where('code', $data['country'])->first();
            City::updateOrCreate(['slug' => $data['slug']], [
                'slug' => $data['slug'],
                'name_en' => $data['name_en'],
                'name_ru' => $data['name_ru'],
                'name_kk' => $data['name_kk'],
                'name_az' => $data['name_az'],
                'country_id' => $country->id,
                'latitude' => $data['lat'],
                'longitude' => $data['lon'],
                'population' => $data['pop'],
                'is_popular' => $data['popular'],
                'is_active' => true,
            ]);
        }
    }
}
