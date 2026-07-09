<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    protected $table = 'artikel_edukasis';

    protected $fillable = [
        'judul',
        'gambar',
        'penulis',
        'tanggal',
        'konten',
    ];
}
