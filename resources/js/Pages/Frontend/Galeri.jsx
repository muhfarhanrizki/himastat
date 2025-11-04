import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Search, Calendar, Image, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

function GaleriContent({ galeri }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const itemsPerPage = 6;

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

    // Pagination navigation
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className="min-h-screen">
            {/* Header Section */}
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
                            <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-4">
                            Galeri Kegiatan
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                            Dokumentasi momen berharga dan kegiatan inspiratif kami
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search & Filter Section */}
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
                                    placeholder="Cari galeri berdasarkan judul atau deskripsi..."
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
                                <ImageIcon className="w-5 h-5 text-gray-500" />
                                {filteredGaleri.length} hasil ditemukan
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20 pt-8 relative z-10">
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

                            {/* Pagination - Style sama seperti Jejak Alumni */}
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
                        className="relative max-w-4xl w-full"
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