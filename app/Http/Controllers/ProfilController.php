<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Divisi;
use App\Models\Struktur;
use App\Models\VisiMisi;
use App\Models\AlumniPath;
use App\Models\PengurusInti;
use App\Models\Dewan;
use App\Models\BaganStruktur;
use Illuminate\Http\Request;

class ProfilController extends Controller
{
    public function profilOrganisasi(){
        $visimisi = VisiMisi::all();

        return Inertia::render('Frontend/Profil/ProfilOrganisasi', [
            'visimisi' => $visimisi
        ]);
    }

    public function sejarah(){
        return Inertia::render('Frontend/Profil/Sejarah');
    }

    public function jejakAlumni(){
        $AlumniPath = AlumniPath::orderBy('nama', 'desc')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return Inertia::render('Frontend/Profil/JejakAlumni', [
            'AlumniPath' => $AlumniPath
        ]);
    }

    public function strukturOrganisasi()
    {
        return Inertia::render('Frontend/Profil/StrukturOrganisasi');
    }

    // Halaman Badan Eksekutif (isi dari struktur organisasi lama)
    public function badanEksekutif()
    {
        $struktur = Struktur::all();
        $divisi = Divisi::all();
        $pengurusInti = PengurusInti::all();
        
        return Inertia::render('Frontend/Profil/BadanEksekutif', [
            'struktur' => $struktur,
            'divisi' => $divisi,
            'pengurusInti' => $pengurusInti,
        ]);
    }

    // Halaman Bagan Struktur
    public function baganStruktur()
    {
        $bagan = BaganStruktur::first();
        
        return Inertia::render('Frontend/Profil/BaganStruktur', [
            'bagan' => $bagan,
        ]);
    }

    // Halaman Dewan
    public function dewan()
    {
        $dewan = Dewan::all();
        
        return Inertia::render('Frontend/Profil/Dewan', [
            'dewan' => $dewan,
        ]);
    }

    public function pengurusInti()
    {
        $pengurusInti = PengurusInti::all();
        return Inertia::render('Frontend/Profil/PengurusInti', [
            'pengurusInti' => $pengurusInti
        ]);
    }
}
