<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Struktur extends Model
{
    protected $table = 'strukturs';

    protected $fillable = [
        'struktur',
        'deskripsi',
    ];
    
}
