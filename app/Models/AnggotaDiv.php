<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class AnggotaDiv extends Model
{
    use HasSlug;
    protected $table = 'anggota_divs';

    protected $fillable = [
        'name',
        'slug',
        'divisi_id',
        'kontak',
        'angkatan',
        'jabatan',
    ];

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }
}