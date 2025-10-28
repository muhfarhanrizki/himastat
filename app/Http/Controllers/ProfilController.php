<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Divisi;
use App\Models\Struktur;
use App\Models\VisiMisi;
use App\Models\AlumniPath;
use App\Models\PengurusInti;
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

    public function strukturOrganisasi(){
        $struktur = Struktur::all();
        $divisi = Divisi::all();
        $pengurusInti = PengurusInti::all();

        return Inertia::render('Frontend/Profil/StrukturOrganisasi', [
            'struktur' => $struktur,
            'divisi' => $divisi,
            'pengurusInti' => $pengurusInti,
        ]);
    }

    public function pengurusInti(){
        $pengurusInti = PengurusInti::all();
        return Inertia::render('Frontend/Profil/PengurusInti',
        [
            'pengurusInti' => $pengurusInti
        ]);
    }
}
