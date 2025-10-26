<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::all();

        return Inertia::render('Admin/Contact/Index', [
            'contacts' => $contacts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Contact/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        Contact::create($validated);

        return redirect()->route('admin.contact.index')->with('success', 'Contact berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return Inertia::render('Admin/Contact/Show', [
            'contact' => $contact
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        return Inertia::render('Admin/Contact/Edit', [
            'contact' => $contact
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'phone' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        $contact->update($validated);

        return redirect()->route('admin.contact.index')->with('success', 'Contact berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contact.index')->with('success', 'Contact berhasil dihapus');
    }
}
