import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Users } from "lucide-react";

export default function DivisiSection({ data }) {
    if (!data?.length) return null;

    return (
        <section
            id="divisi"
            className="py-18 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-gray-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gray-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Title Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Divisi Kami
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">
                        Kenali divisi-divisi yang ada di Himastat
                    </p>
                </motion.div>

                {/* Grid Card */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.map((item, index) => (
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
                                            <Users
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
                                            {item.deskripsi}
                                        </p>

                                        {/* "Lihat Detail" Button Style */}
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
                    ))}
                </div>

                {/* Bottom Decoration */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-16 h-0.5 bg-gray-400"></div>
                        <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                        <div className="w-16 h-0.5 bg-gray-400"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
