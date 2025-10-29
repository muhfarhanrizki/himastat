import React, { useRef, useState } from "react";
import { Quote, ArrowRight, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function AlumniSection({ data }) {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    if (!data?.length) return null;

    // Batasi hanya 4 alumni untuk ditampilkan di section
    const visibleAlumni = data.slice(0, 8);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 320; // Lebar card (288px) + gap (32px)
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
        <section
            id="alumni"
            className="pt-24 pb-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/3 left-10 w-64 h-64 bg-gray-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-gray-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Jejak Alumni
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Cerita inspiratif dari para alumni yang telah meraih kesuksesan
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Left Arrow */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={24} className="text-gray-800" />
                        </button>
                    )}

                    {/* Right Arrow */}
                    {showRightArrow && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={24} className="text-gray-800" />
                        </button>
                    )}

                    {/* Alumni Cards Carousel */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 hide-scrollbar scroll-smooth"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {visibleAlumni.map((item, index) => (
                            <div
                                key={item.id}
                                className="group/card flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-500 overflow-hidden"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Card Header with Gradient */}
                                <div className="relative h-32 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <Quote
                                        size={80}
                                        className="absolute -right-4 -top-4 text-white/10 transform rotate-12"
                                    />
                                </div>

                                {/* Avatar */}
                                <div className="relative -mt-16 mb-4 px-8">
                                    <div className="relative inline-block">
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.nama}
                                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-gray-100"
                                            />
                                        ) : (
                                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white border-4 border-white shadow-xl ring-4 ring-gray-100">
                                                <GraduationCap size={40} />
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="px-8 pb-8 text-center">
                                    {/* Nama Alumni */}
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                                        {item.nama}
                                    </h4>

                                    {/* Angkatan */}
                                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full mb-4">
                                        <GraduationCap size={14} className="text-gray-600" />
                                        <span className="text-gray-600 text-xs font-medium">
                                            Angkatan {item.angkatan}
                                        </span>
                                    </div>

                                    {/* Pesan */}
                                    <p className="text-gray-600 italic leading-relaxed text-sm line-clamp-4 min-h-[80px]">
                                        "{item.pesan}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* "Lihat Semua Alumni" Button */}
                <div className="text-center mt-8">
                    <Link
                        href="/jejak-alumni"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    >
                        Lihat Semua Alumni
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}