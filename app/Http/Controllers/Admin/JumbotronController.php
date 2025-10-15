<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Jumbotron;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class JumbotronController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jumbotrons = Jumbotron::all();

        return Inertia::render('Admin/Jumbotron/Index', [
            'jumbotrons' => $jumbotrons
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Jumbotron/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('jumbotron', 'public');
        }


        Jumbotron::create($validated);

        return redirect()->route('jumbotron.index')->with('success', 'Jumbotron berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jumbotron $jumbotron)
    {
        return Inertia::render('Admin/Jumbotron/Show', [
            'jumbotron' => $jumbotron
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jumbotron $jumbotron)
    {
        return Inertia::render('Admin/Jumbotron/Edit', [
            'jumbotron' => $jumbotron
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jumbotron $jumbotron)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($jumbotron->image && Storage::disk('public')->exists($jumbotron->image)) {
                Storage::disk('public')->delete($jumbotron->image);
            }

            $validated['image'] = $request->file('image')->store('jumbotron', 'public');
        }

        $jumbotron->update($validated);

        return redirect()->route('jumbotron.index')->with('success', 'Jumbotron berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jumbotron $jumbotron)
    {
        if ($jumbotron->image && Storage::disk('public')->exists($jumbotron->image)) {
            Storage::disk('public')->delete($jumbotron->image);
        }

        $jumbotron->delete();

        return redirect()->route('jumbotron.index')->with('success', 'Jumbotron berhasil dihapus');
    }
}
