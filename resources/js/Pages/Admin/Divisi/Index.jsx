import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Users, Plus, Trash2, Briefcase, UserCheck } from "lucide-react";

export default function Index({ auth, divisis }) {
    const handleDelete = (slug) => {
        if (confirm("Apakah Anda yakin ingin menghapus divisi ini?")) {
            router.delete(route("admin.divisi.destroy", slug));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen Divisi
                </h2>
            }
        >
            <Head title="Divisi" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Users className="text-gray-800" size={26} />
                            Divisi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola divisi himpunan.
                        </p>
                    </div>

                    <Link
                        href={route("admin.divisi.create")}
                        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Divisi
                    </Link>
                </div>

                {/* Daftar Divisi */}
                {divisis.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        {divisis.map((divisi) => (
                            <Link
                                key={divisi.id}
                                href={route("admin.divisi.show", divisi.slug)}
                                className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                {/* Tombol Hapus di pojok kanan atas */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(divisi.slug);
                                    }}
                                    className="absolute top-3 right-3 z-10 bg-red-400 hover:bg-red-500 text-white p-2 rounded-md transition shadow-lg opacity-0 group-hover:opacity-100"
                                    title="Hapus"
                                >
                                    <Trash2 size={14} />
                                </button>

                                {/* Gambar */}
                                <div className="relative h-64 overflow-hidden">
                                    {divisi.image ? (
                                        <img
                                            src={`/storage/${divisi.image}`}
                                            alt={divisi.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                            <Users
                                                size={60}
                                                className="text-white opacity-50"
                                            />
                                        </div>
                                    )}

                                    {/* Overlay dengan gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                    {/* Content di atas gambar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h2 className="text-white font-bold text-xl mb-2">
                                            {divisi.name}
                                        </h2>

                                        <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                                            {divisi.deskripsi}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-white text-sm">
                                                <UserCheck size={16} />
                                                <span>
                                                    {divisi.anggota?.length ||
                                                        0}{" "}
                                                    Anggota
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-white text-sm">
                                                <Briefcase size={16} />
                                                <span>
                                                    {divisi.proker?.length || 0}{" "}
                                                    Proker
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Users
                            size={60}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Divisi
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan divisi himpunan sekarang.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
