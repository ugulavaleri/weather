<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class City extends Model
{
    protected $fillable = [
        'slug',
        'name_en',
        'name_ru',
        'name_kk',
        'name_az',
        'country_id',
        'latitude',
        'longitude',
        'population',
        'is_active',
        'is_popular',
        'seo_description_en',
        'seo_description_ru',
        'seo_description_kk',
        'seo_description_az',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_popular' => 'boolean',
        'latitude' => 'decimal:6',
        'longitude' => 'decimal:6',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function getNameAttribute(): string
    {
        $locale = app()->getLocale();
        return $this->{"name_{$locale}"} ?? $this->name_en;
    }
}
