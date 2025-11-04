<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dewan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DewanController extends Controller
{
    public function index()
    {
        $dewan = Dewan::all();
        return Inertia::render('Admin/Dewan/Index', [
            'dewan' => $dewan
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Dewan/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'deskripsi' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('dewan', 'public');
        }

        Dewan::create($validated);

        return redirect()->route('admin.strukturdewan.index')
            ->with('success', 'Dewan berhasil ditambahkan');
    }

    public function edit(Dewan $dewan)
    {
        return Inertia::render('Admin/Dewan/Edit', [
            'dewan' => $dewan
        ]);
    }

    public function update(Request $request, Dewan $dewan)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'deskripsi' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            if ($dewan->image) {
                Storage::disk('public')->delete($dewan->image);
            }
            $validated['image'] = $request->file('image')->store('dewan', 'public');
        }

        $dewan->update($validated);

        return redirect()->route('admin.strukturdewan.index')
            ->with('success', 'Dewan berhasil diperbarui');
    }

    public function destroy(Dewan $dewan)
    {
        if ($dewan->image) {
            Storage::disk('public')->delete($dewan->image);
        }

        $dewan->delete();

        return redirect()->route('admin.strukturdewan.index')
            ->with('success', 'Dewan berhasil dihapus');
    }
}