<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Divisi;
use App\Models\Galeri;
use App\Models\Contact;
use App\Models\Sambutan;
use App\Models\AlumniPath;
use App\Models\VisiMisi;
use App\Models\Jumbotron;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function beranda(){
        $visimisi = VisiMisi::all();
        $sambutan = Sambutan::all();
        $divisi = Divisi::all();
        $jumbotron = Jumbotron::all();
        $alumniPath = AlumniPath::all();

        return Inertia::render('Beranda', [
            'visimisi' => $visimisi,
            'sambutan' => $sambutan,
            'divisi' => $divisi,
            'jumbotron' => $jumbotron,
            'alumniPath' => $alumniPath,
        ]);
    }

    public function galeris(){
        // Mengambil semua data galeri, diurutkan berdasarkan tanggal terbaru
        $galeri = Galeri::orderBy('tanggal', 'desc')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return Inertia::render('Frontend/Galeri',[
            'galeri' => $galeri
        ]);
    }

    public function kontak(){
        $contact = Contact::all();
        return Inertia::render('Frontend/Kontak',[
            'contact' => $contact
        ]);
    }
}