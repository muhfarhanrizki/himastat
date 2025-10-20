<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\PengurusInti;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class PengurusIntiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengurusintis = PengurusInti::all();

        return Inertia::render('Admin/PengurusInti/Index', [
            'pengurusintis' => $pengurusintis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PengurusInti/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('pengurusinti', 'public');
        }

        PengurusInti::create($validated);

        return redirect()->route('pengurusinti.index')->with('success', 'Pengurus Inti berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(PengurusInti $pengurusInti)
    {
        return Inertia::render('Admin/PengurusInti/Show', [
            'pengurusInti' => $pengurusInti
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PengurusInti $pengurusInti)
    {
        return Inertia::render('Admin/PengurusInti/Show', [
            'pengurusInti' => $pengurusInti
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PengurusInti $pengurusInti)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            if ($pengurusInti->image && Storage::disk('public')->exists($pengurusInti->image)) {
                Storage::disk('public')->delete($pengurusInti->image);
            }

            $validated['image'] = $request->file('image')->store('pengurusinti', 'public');
        } else {
            unset($validated['image']);
        }

        $pengurusInti->update($validated);

        return redirect()->route('pengurusinti.index')->with('success', 'Pengurus Inti berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PengurusInti $pengurusInti)
    {
        if ($pengurusInti->image && Storage::disk('public')->exists($pengurusInti->image)) {
            Storage::disk('public')->delete($pengurusInti->image);
        }

        $pengurusInti->delete();

        return redirect()->route('pengurusinti.index')->with('success', 'Pengurus Inti berhasil dihapus');
    }
}
