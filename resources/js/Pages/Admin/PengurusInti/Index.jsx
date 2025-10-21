import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { route } from "ziggy-js";

export default function Index({ pengurusIntis }) {
    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus data pengurus ini?")) {
            router.delete(route("pengurusInti.destroy", id), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("✅ Data berhasil dihapus");
                },
                onError: (err) => {
                    console.error("❌ Gagal hapus:", err);
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
                            Daftar anggota inti yang memimpin organisasi.
                        </p>
                    </div>

                    <Link
                        href={route("pengurusInti.create")}
                        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Pengurus Inti
                    </Link>
                </div>

                {/* Daftar Pengurus */}
                {pengurusIntis.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pengurusIntis.map((pengurus) => (
                            <div
                                key={pengurus.id}
                                className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition group"
                            >
                                {/* Foto */}
                                <div className="relative w-full h-96 bg-gray-100 overflow-hidden">
                                    {pengurus.image ? (
                                        <img
                                            src={`/storage/${pengurus.image}`}
                                            alt={pengurus.nama}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Tidak ada foto 📸
                                        </div>
                                    )}

                                    {/* Overlay teks dan tombol */}
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-between py-5 px-4 text-center text-white transition-all">
                                        <div className="flex justify-end w-full gap-2">
                                            <Link
                                                href={route(
                                                    "pengurusInti.edit",
                                                    pengurus.id
                                                )}
                                                className="p-2 rounded-lg bg-white/30 hover:bg-sky-500 hover:text-white transition"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(pengurus.id)
                                                }
                                                className="p-2 rounded-lg bg-white/30 hover:bg-red-500 hover:text-white transition"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {pengurus.nama}
                                            </h2>
                                            <p className="text-sm opacity-90">
                                                {pengurus.jabatan}
                                            </p>
                                        </div>
                                    </div>
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
