<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->index();
            $table->string('name_en');
            $table->string('name_ru');
            $table->string('name_kk');
            $table->string('name_az');
            $table->foreignId('country_id')->constrained()->cascadeOnDelete();
            $table->decimal('latitude', 10, 6);
            $table->decimal('longitude', 10, 6);
            $table->integer('population')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_popular')->default(false);
            $table->text('seo_description_en')->nullable();
            $table->text('seo_description_ru')->nullable();
            $table->text('seo_description_kk')->nullable();
            $table->text('seo_description_az')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
