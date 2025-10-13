<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengurusInti extends Model
{
    protected $table = 'pengurus_intis';

    protected $fillable = [
        'nama',
        'jabatan',
        'image',
        'deskripsi',
    ];
}
