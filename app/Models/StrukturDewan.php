<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrukturDewan extends Model
{
    protected $table = 'strukturdewans';

    protected $fillable = [
        'strukturdewan',
        'deskripsi',
    ]; 
    
}
