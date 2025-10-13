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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('divisi', DivisiController::class);
    Route::resource('alumniPath', AlumniPathController::class);
    Route::resource('galeri', GaleriController::class);
    Route::resource('sambutan', SambutanController::class);
    Route::resource('visimisi', VisiMisiController::class);
    Route::resource('proker', ProkerController::class);
});

require __DIR__.'/auth.php';
