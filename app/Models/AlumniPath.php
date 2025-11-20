<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlumniPath extends Model
{
    protected $table = 'alumni_paths';
     
    protected $fillable = [
        'nama',
        'angkatan',
        'kontak',
        'pesan',
        'image',
        'tanggal',
    ];
}
