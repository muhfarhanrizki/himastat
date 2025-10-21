<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Divisi;
use App\Models\Proker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ProkerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        $divisis = Divisi::orderBy('created_at', 'desc')->get();
        $prokers = Proker::with('divisi')
                ->when($search, function ($query, $search) {
                    $query->where('nama', 'like', '%' . $search . '%')
                        ->orWhere('deskripsi', 'like', '%' . $search . '%');
                })
                ->orderBy('created_at', 'desc')
                ->paginate(5)
                ->withQueryString();

        return Inertia::render('Admin/Proker/Index', [
            'prokers' => $prokers,
            'divisis' => $divisis, // pake dropdown filter nah sundala
            'filters' => 
            [
                'search' => $search
            ] 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $divisis = Divisi::all();

        return Inertia::render('Admin/Proker/Create',[
            'divisis' => $divisis  // ini jg pake dropwon untuk formna sundala
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'divisi_id' => 'required|exists:divisis,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tanggal' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('proker', 'public');
        }

        Proker::create($validated);

        return redirect()->route('proker.index')->with('success', 'Proker berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Proker $proker)
    {
        return Inertia::render('Admin/Proker/Show', [
            'proker' => $proker
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proker $proker)
    {
        $divisis = Divisi::all();

        return Inertia::render('Admin/Proker/Edit', [
            'proker' => $proker,
            'divisis' => $divisis
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proker $proker)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'divisi_id' => 'required|exists:divisis,id',
            'tanggal' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            if ($proker->image && Storage::disk('public')->exists($proker->image)) {
                Storage::disk('public')->delete($proker->image);
            }

            $validated['image'] = $request->file('image')->store('proker', 'public');
        } else {
            unset($validated['image']);
        }

        $proker->update($validated);

        return redirect()->route('proker.index')->with('success', 'Proker berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proker $proker)
    {
        if ($proker->image && Storage::disk('public')->exists($proker->image)) {
            Storage::disk('public')->delete($proker->image);
        }

        $proker->delete();

        return redirect()->route('proker.index')->with('success', 'Proker berhasil dihapus');
    }
}
