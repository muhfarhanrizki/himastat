<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Struktur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class StrukturController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $structurs = Struktur::all();

        return Inertia::render('Admin/Struktur/Index', [
            'structurs' => $structurs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Struktur/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'struktur' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'deskripsi' => 'nullable|string|max:255',
        ]);

        try {
            if ($request->hasFile('thumbnail')) {
                $validated['thumbnail'] = $request->file('thumbnail')->store('strukturs/thumbnails', 'public');
            }

            if ($request->hasFile('struktur')) {
                $validated['struktur'] = $request->file('struktur')->store('strukturs/images', 'public');
            }

            Struktur::create($validated);

            return redirect()
                ->route('struktur.index')
                ->with('success', 'Struktur berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menyimpan: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Struktur $struktur)
    {
        return Inertia::render('Admin/Struktur/Show', [
            'struktur' => $struktur
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Struktur $struktur)
    {
        return Inertia::render('Admin/Struktur/Edit', [
            'struktur' => $struktur
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Struktur $struktur)
    {
        $validated = $request->validate([
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'struktur' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'nullable|string',
        ]);
        
        try {
            if ($request->hasFile('thumbnail')) {
                if ($struktur->thumbnail && Storage::disk('public')->exists($struktur->thumbnail)) {
                    Storage::disk('public')->delete($struktur->thumbnail);
                }
                $validated['thumbnail'] = $request->file('thumbnail')->store('strukturs/thumbnails', 'public');
            } else {
                unset($validated['thumbnail']);
            }

            if ($request->hasFile('struktur')) {
                if ($struktur->struktur && Storage::disk('public')->exists($struktur->struktur)) {
                    Storage::disk('public')->delete($struktur->struktur);
                }
                $validated['struktur'] = $request->file('struktur')->store('strukturs/images', 'public');
            } else {
                unset($validated['struktur']);
            }

            $struktur->update($validated);

            return redirect()
                ->route('struktur.index')
                ->with('success', 'Struktur berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menyimpan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Struktur $struktur)
    {
        if ($struktur->thumbnail && Storage::disk('public')->exists($struktur->thumbnail)) {
            Storage::disk('public')->delete($struktur->thumbnail);
        }

        if ($struktur->struktur && Storage::disk('public')->exists($struktur->struktur)) {
            Storage::disk('public')->delete($struktur->struktur);   
        }

        $struktur->delete();

        return redirect()->route('struktur.index')->with('success', 'Struktur berhasil dihapus');
    }
}
