import React from "react";
import { motion } from "framer-motion";
import { Target, Award } from "lucide-react";

export default function VisiMisiSection({ data }) {
    if (!data.visi) return null;

    return (
        <section id="profil" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-gray-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gray-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Visi & Misi
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-base md:text-lg">
                        Arah dan tujuan organisasi kami
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Visi Card */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ y: -10 }}
                    >
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-200 relative overflow-hidden h-full">
                            {/* Background Glow Effect */}
                            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Top Border Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t-2xl md:rounded-t-3xl"></div>

                            {/* Icon */}
                            <motion.div
                                className="mb-4 md:mb-6 relative z-10"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl md:rounded-2xl shadow-lg">
                                    <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 relative z-10">
                                Visi
                            </h3>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-gray-600 to-transparent rounded-full"></div>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base md:text-lg pl-3 md:pl-4">
                                    {data.visi}
                                </p>
                            </div>

                            {/* Corner Decoration - Hidden on mobile */}
                            <div className="hidden md:block absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-300 rounded-br-3xl opacity-50"></div>
                        </div>
                    </motion.div>

                    {/* Misi Card */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ y: -10 }}
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden h-full">
                            {/* Background Glow Effect */}
                            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-gray-700/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Top Border Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-300 rounded-t-2xl md:rounded-t-3xl"></div>

                            {/* Icon */}
                            <motion.div
                                className="mb-4 md:mb-6 relative z-10"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl md:rounded-2xl shadow-lg">
                                    <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-900" />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 relative z-10">
                                Misi
                            </h3>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-gray-400 to-transparent rounded-full"></div>
                                <p className="text-gray-200 whitespace-pre-line leading-relaxed text-sm sm:text-base md:text-lg pl-3 md:pl-4">
                                    {data.misi}
                                </p>
                            </div>

                            {/* Corner Decoration - Hidden on mobile */}
                            <div className="hidden md:block absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-700 rounded-br-3xl opacity-50"></div>
                        </div>
                    </motion.div>
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
    );
}