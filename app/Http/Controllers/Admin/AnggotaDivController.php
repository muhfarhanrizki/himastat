<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\AnggotaDiv;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnggotaDivController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $anggotas = AnggotaDiv::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', '%' . $search . '%')
                    ->orWhere('jabatan', 'like', '%' . $search . '%')
                    ->orWhere('angkatan', 'like', '%' . $search . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/AnggotaDiv/Index', [
            'anggotas' => $anggotas,
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
        return Inertia::render('Admin/AnggotaDiv/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'divisi_id' => 'required|exists:divisis,id',
            'angkatan' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
        ]);

        AnggotaDiv::create($validated);

        return redirect()->back()->with('success', 'Anggota Divisi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(AnggotaDiv $anggotaDiv)
    {
        return Inertia::render('Admin/AnggotaDiv/Show', [
            'anggotaDiv' => $anggotaDiv
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnggotaDiv $anggotaDiv)
    {
        return Inertia::render('Admin/AnggotaDiv/Edit', [
            'anggotaDiv' => $anggotaDiv
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnggotaDiv $anggotaDiv)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'divisi_id' => 'required|exists:divisis,id',
            'angkatan' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
        ]);

        $anggotaDiv->update($validated);

        return redirect()->back()->with('success', 'Anggota Divisi berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnggotaDiv $anggotaDiv)
    {
        $anggotaDiv->delete();

        return redirect()->back()->with('success', 'Anggota Divisi berhasil dihapus');
    }
}
