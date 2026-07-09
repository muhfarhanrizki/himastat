import React, { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Search, Calendar, User, Newspaper, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { route } from "ziggy-js";
import FrontendLayout from "@/Layouts/FrontendLayout";

function BeritaContent({ berita }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredBerita = useMemo(() => {
        if (!searchQuery.trim()) return berita;

        return berita.filter((item) =>
            item.judul.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [berita, searchQuery]);

    const totalPages = Math.ceil(filteredBerita.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredBerita.slice(startIndex, endIndex);

    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className="min-h-screen">
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-36 pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-2xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-4">
                            Berita
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                            Kabar dan informasi terbaru seputar kegiatan kami
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 -mt-1">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="backdrop-blur-md rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Cari berita berdasarkan judul...."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/60 border border-gray-300/70 
                                            text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gray-400 
                                            focus:border-transparent shadow-inner transition-all duration-300 
                                            hover:bg-white"
                                />

                                {searchQuery && (
                                    <button
                                        onClick={() => handleSearch("")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                                                hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap bg-gray-100/80 px-4 py-2 rounded-xl border border-gray-200">
                                <Newspaper className="w-5 h-5 text-gray-500" />
                                {filteredBerita.length} berita ditemukan
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="pb-20 pt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {currentItems.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={route("berita.show", item.id)}
                                            className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full"
                                        >
                                            <div className="relative h-56 overflow-hidden bg-gray-200">
                                                {item.gambar ? (
                                                    <img
                                                        src={`/storage/${item.gambar}`}
                                                        alt={item.judul}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                                                        <Newspaper className="w-16 h-16 text-gray-500" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                                                    {item.judul}
                                                </h3>

                                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                    {item.konten}
                                                </p>

                                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3.5 h-3.5" /> {item.penulis}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" /> {formatDate(item.tanggal)}
                                                    </span>
                                                </div>

                                                <span className="inline-flex items-center gap-1 text-gray-800 font-medium text-sm group-hover:gap-2 transition-all">
                                                    Baca selengkapnya <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-6 mt-12">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronLeft size={22} />
                                    </button>

                                    <span className="text-gray-700 font-medium">
                                        {currentPage} / {totalPages}
                                    </span>

                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronRight size={22} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            className="col-span-full text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Newspaper className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Tidak ada hasil
                            </h3>
                            <p className="text-gray-600">
                                Coba gunakan kata kunci lain untuk pencarian
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default function Berita({ berita }) {
    return (
        <FrontendLayout>
            <Head title="Berita" />
            <BeritaContent berita={berita} />
        </FrontendLayout>
    );
}