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
use App\Models\Artikel;
use App\Models\Berita;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function beranda(){
        $visimisi = VisiMisi::all();
        $sambutan = Sambutan::all();
        $divisi = Divisi::all();
        $jumbotron = Jumbotron::all();
        $alumniPath = AlumniPath::all();
        $artikel = Artikel::latest()->take(3)->get();
        $berita = Berita::latest()->take(3)->get();

        return Inertia::render('Beranda', [
            'visimisi' => $visimisi,
            'sambutan' => $sambutan,
            'divisi' => $divisi,
            'jumbotron' => $jumbotron,
            'alumniPath' => $alumniPath,
            'artikel' => $artikel,
            'berita' => $berita,
        ]);
    }
    
    public function galeris()
    {
        $galeri = Galeri::orderBy('position', 'asc')
                        ->get();

        return Inertia::render('Frontend/Galeri',[
            'galeri' => $galeri
        ]);
    }

    public function kontak(){
        return Inertia::render('Frontend/Kontak');
    }

    public function artikel()
    {
        $artikel = Artikel::orderBy('tanggal', 'desc')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return Inertia::render('Frontend/Artikel', [
            'artikel' => $artikel
        ]);
    }

    public function artikelShow(Artikel $artikel)
    {
        return Inertia::render('Frontend/ArtikelDetail', [
            'artikel' => $artikel,
            'recommendedArticles' => Artikel::where('id', '!=', $artikel->id)
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }

    public function berita()
    {
        $berita = Berita::orderBy('tanggal', 'desc')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return Inertia::render('Frontend/Berita', [
            'berita' => $berita
        ]);
    }

    public function beritaShow(Berita $berita)
    {
        return Inertia::render('Frontend/BeritaDetail', [
            'berita' => $berita,
            'recommendedNews' => Berita::where('id', '!=', $berita->id)
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
