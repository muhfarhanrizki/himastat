import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Image, Edit, PlusCircle, Users, Trash2, ArrowLeft } from "lucide-react";

export default function Index({ structurs, pengurusInti }) {
    const struktur = structurs[0];

    const handleDeletePengurus = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengurus ini?")) {
            router.delete(route("admin.pengurusInti.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Badan Eksekutif" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-800" size={28} />
                            Badan Eksekutif
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola struktur badan eksekutif dan pengurus inti.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {struktur ? (
                            <Link
                                href={route("admin.struktur.edit", struktur.id)}
                                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                            >
                                <Edit size={18} /> Edit Struktur
                            </Link>
                        ) : (
                            <Link
                                href={route("admin.struktur.create")}
                                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                            >
                                <PlusCircle size={18} /> Tambah Struktur
                            </Link>
                        )}
                    </div>
                </div>

                {/* Hero Image Card - Struktur */}
                {struktur ? (
                    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-8 h-96">
                        {struktur.struktur ? (
                            <img
                                src={`/storage/${struktur.struktur}`}
                                alt="Struktur Organisasi"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                                <Image
                                    size={100}
                                    className="text-white opacity-50"
                                />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h2 className="text-4xl font-bold text-white mb-3">
                                Foto Pengurus
                            </h2>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-white">
                                    <Users size={20} />
                                    <span className="text-lg">
                                        {pengurusInti?.length || 0} Pengurus Inti
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-8 h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                            <Image size={80} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 text-lg mb-4">
                                Belum ada struktur organisasi
                            </p>
                            <Link
                                href={route("admin.struktur.create")}
                                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                            >
                                <PlusCircle size={18} />
                                Tambah Struktur
                            </Link>
                        </div>
                    </div>
                )}

                {/* Deskripsi */}
                {struktur && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Tugas dan Fungsi
                        </h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {struktur.deskripsi || "Belum ada deskripsi yang ditambahkan."}
                        </p>
                    </div>
                )}

                {/* Pengurus Inti Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Pengurus Inti ({pengurusInti?.length || 0})
                        </h2>
                        <Link
                            href={route("admin.pengurusInti.create")}
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <PlusCircle size={18} /> Tambah Pengurus
                        </Link>
                    </div>

                    {pengurusInti && pengurusInti.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pengurusInti.map((person) => (
                                <div
                                    key={person.id}
                                    className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white"
                                >
                                    {/* Tombol Hapus & Edit di pojok kanan atas */}
                                    <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <Link
                                            href={route("admin.pengurusInti.edit", person.id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition shadow-lg"
                                            title="Edit"
                                        >
                                            <Edit size={14} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeletePengurus(person.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition shadow-lg"
                                            title="Hapus"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        {person.image ? (
                                            <img
                                                src={`/storage/${person.image}`}
                                                alt={person.nama}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <Users size={48} className="text-gray-400" />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                                                {person.nama}
                                            </h3>
                                            <p className="text-gray-200 text-sm line-clamp-1">
                                                {person.jabatan}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <Users size={50} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500">Belum ada pengurus inti</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}