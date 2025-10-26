<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Divisi;
use Illuminate\Http\Request;

class DivisiController extends Controller
{
    public function show($slug){
        $divisi = Divisi::where('slug', $slug)
            ->with(['proker', 'anggota'])
            ->firstOrFail();
        return Inertia::render('Divisi/Show', [
            'divisi' => $divisi
        ]);
    }
}
