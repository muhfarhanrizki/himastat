<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    public static function bootHasSlug()
    {
        static::creating(function ($model) {
            $model->slug = static::generateUniqueSlug($model->nama);
        });

        static::updating(function ($model) {
            if ($model->isDirty('nama')) {
                $model->slug = static::generateUniqueSlug($model->nama, $model->id);
            }
        });
    }

    protected static function generateUniqueSlug($nama, $ignoreId = null)
    {
        $slug = Str::slug($nama);
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
