<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CountryResource\Pages;
use App\Models\Country;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class CountryResource extends Resource
{
    protected static ?string $model = Country::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Components\Section::make('Country Details')->schema([
                Components\TextInput::make('code')
                    ->required()
                    ->maxLength(2)
                    ->unique(ignoreRecord: true),
                Components\TextInput::make('name_en')
                    ->label('Name (English)')
                    ->required(),
                Components\TextInput::make('name_ru')
                    ->label('Name (Russian)')
                    ->required(),
                Components\TextInput::make('name_kk')
                    ->label('Name (Kazakh)')
                    ->required(),
                Components\TextInput::make('name_az')
                    ->label('Name (Azerbaijani)')
                    ->required(),
                Components\Toggle::make('is_active')
                    ->default(true),
                Components\TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('code')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('name_en')->label('Name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('name_ru')->label('Русский'),
                Tables\Columns\TextColumn::make('cities_count')->counts('cities')->label('Cities'),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
                Tables\Columns\TextColumn::make('sort_order')->sortable(),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active'),
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
            'index' => Pages\ListCountries::route('/'),
            'create' => Pages\CreateCountry::route('/create'),
            'edit' => Pages\EditCountry::route('/{record}/edit'),
        ];
    }
}
