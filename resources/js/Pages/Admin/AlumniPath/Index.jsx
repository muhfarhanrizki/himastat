import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, User, Search } from "lucide-react";
import { route } from "ziggy-js";

export default function Index() {
    const { alumnis, filters } = usePage().props;
    const [search, setSearch] = useState(filters?.search || "");

    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus data alumni ini?")) {
            router.delete(route("admin.alumniPath.destroy", id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.alumniPath.index"),
            { search },
            { preserveState: true }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pencapaian" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <User className="text-gray-800" size={28} />
                            Pencapaian
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kumpulan pencapaian yang diraih oleh anggota himastat.
                        </p>
                    </div>

                    {/* Tombol Tambah */}
                    <Link
                        href={route("admin.alumniPath.create")}
                        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Pencapaian
                    </Link>
                </div>

                {/* 🔍 Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="mb-6 flex items-center gap-2"
                >
                    <div className="relative w-full md:w-1/3">
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama atau tanggal pencapaian..."
                            className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring focus:ring-gray-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                    >
                        Cari
                    </button>
                </form>

                {/* Data Alumni */}
                {alumnis.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        {alumnis.data.map((alumni) => (
                            <div
                                key={alumni.id}
                                className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
                            >
                                <div className="flex flex-col md:flex-row gap-6 p-6">
                                    {/* Foto */}
                                    <div className="flex-shrink-0 mx-auto md:mx-0">
                                        {alumni.image ? (
                                            <img
                                                src={`/storage/${alumni.image}`}
                                                alt={alumni.nama}
                                                className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-xl shadow-sm border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200">
                                                <User
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
                                                {alumni.nama}
                                            </h2>
                                            <p className="text-sm text-gray-500 font-medium">
                                                {alumni.angkatan}
                                            </p>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {alumni.pesan ||
                                                    "Belum ada pencapaian dari anggota ini."}
                                            </p>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {alumni.tanggal ||
                                                    "tanggal pencapaian tidak tersedia."}
                                            </p>
                                            {alumni.kontak && (
                                                <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                                                    <User size={14} />{" "}
                                                    {alumni.kontak}
                                                </p>
                                            )}
                                        </div>

                                        {/* Tombol Edit & Hapus */}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <Link
                                                href={route(
                                                    "admin.alumniPath.edit",
                                                    alumni.id
                                                )}
                                                className="p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(alumni.id)
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
                        <User
                            size={60}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Data Pencapaian
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan pencapaian yang membanggakan himastat.
                        </p>
                    </div>
                )}

                {/* 📄 Pagination */}
                {alumnis.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                        {alumnis.links.map((link, i) => (
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
