<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CityResource\Pages;
use App\Models\City;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class CityResource extends Resource
{
    protected static ?string $model = City::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Components\Section::make('Basic Info')->schema([
                Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('URL-friendly name, e.g. "almaty"'),
                Components\Select::make('country_id')
                    ->relationship('country', 'name_en')
                    ->required()
                    ->searchable()
                    ->preload(),
                Components\TextInput::make('population')
                    ->numeric()
                    ->default(0),
                Components\Toggle::make('is_active')->default(true),
                Components\Toggle::make('is_popular')->default(false),
            ])->columns(2),

            Components\Section::make('Names (Translations)')->schema([
                Components\TextInput::make('name_en')->label('English')->required(),
                Components\TextInput::make('name_ru')->label('Russian')->required(),
                Components\TextInput::make('name_kk')->label('Kazakh')->required(),
                Components\TextInput::make('name_az')->label('Azerbaijani')->required(),
            ])->columns(2),

            Components\Section::make('Location')->schema([
                Components\TextInput::make('latitude')
                    ->numeric()
                    ->required()
                    ->step(0.000001),
                Components\TextInput::make('longitude')
                    ->numeric()
                    ->required()
                    ->step(0.000001),
            ])->columns(2),

            Components\Section::make('SEO Descriptions')->schema([
                Components\Textarea::make('seo_description_en')->label('English SEO')->rows(2),
                Components\Textarea::make('seo_description_ru')->label('Russian SEO')->rows(2),
                Components\Textarea::make('seo_description_kk')->label('Kazakh SEO')->rows(2),
                Components\Textarea::make('seo_description_az')->label('Azerbaijani SEO')->rows(2),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('slug')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('name_en')->label('Name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('name_ru')->label('Русский')->searchable(),
                Tables\Columns\TextColumn::make('country.name_en')->label('Country')->sortable(),
                Tables\Columns\TextColumn::make('population')->numeric()->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
                Tables\Columns\IconColumn::make('is_popular')->boolean(),
            ])
            ->defaultSort('population', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('country_id')
                    ->relationship('country', 'name_en')
                    ->label('Country'),
                Tables\Filters\TernaryFilter::make('is_active'),
                Tables\Filters\TernaryFilter::make('is_popular'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCities::route('/'),
            'create' => Pages\CreateCity::route('/create'),
            'edit' => Pages\EditCity::route('/{record}/edit'),
        ];
    }
}
