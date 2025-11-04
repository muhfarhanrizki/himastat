<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\StrukturDewan;
use App\Models\Dewan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class StrukturDewanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil data struktur dewan pertama (karena hanya ada 1 struktur)
        $strukturdewan = StrukturDewan::first();
        
        // Ambil semua data dewan/anggota
        $dewans = Dewan::all();
        
        return Inertia::render('Admin/StrukturDewan/Index', [
            'strukturdewan' => $strukturdewan,
            'dewans' => $dewans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/StrukturDewan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'strukturdewan' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'nullable|string',
        ]);

        try {
            if ($request->hasFile('strukturdewan')) {
                $validated['strukturdewan'] = $request->file('strukturdewan')->store('strukturdewan/images', 'public');
            }

            StrukturDewan::create($validated);

            return redirect()
                ->route('admin.strukturdewan.index')
                ->with('success', 'Struktur Dewan berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menyimpan: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(StrukturDewan $strukturdewan)
    {
        return Inertia::render('Admin/StrukturDewan/Show', [
            'strukturdewan' => $strukturdewan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StrukturDewan $strukturdewan)
    {
        return Inertia::render('Admin/StrukturDewan/Edit', [
            'strukturdewan' => $strukturdewan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StrukturDewan $strukturdewan)
    {
        $validated = $request->validate([
            'strukturdewan' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'nullable|string',
        ]);
        
        try {
            if ($request->hasFile('strukturdewan')) {
                // Hapus gambar lama jika ada
                if ($strukturdewan->strukturdewan && Storage::disk('public')->exists($strukturdewan->strukturdewan)) {
                    Storage::disk('public')->delete($strukturdewan->strukturdewan);
                }
                $validated['strukturdewan'] = $request->file('strukturdewan')->store('strukturdewan/images', 'public');
            } else {
                // Jangan update field strukturdewan jika tidak ada file baru
                unset($validated['strukturdewan']);
            }

            $strukturdewan->update($validated);

            return redirect()
                ->route('admin.strukturdewan.index')
                ->with('success', 'Struktur Dewan berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menyimpan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StrukturDewan $strukturdewan)
    {
        try {
            // Hapus gambar jika ada
            if ($strukturdewan->strukturdewan && Storage::disk('public')->exists($strukturdewan->strukturdewan)) {
                Storage::disk('public')->delete($strukturdewan->strukturdewan);   
            }

            $strukturdewan->delete();

            return redirect()
                ->route('admin.strukturdewan.index')
                ->with('success', 'Struktur berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menghapus: ' . $e->getMessage());
        }
    }
}