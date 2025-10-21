<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    public static function bootHasSlug()
    {
        static::creating(function ($model) {
            // Cek field mana yang ada: 'nama' atau 'name'
            $fieldName = property_exists($model, 'nama') || isset($model->nama) ? 'nama' : 'name';
            $model->slug = static::generateUniqueSlug($model->$fieldName);
        });

        static::updating(function ($model) {
            $fieldName = property_exists($model, 'nama') || isset($model->nama) ? 'nama' : 'name';
            
            if ($model->isDirty($fieldName)) {
                $model->slug = static::generateUniqueSlug($model->$fieldName, $model->id);
            }
        });
    }

    protected static function generateUniqueSlug($value, $ignoreId = null)
    {
        $slug = Str::slug($value);
        $original = $slug;

        $count = 1;
        while (static::where('slug', $slug)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}