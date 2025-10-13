<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\AlumniPath;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AlumniPathController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alumnis = AlumniPath::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/AlumniPath/Index', [
            'alumnis' => $alumnis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AlumniPath/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'pesan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('alumni_path', 'public');
        }

        AlumniPath::create($validated);

        return redirect()->route('alumniPath.index')->with('success', 'Alumni Path berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(AlumniPath $alumniPath)
    {
        return Inertia::render('Admin/AlumniPath/Show', [
            'alumniPath' => $alumniPath
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AlumniPath $alumniPath)
    {
        return Inertia::render('Admin/AlumniPath/Edit', [
            'alumniPath' => $alumniPath
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
