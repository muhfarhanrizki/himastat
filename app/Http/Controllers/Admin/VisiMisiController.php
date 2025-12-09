<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\VisiMisi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VisiMisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visimisi = VisiMisi::all();

        return Inertia::render("Admin/VisiMisi/Index", [
            "visimisi" => $visimisi,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/VisiMisi/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "visi" => "required|string",
            "misi" => "required|string",
        ]);

        VisiMisi::create($validated);

        return redirect()
            ->route("admin.visimisi.index")
            ->with("success", "Visi Misi berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(VisiMisi $visimisi)
    {
        return Inertia::render("Admin/VisiMisi/Show", [
            "visimisi" => $visimisi,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VisiMisi $visimisi)
    {
        return Inertia::render("Admin/VisiMisi/Edit", [
            "visimisi" => $visimisi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VisiMisi $visimisi)
    {
        $validated = $request->validate([
            "visi" => "required|text",
            "misi" => "required|string",
        ]);

        $visimisi->update($validated);

        return redirect()
            ->route("admin.visimisi.index")
            ->with("success", "Visi Misi berhasil diperbarui");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VisiMisi $visimisi)
    {
        $visimisi->delete();

        return redirect()
            ->route("admin.visimisi.index")
            ->with("success", "Visi Misi berhasil dihapus");
    }
}
