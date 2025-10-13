<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Divisi;
use Illuminate\Http\Request;

class DivisiController extends Controller
{
    public function show(Divisi $divisi){
        $divisi = Divisi::with('proker')->get();
        return Inertia::render('Divisi/Show', [
            'divisi' => $divisi
        ]);
    }
}
