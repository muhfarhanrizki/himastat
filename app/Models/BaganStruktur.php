<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaganStruktur extends Model
{
    use HasFactory;

    protected $table = 'bagan_struktur';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];
}