import React, { useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Network,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function StrukturOrganisasi({ struktur, divisi, pengurusInti }) {
    const data = struktur?.[0] || {};
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 280; // Lebar card (256px) + gap
        const newScrollLeft =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setShowLeftArrow(container.scrollLeft > 10);
        setShowRightArrow(
            container.scrollLeft <
                container.scrollWidth - container.clientWidth - 10,
        );
    };

    return (
        <FrontendLayout>
            <Head title="Badan Eksekutif" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-36 pb-16 overflow-hidden">
                {/* Hero Content */}
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
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
                            <Network className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-4">
                            Badan Eksekutif
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                            Mengenal susunan kepengurusan dan pembagian divisi
                            dalam organisasi kami.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* STRUKTUR SECTION */}
            <section className="pb-20 pt-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-md">
                                <Users className="w-8 h-8 text-gray-700" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Badan Eksekutif Himastat FMIPA Unhas
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                            Inilah tim inti yang menjadi tulang punggung
                            organisasi kami.
                        </p>
                    </motion.div>

                    {/* Struktur Gambar */}
                    {data?.struktur && (
                        <motion.img
                            src={`/storage/${data.struktur}`}
                            alt="Struktur Organisasi"
                            className="w-full rounded-3xl shadow-2xl mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        />
                    )}

                    {/* Deskripsi Struktur */}
                    {data?.deskripsi && (
                        <motion.p
                            className="text-gray-700 leading-relaxed max-w-4xl mx-auto mb-16"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {data.deskripsi}
                        </motion.p>
                    )}
                </div>

                {/* PENGURUS INTI SECTION */}
                <div className="max-w-6xl mx-auto px-6">
                    {pengurusInti.length > 0 ? (
                        <>
                            {/* Desktop Grid View */}
                            <div className="hidden lg:grid lg:grid-cols-4 gap-10">
                                {pengurusInti.map((person, index) => (
                                    <motion.div
                                        key={person.id}
                                        className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-500"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        {/* Gambar Background */}
                                        {person.image ? (
                                            <img
                                                src={`/storage/${person.image}`}
                                                alt={person.nama}
                                                className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-[320px] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                                <Users className="w-12 h-12 text-white" />
                                            </div>
                                        )}

                                        {/* Overlay Hitam Transparan */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />

                                        {/* Text Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 px-4 pt-8 pb-6 text-center text-white z-10 transition-all duration-500 group-hover:translate-y-[-4px]">
                                            <h3 className="text-lg font-bold drop-shadow-lg">
                                                {person.nama}
                                            </h3>
                                            <p className="text-gray-300 font-medium text-sm">
                                                {person.jabatan}
                                            </p>
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
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft
                                            size={24}
                                            className="text-gray-800"
                                        />
                                    </button>
                                )}

                                {/* Right Arrow */}
                                {showRightArrow && (
                                    <button
                                        onClick={() => scroll("right")}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight
                                            size={24}
                                            className="text-gray-800"
                                        />
                                    </button>
                                )}

                                {/* Carousel Container */}
                                <div
                                    ref={scrollContainerRef}
                                    onScroll={handleScroll}
                                    className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 hide-scrollbar scroll-smooth snap-x snap-mandatory"
                                    style={{
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                    }}
                                >
                                    {pengurusInti.map((person, index) => (
                                        <motion.div
                                            key={person.id}
                                            className="relative group flex-shrink-0 w-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-500 snap-center"
                                            viewport={{ once: true }}
                                        >
                                            {/* Gambar Background */}
                                            {person.image ? (
                                                <img
                                                    src={`/storage/${person.image}`}
                                                    alt={person.nama}
                                                    className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-[320px] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                                    <Users className="w-12 h-12 text-white" />
                                                </div>
                                            )}

                                            {/* Overlay Hitam Transparan */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />

                                            {/* Text Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 px-4 pt-8 pb-6 text-center text-white z-10 transition-all duration-500 group-hover:translate-y-[-4px]">
                                                <h3 className="text-lg font-bold drop-shadow-lg">
                                                    {person.nama}
                                                </h3>
                                                <p className="text-gray-300 font-medium text-sm">
                                                    {person.jabatan}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            Belum ada data pengurus inti.
                        </div>
                    )}
                </div>
            </section>

            {/* DIVISI SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-md">
                                <Users className="w-8 h-8 text-gray-700" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Divisi Organisasi
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                            Pembagian bidang kerja dan tanggung jawab di dalam
                            organisasi kami.
                        </p>
                    </motion.div>

                    {/* GRID DIVISI */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {divisi.length > 0 ? (
                            divisi.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="relative group overflow-hidden rounded-3xl shadow-lg"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Link href={`/divisi/${item.slug}`}>
                                        <div className="relative h-[420px] cursor-pointer">
                                            {/* Background Image */}
                                            {item.image ? (
                                                <motion.img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                                    <Building2
                                                        size={60}
                                                        className="text-white"
                                                    />
                                                </div>
                                            )}

                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

                                            {/* Text Overlay */}
                                            <div className="absolute bottom-0 left-0 p-8 text-left text-white z-10 transition-all duration-500 group-hover:translate-y-[-4px]">
                                                <h3 className="text-2xl font-bold mb-3">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-200 text-sm line-clamp-3">
                                                    {item.deskripsi ||
                                                        "Belum ada deskripsi untuk divisi ini."}
                                                </p>

                                                <div className="mt-4 inline-flex items-center text-sm font-medium text-gray-100 hover:text-white transition">
                                                    <span>Lihat Divisi</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                Tidak ada data divisi ditemukan.
                            </div>
                        )}
                    </div>
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
