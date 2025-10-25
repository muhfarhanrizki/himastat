import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Search, Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

function GaleriContent({ galeri }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const itemsPerPage = 9;

    // Filter galeri berdasarkan search query
    const filteredGaleri = useMemo(() => {
        if (!searchQuery.trim()) return galeri;
        
        return galeri.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [galeri, searchQuery]);

    // Pagination logic
    const totalPages = Math.ceil(filteredGaleri.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredGaleri.slice(startIndex, endIndex);

    // Reset ke halaman 1 saat search
    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    // Format tanggal
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Pagination buttons
    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-36 overflow-hidden">
                {/* Background Decoration */}
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
                            <ImageIcon className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent pb-2 mb-2">
                            Galeri Kegiatan
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Dokumentasi momen berharga dan kegiatan inspiratif kami
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
                    </svg>
                </div>
            </section>

            {/* Search & Filter Section */}
            <section className="py-12 -mt-1 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            {/* Search Input */}
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari galeri..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => handleSearch("")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Results Count */}
                            <div className="text-gray-600 font-medium whitespace-nowrap">
                                {filteredGaleri.length} Hasil
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {currentItems.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="group cursor-pointer"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200">
                                            {/* Image */}
                                            <div className="relative h-64 overflow-hidden bg-gray-200">
                                                {item.image ? (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                                                        <ImageIcon className="w-16 h-16 text-gray-500" />
                                                    </div>
                                                )}
                                                {/* Overlay on Hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <p className="text-white text-sm">Klik untuk melihat</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                
                                                {item.description && (
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                )}

                                                {item.tanggal && (
                                                    <div className="flex items-center text-gray-500 text-sm">
                                                        <Calendar className="w-4 h-4 mr-2" />
                                                        {formatDate(item.tanggal)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <motion.div
                                    className="mt-12 flex justify-center items-center gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {/* Page Numbers */}
                                    {getPaginationButtons().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
                                                currentPage === page
                                                    ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ImageIcon className="w-20 h-20 text-gray-400 mx-auto mb-4" />
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

            {/* Image Modal/Lightbox */}
            {selectedImage && (
                <motion.div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        className="relative max-w-5xl w-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Image */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={`/storage/${selectedImage.image}`}
                                alt={selectedImage.name}
                                className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {selectedImage.name}
                                </h3>
                                {selectedImage.description && (
                                    <p className="text-gray-600 mb-4">
                                        {selectedImage.description}
                                    </p>
                                )}
                                {selectedImage.tanggal && (
                                    <div className="flex items-center text-gray-500">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        {formatDate(selectedImage.tanggal)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export default function Galeri({ galeri }) {
    return (
        <FrontendLayout>
            <Head title="Galeri" />
            <GaleriContent galeri={galeri} />
        </FrontendLayout>
    );
}