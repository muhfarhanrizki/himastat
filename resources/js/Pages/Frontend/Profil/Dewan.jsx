import React, { useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Users } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function Dewan({ dewan }) {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 280;
        const newScrollLeft = direction === "left" 
            ? container.scrollLeft - scrollAmount 
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth"
        });
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setShowLeftArrow(container.scrollLeft > 10);
        setShowRightArrow(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    return (
        <FrontendLayout>
            <Head title="Dewan" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-36 pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl mb-6 shadow-2xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-2">
                            Dewan Organisasi
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                            Dewan pembina dan pengawas organisasi
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* DEWAN SECTION */}
            <section className="pb-20 pt-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-8 md:mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-3 md:p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md">
                                <Award className="w-6 h-6 md:w-8 md:h-8 text-purple-700" />
                            </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dewan Pembina & Pengawas</h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base px-4">
                            Para dewan yang membimbing dan mengawasi jalannya organisasi
                        </p>
                    </motion.div>

                    {dewan && dewan.length > 0 ? (
                        <>
                            {/* Desktop Grid View */}
                            <div className="hidden lg:grid lg:grid-cols-4 gap-8 md:gap-10">
                                {dewan.map((person, index) => (
                                    <motion.div
                                        key={person.id}
                                        className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-500"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {/* Gambar Background */}
                                        {person.image ? (
                                            <img
                                                src={`/storage/${person.image}`}
                                                alt={person.nama}
                                                className="w-full h-[280px] md:h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-[280px] md:h-[320px] bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                                                <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
                                            </div>
                                        )}

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />

                                        {/* Award Badge */}
                                        <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10">
                                            <Award className="w-5 h-5 text-white" />
                                        </div>

                                        {/* Text Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 px-4 pt-6 md:pt-8 pb-5 md:pb-6 text-center text-white z-10 transition-all duration-500 group-hover:translate-y-[-4px]">
                                            <h3 className="text-base md:text-lg font-bold drop-shadow-lg mb-1">
                                                {person.nama}
                                            </h3>
                                            <p className="text-purple-200 font-medium text-xs md:text-sm mb-2">
                                                {person.jabatan}
                                            </p>
                                            {person.deskripsi && (
                                                <p className="text-purple-100 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {person.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile & Tablet Carousel View */}
                            <div className="lg:hidden relative group">
                                {/* Left Arrow */}
                                {showLeftArrow && (
                                    <button
                                        onClick={() => scroll("left")}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft size={20} className="text-gray-800 md:w-6 md:h-6" />
                                    </button>
                                )}

                                {/* Right Arrow */}
                                {showRightArrow && (
                                    <button
                                        onClick={() => scroll("right")}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight size={20} className="text-gray-800 md:w-6 md:h-6" />
                                    </button>
                                )}

                                {/* Carousel Container */}
                                <div
                                    ref={scrollContainerRef}
                                    onScroll={handleScroll}
                                    className="flex gap-4 md:gap-6 overflow-x-auto pb-6 md:pb-8 pt-4 px-4 hide-scrollbar scroll-smooth snap-x snap-mandatory"
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                    }}
                                >
                                    {dewan.map((person) => (
                                        <motion.div
                                            key={person.id}
                                            className="relative group flex-shrink-0 w-56 sm:w-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-500 snap-center"
                                            viewport={{ once: true }}
                                        >
                                            {/* Gambar Background */}
                                            {person.image ? (
                                                <img
                                                    src={`/storage/${person.image}`}
                                                    alt={person.nama}
                                                    className="w-full h-[280px] md:h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-[280px] md:h-[320px] bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                                                    <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
                                                </div>
                                            )}

                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />

                                            {/* Award Badge */}
                                            <div className="absolute top-3 right-3 w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10">
                                                <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                            </div>

                                            {/* Text Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 px-4 pt-6 md:pt-8 pb-5 md:pb-6 text-center text-white z-10 transition-all duration-500 group-hover:translate-y-[-4px]">
                                                <h3 className="text-base md:text-lg font-bold drop-shadow-lg mb-1">
                                                    {person.nama}
                                                </h3>
                                                <p className="text-purple-200 font-medium text-xs md:text-sm mb-2">
                                                    {person.jabatan}
                                                </p>
                                                {person.deskripsi && (
                                                    <p className="text-purple-100 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        {person.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Award className="w-16 md:w-20 h-16 md:h-20 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                Belum Ada Data Dewan
                            </h3>
                            <p className="text-sm md:text-base text-gray-600">
                                Data dewan organisasi akan segera ditambahkan
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </FrontendLayout>
    );
}