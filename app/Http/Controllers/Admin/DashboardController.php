<?php  
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Galeri;
use App\Models\Divisi;
use App\Models\Proker;
use App\Models\AlumniPath;
use App\Models\Artikel;
use App\Models\Berita;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'galeri' => Galeri::count(),
            'divisi' => Divisi::count(),
            'proker' => Proker::count(),
            'alumniPath' => AlumniPath::count(),
            'artikel' => Artikel::count(),
            'berita' => Berita::count(),
        ];

        $latest = [
            'galeri' => Galeri::latest()->take(6)->get(),
            'proker' => Proker::with('divisi')->latest()->take(3)->get(),
            'alumniPath' => AlumniPath::latest()->take(3)->get(),
            'divisi' => Divisi::withCount(['proker', 'anggota'])->latest()->get(),
            'artikel' => Artikel::latest()->take(5)->get(),
            'berita' => Berita::latest()->take(5)->get(),
        ];

        return Inertia::render('Admin/Dashboard', compact('stats', 'latest'));
    }
}