<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Proker extends Model
{
    use HasSlug;
    protected $table = 'prokers';

    protected $fillable = [
        'nama',
        'deskripsi',
        'image',
        'divisi_id',
    ];

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }
}
