<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Divisi;
use App\Models\Galeri;
use App\Models\Contact;
use App\Models\Sambutan;
use App\Models\Struktur;
use App\Models\VisiMisi;
use App\Models\Jumbotron;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home(){
        $visimisi = VisiMisi::all();
        $sambutan = Sambutan::all();
        $divisi = Divisi::all();
        $jumbotron = Jumbotron::all();

        return Inertia::render('Page/Home', [
            'visimisi' => $visimisi,
            'sambutan' => $sambutan,
            'divisi' => $divisi,
            'jumbotron' => $jumbotron
        ]);
    }

    public function galeri(){
        $galeri = Galeri::all();

        return Inertia::render('Page/Galeri',[
            'galeri' => $galeri
        ]);
    }

    public function contact(){
        $contact = Contact::all();
        return Inertia::render('Page/Contact',[
            'contact' => $contact
        ]);
    }
}
