<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Sambutan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SambutanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sambutans = Sambutan::all();

        return Inertia::render('Admin/Sambutan/Index', [
            'sambutans' => $sambutans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Sambutan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
           'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
           'nama' => 'required|string|max:255',
           'jabatan' => 'required|string|max:255',
           'sambutan' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('sambutan', 'public');
        }

        Sambutan::create($validated);

        return redirect()->route('sambutan.index')->with('success', 'Sambutan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sambutan $sambutan)
    {
        return Inertia::render('Admin/Sambutan/Show', [
            'sambutan' => $sambutan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sambutan $sambutan)
    {
        return Inertia::render('Admin/Sambutan/Edit', [
            'sambutan' => $sambutan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sambutan $sambutan)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'sambutan' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            if ($sambutan->image && Storage::disk('public')->exists($sambutan->image)) {
                Storage::disk('public')->delete($sambutan->image);
            }

            $validated['image'] = $request->file('image')->store('sambutan', 'public');
        } else {
            unset($validated['image']);
        }

        $sambutan->update($validated);

        return redirect()->route('sambutan.index')->with('success', 'Sambutan berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sambutan $sambutan)
    {
        if ($sambutan->image && Storage::disk('public')->exists($sambutan->image)) {
            Storage::disk('public')->delete($sambutan->image);
        }

        $sambutan->delete();

        return redirect()->route('sambutan.index')->with('success', 'Sambutan berhasil dihapus');
    }
}
