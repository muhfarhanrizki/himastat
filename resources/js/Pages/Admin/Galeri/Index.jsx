import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Image, Calendar, Pencil, Trash2 } from "lucide-react";
import { route } from "ziggy-js";
import ModalImage from "react-modal-image"; // 🧩 Preview gambar (zoom)

export default function Index({ galeris = [] }) {
    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus galeri ini?")) {
            router.delete(route("galeri.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Galeri Himpunan" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-600" size={26} />
                            Galeri Himpunan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Dokumentasi kegiatan dan momen penting.
                        </p>
                    </div>

                    <Link
                        href={route("galeri.create")}
                        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Galeri
                    </Link>
                </div>

                {/* Daftar Galeri */}
                {galeris.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {galeris.map((galeri) => (
                            <div
                                key={galeri.id}
                                className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100"
                            >
                                {/* Gambar */}
                                {galeri.image ? (
                                    <ModalImage
                                        small={`/storage/${galeri.image}`}
                                        large={`/storage/${galeri.image}`}
                                        alt={galeri.name}
                                        hideDownload={true}
                                        hideZoom={false}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                                        <Image size={42} className="text-gray-300" />
                                    </div>
                                )}

                                {/* Overlay (gradasi + teks + tombol) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-100 transition">
                                    <h2 className="text-white font-semibold text-lg line-clamp-1">
                                        {galeri.name}
                                    </h2>
                                    <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                                        {galeri.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-300">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} /> {galeri.tanggal}
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route("galeri.edit", galeri.id)}
                                                className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-md transition"
                                                title="Edit galeri"
                                            >
                                                <Pencil size={15} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(galeri.id)}
                                                className="bg-red-500/70 hover:bg-red-600 text-white p-1.5 rounded-md transition"
                                                title="Hapus galeri"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Image size={60} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Galeri
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan dokumentasi kegiatan desa sekarang.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
