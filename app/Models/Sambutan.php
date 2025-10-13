<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sambutan extends Model
{
    protected $table = 'sambutans';

    protected $fillable = [
        'image',
        'sambutan'
    ];
}
