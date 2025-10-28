import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { GraduationCap, Search, ChevronLeft, ChevronRight, X, Quote } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function JejakAlumni({ AlumniPath }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    // ✅ FIXED: useMemo pakai searchQuery yang aktif
    const filtered = useMemo(() => {
        return AlumniPath.filter((item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.angkatan.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, AlumniPath]);

    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(filtered.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const currentData = filtered.slice(startIndex, startIndex + perPage);

    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <FrontendLayout>
            <Head title="Jejak Alumni" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-36 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-700 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-2xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <GraduationCap className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent pb-2 mb-2">
                            Jejak Alumni
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Cerita dan pesan dari para alumni Himastat yang menginspirasi.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="rgb(249, 250, 251)"
                        />
                    </svg>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 -mt-1">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="backdrop-blur-md rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            {/* Search Input */}
                            <div className="relative flex-1 w-full">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Cari alumni berdasarkan nama atau angkatan..."
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

                            {/* Result Count */}
                            <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap bg-gray-100/80 px-4 py-2 rounded-xl border border-gray-200">
                                <GraduationCap className="w-5 h-5 text-gray-500" />
                                {filtered.length} hasil ditemukan
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Alumni Cards */}
            <section className="pb-20 pt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-10">
                        {currentData.length > 0 ? (
                            currentData.map((alumni, i) => (
                                <motion.div
                                    key={alumni.id}
                                    className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col sm:flex-row items-center gap-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    {/* FOTO */}
                                    <div className="relative flex-shrink-0">
                                        {alumni.image ? (
                                            <img
                                                src={`/storage/${alumni.image}`}
                                                alt={alumni.nama}
                                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-200 shadow-md"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-800 flex items-center justify-center text-gray-200 border-4 border-gray-200 shadow-md">
                                                <GraduationCap size={30} />
                                            </div>
                                        )}
                                       <Quote
                                        size={26}
                                        className="absolute -top-3 -right-3 text-gray-300 opacity-70"
                                        />
                                    </div>

                                    {/* INFO */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{alumni.nama}</h4>
                                        <p className="text-gray-500 text-sm mb-2">Angkatan {alumni.angkatan}</p>

                                        <p className="text-gray-700 italic leading-relaxed text-sm line-clamp-3">
                                            “{alumni.pesan}”
                                        </p>

                                        {alumni.kontak && (
                                            <p className="mt-2 text-gray-500 text-sm">
                                                <span className="font-semibold">Kontak:</span> {alumni.kontak}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                Tidak ada alumni ditemukan.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
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
                </div>
            </section>

        </FrontendLayout>
    );
}
