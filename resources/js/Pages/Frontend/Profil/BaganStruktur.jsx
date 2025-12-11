import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { GitBranch, Download } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function BaganStruktur({ bagan }) {
    return (
        <FrontendLayout>
            <Head title="Bagan Struktur" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
                {/* HERO SECTION */}
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
                                <GitBranch className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-4">
                                Bagan Struktur
                            </h1>
                            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                                Visualisasi hierarki dan alur organisasi secara
                                menyeluruh
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* CONTENT SECTION */}
                <section className="py-16 -mt-1 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        {bagan ? (
                            <motion.div
                                className=" relative overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Content */}
                                <div className="relative z-10 p-6 sm:p-8 md:p-10">
                                    {bagan.image && (
                                        <motion.div
                                            className="relative group"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.2,
                                            }}
                                        >
                                            {/* Image Container */}
                                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                                                <img
                                                    src={`/storage/${bagan.image}`}
                                                    alt={bagan.title}
                                                    className="w-full h-auto object-contain bg-white"
                                                />

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>

                                            {/* Download Button */}
                                            <motion.a
                                                href={`/storage/${bagan.image}`}
                                                download
                                                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg font-semibold shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Download className="w-4 h-4" />
                                                <span className="text-sm">
                                                    Download
                                                </span>
                                            </motion.a>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-center py-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <GitBranch className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    Belum Ada Bagan Struktur
                                </h3>
                                <p className="text-gray-600">
                                    Bagan struktur organisasi akan segera
                                    ditambahkan
                                </p>
                            </motion.div>
                        )}

                        {/* Title & Description */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {bagan.title}
                            </h2>

                            {bagan.description && (
                                <div className="relative max-w-3xl mx-auto">
                                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed pl-3 md:pl-4">
                                        {bagan.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Bottom Decoration */}
                        <motion.div
                            className="mt-12 md:mt-16 flex justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-12 md:w-16 h-0.5 bg-gray-400"></div>
                                <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                                <div className="w-12 md:w-16 h-0.5 bg-gray-400"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </FrontendLayout>
    );
}
