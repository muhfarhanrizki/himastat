<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    protected $table = 'divisi';

    protected $fillable = [
        'name',
        'anggota',
        'image',
    ];

    public function proker()
    {
        return $this->hasMany(Proker::class);
    }
}
