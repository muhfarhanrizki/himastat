import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, MessageSquare } from "lucide-react";
import { route } from "ziggy-js";

export default function Index({ sambutans }) {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus sambutan ini?")) {
            router.delete(route("sambutan.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Sambutan" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <MessageSquare className="text-gray-800" size={28} />
                            Daftar Sambutan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola sambutan untuk pengunjung website.
                        </p>
                    </div>
                </div>

                {/* List Sambutan */}
                <div className="space-y-6 ">
                    {sambutans.map((sambutan) => (
                        <div
                            key={sambutan.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            {/* Preview Split Layout */}
                            <div className="flex flex-col md:flex-row">
                                {/* Gambar di kiri */}
                                <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[400px]">
                                    <img
                                        src={`/storage/${sambutan.image}`}
                                        alt={sambutan.nama}
                                        className="w-full h-[500px] object-cover object-center"
                                    />
                                </div>

                                {/* Content di kanan */}
                                <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-50 to-white flex flex-col">
                                    {/* Text Content */}
                                    <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
                                        <div className="text-center space-y-4 max-w-md">
                                            <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
                                                {sambutan.sambutan}
                                            </p>

                                            <div className="pt-4 border-t border-gray-200">
                                                <p className="text-gray-900 font-semibold text-base">
                                                    {sambutan.nama}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    {sambutan.jabatan}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="p-6 border-t border-gray-200 flex gap-3">
                                        <Link
                                            href={route(
                                                "sambutan.edit",
                                                sambutan.id
                                            )}
                                            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                                        >
                                            <Pencil size={18} />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(sambutan.id)
                                            }
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                                        >
                                            <Trash2 size={18} />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {sambutans.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl">
                        <MessageSquare
                            size={64}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Sambutan
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Mulai tambahkan sambutan untuk pengunjung website.
                        </p>
                        <Link
                            href={route("sambutan.create")}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition"
                        >
                            <Plus size={18} />
                            Tambah Sambutan
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
