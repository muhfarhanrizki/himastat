<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\AlumniPath;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class AlumniPathController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $alumnis = AlumniPath::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', '%' . $search . '%')
                    ->orWhere('pesan', 'like', '%' . $search . '%')
                    ->orWhere('angkatan', 'like', '%' . $search . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->withQueryString();
        

        return Inertia::render('Admin/AlumniPath/Index', [
            'alumnis' => $alumnis,
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
        return Inertia::render('Admin/AlumniPath/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'angkatan' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
            'pesan' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('alumni_path', 'public');
        }

        AlumniPath::create($validated);

        return redirect()->route('admin.alumniPath.index')->with('success', 'Alumni Path berhasil ditambahkan');
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
    public function update(Request $request, AlumniPath $alumniPath)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'angkatan' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
            'pesan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {

            if ($alumniPath->image && Storage::disk('public')->exists($alumniPath->image)) {
                Storage::disk('public')->delete($alumniPath->image);
            }

            $validated['image'] = $request->file('image')->store('alumni_path', 'public');
        } else {
            unset($validated['image']);
        }

        $alumniPath->update($validated);

        return redirect()->route('admin.alumniPath.index')->with('success', 'Alumni Path berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlumniPath $alumniPath)
    {
        $alumniPath->delete();

        if ($alumniPath->image && Storage::disk('public')->exists($alumniPath->image)) {
            Storage::disk('public')->delete($alumniPath->image);
        }

        return redirect()->route('admin.alumniPath.index')->with('success', 'Alumni Path berhasil dihapus');
    }
}
