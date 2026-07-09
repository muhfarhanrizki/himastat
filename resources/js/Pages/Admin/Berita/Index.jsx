import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, BookOpen, Calendar } from "lucide-react";
import { route } from "ziggy-js";

export default function Index() {
    const { beritas } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus berita ini?")) {
            router.delete(route("admin.berita.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Berita Edukasi" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <BookOpen className="text-gray-800" size={28} />
                            Berita
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola berita dan informasi terbaru untuk pembaca.
                        </p>
                    </div>

                    <Link
                        href={route("admin.berita.create")}
                        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Berita
                    </Link>
                </div>

                {/* Data berita */}
                {beritas.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        {beritas.data.map((berita) => (
                            <div
                                key={berita.id}
                                className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
                            >
                                <div className="flex flex-col md:flex-row gap-6 p-6">
                                    {/* Gambar */}
                                    <div className="flex-shrink-0 mx-auto md:mx-0">
                                        {berita.gambar ? (
                                            <img
                                                src={`/storage/${berita.gambar}`}
                                                alt={berita.judul}
                                                className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-xl shadow-sm border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200">
                                                <BookOpen
                                                    size={40}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Isi */}
                                    <div className="flex-1 flex flex-col justify-between relative">
                                        <div className="space-y-2">
                                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                                                {berita.judul}
                                            </h2>
                                            <p className="text-sm text-gray-500 font-medium">
                                                {berita.penulis}
                                            </p>
                                            <p className="text-gray-700 leading-relaxed line-clamp-2 whitespace-pre-line">
                                                {berita.konten}
                                            </p>
                                            <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
                                                <Calendar size={14} />{" "}
                                                {berita.tanggal}
                                            </p>
                                        </div>

                                        {/* Tombol Edit & Hapus */}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <Link
                                                href={route(
                                                    "admin.berita.edit",
                                                    berita.id
                                                )}
                                                className="p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(berita.id)
                                                }
                                                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <BookOpen
                            size={60}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada berita
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan berita pertama kamu sekarang.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {beritas.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                        {beritas.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 rounded-lg text-sm ${
                                    link.active
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                } ${
                                    !link.url
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}