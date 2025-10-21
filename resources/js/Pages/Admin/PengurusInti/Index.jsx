import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { route } from "ziggy-js";

export default function Index() {
    const { pengurusIntis = [] } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus data pengurus ini?")) {
            router.delete(route("pengurusInti.destroy", id), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Berhasil dihapus!");
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pengurus Inti" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Users size={28} /> Pengurus Inti
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Daftar anggota inti yang memimpin organisasi,
                            lengkap dengan jabatan dan deskripsi singkat.
                        </p>
                    </div>

                    <Link
                        href={route("pengurusInti.create")}
                        className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Pengurus
                    </Link>
                </div>

                {/* Daftar Pengurus */}
                {pengurusIntis.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pengurusIntis.map((pengurus) => (
                            <div
                                key={pengurus.id}
                                className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
                            >
                                {/* Foto */}
                                <div className="relative w-full h-64 bg-gray-100">
                                    {pengurus.image ? (
                                        <img
                                            src={`/storage/${pengurus.image}`}
                                            alt={pengurus.nama}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Tidak ada foto 📸
                                        </div>
                                    )}

                                    {/* Tombol Edit & Hapus */}
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <Link
                                            href={route("pengurusInti.edit", {
                                                pengurusInti: pengurus.id,
                                            })}
                                            className="p-2 rounded-lg bg-white/80 hover:bg-sky-100 text-sky-700 transition"
                                            title="Edit"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(pengurus.id)
                                            }
                                            className="p-2 rounded-lg bg-white/80 hover:bg-red-100 text-red-700 transition"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5 text-center">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {pengurus.nama}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {pengurus.jabatan}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2 whitespace-pre-line">
                                        {pengurus.deskripsi ||
                                            "Belum ada deskripsi."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Users
                            size={60}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Data Pengurus
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan anggota pengurus inti sekarang.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
