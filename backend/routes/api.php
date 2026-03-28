<?php

use App\Models\City;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/cities', function () {
    return City::with('country')
        ->where('is_active', true)
        ->orderBy('population', 'desc')
        ->get()
        ->map(fn ($city) => [
            'slug' => $city->slug,
            'names' => [
                'en' => $city->name_en,
                'ru' => $city->name_ru,
                'kk' => $city->name_kk,
                'az' => $city->name_az,
            ],
            'country' => $city->country->code,
            'lat' => (float) $city->latitude,
            'lon' => (float) $city->longitude,
            'population' => $city->population,
        ]);
});

Route::get('/countries', function () {
    return Country::where('is_active', true)
        ->withCount('cities')
        ->orderBy('sort_order')
        ->get();
});

Route::get('/cities/{slug}', function (string $slug) {
    $city = City::with('country')->where('slug', $slug)->where('is_active', true)->first();
    if (!$city) {
        return response()->json(['error' => 'City not found'], 404);
    }
    return [
        'slug' => $city->slug,
        'names' => [
            'en' => $city->name_en,
            'ru' => $city->name_ru,
            'kk' => $city->name_kk,
            'az' => $city->name_az,
        ],
        'country' => $city->country->code,
        'lat' => (float) $city->latitude,
        'lon' => (float) $city->longitude,
        'population' => $city->population,
        'seo' => [
            'en' => $city->seo_description_en,
            'ru' => $city->seo_description_ru,
            'kk' => $city->seo_description_kk,
            'az' => $city->seo_description_az,
        ],
    ];
});
