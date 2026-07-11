<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DivisiController;
use App\Http\Controllers\Admin\GaleriController;
use App\Http\Controllers\Admin\ProkerController;
use App\Http\Controllers\Admin\SambutanController;
use App\Http\Controllers\Admin\VisiMisiController;
use App\Http\Controllers\Admin\AlumniPathController;
use App\Http\Controllers\Admin\AnggotaDivController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\JumbotronController;
use App\Http\Controllers\Admin\PengurusIntiController;
use App\Http\Controllers\Admin\StrukturController;
use App\Http\Controllers\Admin\BaganStrukturController;
use App\Http\Controllers\Admin\DewanController;
use App\Http\Controllers\Admin\StrukturDewanController;
use App\Http\Controllers\Admin\ArtikelController as AdminArtikelController;
use App\Http\Controllers\Admin\BeritaController as AdminBeritaController;
use App\Http\Controllers\DivisiController as ControllersDivisiController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfilController;
use App\Models\PengurusInti;

Route::get("/", [PageController::class, "beranda"])->name("beranda");
Route::get("/galeri-himpunan", [PageController::class, "galeris"])->name(
    "galeris",);
Route::get("/kontak", [PageController::class, "kontak"])->name("kontak");

Route::get("/artikel", [PageController::class, "artikel"])->name("artikel");
Route::get("/artikel/{artikel}", [PageController::class, "artikelShow"])->name("artikel.show");

Route::get("/berita", [PageController::class, "berita"])->name("berita");
Route::get("/berita/{berita}", [PageController::class, "beritaShow"])->name("berita.show");

Route::get("/divisi/{divisi}/", [
    ControllersDivisiController::class,
    "show",
])->name("divisi.show");

Route::get("/profil-organisasi", [
    ProfilController::class,
    "profilOrganisasi",
])->name("profil-organisasi");
Route::get("/sejarah", [ProfilController::class, "sejarah"])->name("sejarah");
Route::get("/achievements", [ProfilController::class, "jejakAlumni"])->name(
    "achievements",
);

// Struktur Organisasi Routes
Route::get("/struktur-organisasi", [
    ProfilController::class,
    "strukturOrganisasi",
])->name("struktur-organisasi");
Route::get("/struktur-organisasi/badan-eksekutif", [
    ProfilController::class,
    "badanEksekutif",
])->name("badan-eksekutif");
Route::get("/struktur-organisasi/bagan-struktur", [
    ProfilController::class,
    "baganStruktur",
])->name("bagan-struktur");
Route::get("/struktur-organisasi/dewan", [
    ProfilController::class,
    "dewan",
])->name("dewan");

Route::get("/pengurus-inti", [ProfilController::class, "pengurusInti"])->name(
    "pengurus-inti",
);

Route::get("/404", function () {
    return Inertia::render("Admin/404");
})->name("404");

Route::prefix("/admin")
    ->name("admin.")
    ->middleware("auth")
    ->group(function () {
        Route::get("/dashboard", [DashboardController::class, "index"])->name(
            "dashboard",
        );
        Route::get("/profile", [ProfileController::class, "edit"])->name(
            "profile.edit",
        );
        Route::patch("/profile", [ProfileController::class, "update"])->name(
            "profile.update",
        );
        Route::delete("/profile", [ProfileController::class, "destroy"])->name(
            "profile.destroy",
        );

        Route::resource("divisi", DivisiController::class);
        Route::resource("alumniPath", AlumniPathController::class);
        Route::post("galeri/reorder", [GaleriController::class, "reorder"])->name("galeri.reorder");
        Route::resource("galeri", GaleriController::class);
        Route::resource("sambutan", SambutanController::class);
        Route::resource("visimisi", VisiMisiController::class);
        Route::resource("proker", ProkerController::class);
        Route::resource("jumbotron", JumbotronController::class);
        Route::resource("struktur", StrukturController::class);
        Route::resource("pengurusInti", PengurusIntiController::class);
        Route::resource("contact", ContactController::class);
        Route::resource("anggotaDiv", AnggotaDivController::class);
        Route::resource("baganStruktur", BaganStrukturController::class);
        Route::resource("dewan", DewanController::class);
        Route::resource("strukturdewan", StrukturDewanController::class);
        Route::resource("artikel", AdminArtikelController::class);
        Route::resource("berita", AdminBeritaController::class)->parameters([
            'berita' => 'berita'
        ]);

    });

require __DIR__ . "/auth.php";
