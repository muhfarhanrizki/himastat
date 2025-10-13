<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jumbotron extends Model
{
    protected $table = 'jumbotron';

    protected $fillable = [
        'image',
        'title',
        'description'
    ];
}
