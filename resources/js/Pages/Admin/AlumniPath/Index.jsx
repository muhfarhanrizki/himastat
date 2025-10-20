import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, User } from "lucide-react";
import { route } from "ziggy-js";

export default function Index({ alumnis = [] }) {
    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus data alumni ini?")) {
            router.delete(route("alumniPath.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Jejak Alumni" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <User className="text-gray-600" size={28} />
                            Jejak Alumni
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Cerita dan pesan alumni dari berbagai generasi.
                        </p>
                    </div>

                    {/* Tombol Tambah */}
                    <Link
                        href={route("alumniPath.create")}
                        className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Alumni
                    </Link>
                </div>

                {/* Data Alumni */}
                {alumnis.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                        {alumnis.map((alumni) => (
                            <div
                                key={alumni.id}
                                className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                                    {/* Foto */}
                                    <div className="flex-shrink-0 mx-auto md:mx-0">
                                        {alumni.image ? (
                                            <img
                                                src={`/storage/${alumni.image}`}
                                                alt={alumni.nama}
                                                className="w-40 h-40 object-cover rounded-xl shadow-md border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200">
                                                <User size={40} className="text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Isi */}
                                    <div className="flex-1 flex flex-col justify-between relative">
                                        <div className="pb-12"> {/* biar nggak ketimpa tombol */}
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                                {alumni.nama}
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {alumni.pesan || "Belum ada pesan dari alumni ini."}
                                            </p>
                                        </div>

                                        {/* Tombol Edit & Hapus (pojok kanan bawah) */}
                                        <div className="absolute bottom-0 right-0 flex gap-2 px-4 pt-4">
                                            <Link
                                                href={route("alumniPath.edit", alumni.id)}
                                                className="p-2.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition"
                                                title="Edit"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(alumni.id)}
                                                className="p-2.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
                                                title="Hapus"
                                            >
                                                <Trash2 size={18} />
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
                        <User size={60} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Data Alumni
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan kisah dan pesan inspiratif dari mereka.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
