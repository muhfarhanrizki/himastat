import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { GitBranch, Edit, Trash2, PlusIcon } from "lucide-react";

export default function Index({ bagan }) {
    const baganStruktur = bagan?.[0];

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus bagan struktur ini?")) {
            router.delete(route("admin.baganStruktur.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Bagan Struktur" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <GitBranch className="text-gray-800" size={28} />
                            Bagan Struktur
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola bagan struktur organisasi website kamu.
                        </p>
                    </div>
                </div>

                {/* Content */}
                {baganStruktur ? (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                        <div className="relative w-full h-96">
                            {baganStruktur.image ? (
                                <img
                                    src={`/storage/${baganStruktur.image}`}
                                    alt={baganStruktur.title}
                                    className="w-full h-full object-cover brightness-50"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-lg">
                                    Tidak ada gambar 🖼️
                                </div>
                            )}

                            {/* Overlay teks di atas gambar */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                                    {baganStruktur.title}
                                </h2>
                                <p className="text-white text-base md:text-lg max-w-2xl drop-shadow-md">
                                    {baganStruktur.description ||
                                        "Belum ada deskripsi ditambahkan."}
                                </p>
                            </div>

                            {/* Tombol Aksi di pojok kanan atas */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <Link
                                    href={route(
                                        "admin.baganStruktur.edit",
                                        baganStruktur.id
                                    )}
                                    className="p-2 rounded-lg bg-white/80 hover:bg-white text-sky-600 transition"
                                    title="Edit"
                                >
                                    <Edit size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(baganStruktur.id)}
                                    className="p-2 rounded-lg bg-white/80 hover:bg-red-100 text-red-600 transition"
                                    title="Hapus"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl">
                        <GitBranch
                            size={64}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Bagan Struktur
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan bagan struktur untuk organisasi website
                        </p>
                        <Link
                            href={route("admin.baganStruktur.create")}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition"
                        >
                            <PlusIcon size={18} />
                            Tambah Bagan Struktur
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}