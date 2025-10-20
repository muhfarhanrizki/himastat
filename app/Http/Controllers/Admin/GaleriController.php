<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Galeri;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class GaleriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $galeris = Galeri::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Admin/Galeri/Index', [
            'galeris' => $galeris,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Galeri/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'required|string|max:255',
            'tanggal' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('galeri', 'public');
        }

        Galeri::create($validated);

        return redirect()->route('galeri.index')->with('success', 'Galeri berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Galeri $galeri)
    {
        return Inertia::render('Admin/Galeri/Show', [
            'galeri' => $galeri
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Galeri $galeri)
    {
        return Inertia::render('Admin/Galeri/Edit', [
            'galeri' => $galeri
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Galeri $galeri)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'required|string|',
            'tanggal' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            if ($galeri->image && Storage::disk('public')->exists($galeri->image)) {
                Storage::disk('public')->delete($galeri->image);
            }

            $validated['image'] = $request->file('image')->store('galeri', 'public');
        } else {
            unset($validated['image']);
        }

        $galeri->update($validated);

        return redirect()->route('galeri.index')->with('success', 'Galeri berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Galeri $galeri)
    {
        if ($galeri->image && Storage::disk('public')->exists($galeri->image)) {
            Storage::disk('public')->delete($galeri->image);
        }

        $galeri->delete();

        return redirect()->route('galeri.index')->with('success', 'Galeri berhasil dihapus');
    }
}
