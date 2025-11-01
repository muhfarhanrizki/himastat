<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BaganStruktur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BaganStrukturController extends Controller
{
    public function index()
    {
        $bagan = BaganStruktur::all();
        return Inertia::render('Admin/BaganStruktur/Index', [
            'bagan' => $bagan
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/BaganStruktur/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('bagan-struktur', 'public');
        }

        BaganStruktur::create($validated);

        return redirect()->route('admin.baganStruktur.index')
            ->with('success', 'Bagan struktur berhasil ditambahkan');
    }

    public function edit(BaganStruktur $baganStruktur)
    {
        return Inertia::render('Admin/BaganStruktur/Edit', [
            'bagan' => $baganStruktur
        ]);
    }

    public function update(Request $request, BaganStruktur $baganStruktur)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($baganStruktur->image) {
                Storage::disk('public')->delete($baganStruktur->image);
            }
            $validated['image'] = $request->file('image')->store('bagan-struktur', 'public');
        }

        $baganStruktur->update($validated);

        return redirect()->route('admin.baganStruktur.index')
            ->with('success', 'Bagan struktur berhasil diperbarui');
    }

    public function destroy(BaganStruktur $baganStruktur)
    {
        if ($baganStruktur->image) {
            Storage::disk('public')->delete($baganStruktur->image);
        }

        $baganStruktur->delete();

        return redirect()->route('admin.baganStruktur.index')
            ->with('success', 'Bagan struktur berhasil dihapus');
    }
}