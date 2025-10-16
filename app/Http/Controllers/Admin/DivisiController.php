<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Divisi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DivisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $divisis = Divisi::with('proker')->get();

        return Inertia::render('Admin/Divisi/Index', [
            'divisis' => $divisis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Divisi/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'anggota' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('divisi', 'public');
        }

        Divisi::create($validated);

        return redirect()->route('divisi.index')->with('success', 'Divisi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Divisi $divisi)
    {
        return Inertia::render('Admin/Divisi/Show', [
            'divisi' => $divisi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Divisi $divisi)
    {
        return Inertia::render('Admin/Divisi/Edit', [
            'divisi' => $divisi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Divisi $divisi)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'anggota' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($divisi->image && Storage::disk('public')->exists($divisi->image)) {
                Storage::disk('public')->delete($divisi->image);
            }
            
            $validated['image'] = $request->file('image')->store('divisi', 'public');
        } else {
            unset($validated['image']);
        }

        $divisi->update($validated);

        return redirect()->route('divisi.index')->with('success', 'Divisi berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Divisi $divisi)
    {
        $divisi->delete();

        if ($divisi->image && Storage::disk('public')->exists($divisi->image)) {
            Storage::disk('public')->delete($divisi->image);
        }

        return redirect()->route('divisi.index')->with('success', 'Divisi berhasil dihapus');
    }
}
