import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Image, Edit, PlusCircle } from "lucide-react";
import { route } from "ziggy-js";

export default function Index({ structurs }) {
    const struktur = structurs[0];

    return (
        <AuthenticatedLayout>
            <Head title="Struktur Organisasi" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-600" size={28} />
                            Struktur Organisasi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola struktur organisasi dan tampilannya di website.
                        </p>
                    </div>

                    {struktur ? (
                        <Link
                            href={route("struktur.edit", struktur.id)}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <Edit size={18} /> Edit Struktur
                        </Link>
                    ) : (
                        <Link
                            href={route("struktur.create")}
                            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <PlusCircle size={18} /> Tambah Struktur
                        </Link>
                    )}
                </div>

                {/* Content */}
                {struktur ? (
                    <div className="space-y-6">
                        {/* Card 1: Thumbnail */}
                        <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="relative w-full h-96 bg-gray-100">
                                {struktur.thumbnail ? (
                                    <img
                                        src={`/storage/${struktur.thumbnail}`}
                                        alt="Thumbnail Struktur"
                                        className="w-full h-full object-cover brightness-50"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                                        Tidak ada thumbnail 🖼️
                                    </div>
                                )}

                                {/* Overlay teks */}
                                <div className="absolute inset-0 flex flex-col justify-center text-center p-5">
                                    <h2 className="text-2xl font-semibold text-white drop-shadow">
                                        Bagan Struktur
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 & 3: Pengurus Inti + Deskripsi */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pengurus Inti */}
                            <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                                <div className="relative w-full h-[28rem] bg-gray-100">
                                    {struktur.struktur ? (
                                        <img
                                            src={`/storage/${struktur.struktur}`}
                                            alt="Pengurus Inti"
                                            className="w-full h-full object-cover brightness-50"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                                            Tidak ada gambar pengurus inti 📊
                                        </div>
                                    )}

                                    {/* Overlay teks */}
                                    <div className="absolute inset-0 flex flex-col justify-center text-center p-5">
                                        <h2 className="text-2xl font-semibold text-white drop-shadow">
                                            Pengurus Inti
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-12 py-10 flex flex-col justify-start">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Deskripsi
                                    </h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    {struktur.deskripsi ||
                                        "Belum ada deskripsi yang ditambahkan."}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Jika belum ada data
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-100">
                        <p className="text-gray-500 text-lg">
                            Belum ada struktur organisasi yang dibuat 😅
                        </p>
                        <Link
                            href={route("struktur.create")}
                            className="inline-flex items-center gap-2 mt-6 bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
                        >
                            <PlusCircle size={18} />
                            Tambah Sekarang
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}