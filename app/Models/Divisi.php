<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    use HasSlug;
    protected $table = 'divisis';

    protected $fillable = [
        'name',
        'deskripsi',
        'anggota',
        'image',
    ];

    public function proker()
    {
        return $this->hasMany(Proker::class);
    }

    public function anggota()
    {
        return $this->hasMany(AnggotaDiv::class);
    }
}

