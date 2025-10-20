import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Eye, Target, Plus, Pencil, Trash2 } from "lucide-react";
import { route } from "ziggy-js";

export default function Index({ visimisi = [] }) {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data Visi & Misi ini?")) {
            router.delete(route("visimisi.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profil Organisasi" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Target className="text-gray-600" size={28} />
                            Profil Organisasi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Tambahkan profil organisasi di halaman ini.
                        </p>
                    </div>
                </div>

                {/* Data */}
                {visimisi.length > 0 ? (
                    <div className="space-y-10">
                        {visimisi.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                            >
                                <div className="px-8 pt-12">
                                 <div className="border-b border-b-gray-300 mb-8 text-center">
                                     <h1 className="font-bold text-2xl text-gray-900">Tentang Himastat</h1>
                                      <p className="font-normal text-lg text-gray-700 pb-8 pt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, incidunt? Ipsum quidem ratione doloremque voluptatem maiores consequuntur ea tempora quo.</p>
                                  </div>
                                </div>
                                <div className="px-12 pb-8 pt-2 space-y-10">
                                    {/* Visi */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Eye className="text-gray-600" size={22} />
                                            <h2 className="text-2xl font-semibold text-gray-900">
                                                Visi
                                            </h2>
                                        </div>
                                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                            {item.visi || "Belum ada visi."}
                                        </p>
                                    </div>

                                    {/* Misi */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Target className="text-gray-600" size={22} />
                                            <h2 className="text-2xl font-semibold text-gray-900">
                                                Misi
                                            </h2>
                                        </div>
                                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                            {item.misi || "Belum ada misi."}
                                        </p>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="p-6 border-t border-gray-200 flex gap-3">
                                    <Link
                                        href={route("visimisi.edit", item.id)}
                                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                                    >
                                        <Pencil size={18} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                                    >
                                        <Trash2 size={18} />
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div className="px-20">
                        <div className="border-b border-b-gray-300 mb-8">
                        <h1 className="font-bold text-2xl text-gray-600">Tentang Himastat</h1>
                        <p className="font-normal text-md text-gray-500 pb-12 pt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, incidunt? Ipsum quidem ratione doloremque voluptatem maiores consequuntur ea tempora quo.</p>
                        </div>
                        </div>
                        <Target size={60} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Data Visi & Misi
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan visi dan misi untuk memperjelas arah pembangunan desa.
                        </p>
                        <Link
                            href={route("visimisi.create")}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition"
                        >
                            <Plus size={18} />
                            Tambah Visi & Misi
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
