import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Briefcase, Search, Calendar } from "lucide-react";

export default function Index({ auth, prokers, divisis, filters }) {
    const [selectedDivisi, setSelectedDivisi] = useState("");
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleSearch = () => {
        router.get(
            route("proker.index"),
            {
                search: searchTerm,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const filteredProkers =
        selectedDivisi === ""
            ? prokers.data
            : prokers.data.filter(
                  (proker) => proker.divisi_id === parseInt(selectedDivisi)
              );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Program Kerja
                </h2>
            }
        >
            <Head title="Program Kerja" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Briefcase className="text-gray-800" size={26} />
                            Program Kerja Himpunan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Daftar program kerja dari semua divisi.
                        </p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari nama atau deskripsi program kerja..."
                            className="w-full pl-9 pr-3 py-2 border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
                        />
                    </div>

                    <select
                        value={selectedDivisi}
                        onChange={(e) => setSelectedDivisi(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Semua Divisi</option>
                        {divisis.map((divisi) => (
                            <option key={divisi.id} value={divisi.id}>
                                {divisi.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Daftar Program Kerja */}
                {filteredProkers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredProkers.map((proker) => (
                            <div
                                key={proker.id}
                                className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white"
                            >
                                {/* Gambar */}
                                <div className="relative h-48 overflow-hidden">
                                    {proker.image ? (
                                        <img
                                            src={`/storage/${proker.image}`}
                                            alt={proker.nama}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                            <Briefcase
                                                size={40}
                                                className="text-gray-400"
                                            />
                                        </div>
                                    )}

                                    {/* Overlay dengan gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                    {/* Content di atas gambar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                                            {proker.nama}
                                        </h3>

                                        <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                                            {proker.description}
                                        </p>

                                        {/* Divisi Badge & Tanggal */}
                                        <div className="flex items-center justify-between">
                                            <span className="px-2 py-1  text-white text-xs rounded-full">
                                                {proker.divisi.name}
                                            </span>
                                            <div className="flex items-center gap-1 text-white text-xs">
                                                <Calendar size={16} /><span>{proker.tanggal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Briefcase
                            size={60}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Tidak Ada Program Kerja
                        </h3>
                        <p className="text-gray-500">
                            Program kerja yang Anda cari tidak ditemukan.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {prokers.links && prokers.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                        {prokers.links.map((link, i) => (
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
                                preserveState
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
