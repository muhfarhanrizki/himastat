import React from "react";
import { Quote, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function AlumniSection({ data }) {
    if (!data?.length) return null;

    // Batasi hanya 4 alumni untuk ditampilkan di section
    const visibleAlumni = data.slice(0, 4);

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

            <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                {/* Title */}
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Jejak Alumni
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full mb-8"></div>
                <p className="text-gray-600 text-lg mb-14">
                    Cerita inspiratif dari para alumni
                </p>

                {/* Horizontal Alumni Cards */}
                <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
                    {visibleAlumni.map((item) => (
                        <div
                            key={item.id}
                            className="group flex-shrink-0 w-72 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center snap-center"
                        >
                            <div className="mb-5 relative">
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.nama}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md mx-auto"
                                />
                                <Quote
                                    size={28}
                                    className="absolute -top-3 -right-3 text-gray-300 opacity-70"
                                />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-1">
                                {item.nama}
                            </h4>
                            <p className="text-gray-500 text-sm mb-4">
                                Angkatan {item.angkatan}
                            </p>
                            <p className="text-gray-700 italic leading-relaxed text-sm line-clamp-4">
                                “{item.pesan}”
                            </p>
                        </div>
                    ))}
                </div>

                {/* "Lihat Semua Alumni" Button */}
                <div className="mt-14">
                    <Link
                        href="/alumni"
                        className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all duration-300"
                    >
                        Lihat Semua Alumni
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
