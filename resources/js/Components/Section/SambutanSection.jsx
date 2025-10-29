import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function SambutanSection({ data }) {
    if (!data.nama) return null;

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden" id="sambutan">
            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Image Section */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative group">
                            {/* Decorative Background */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                            
                            {data.image ? (
                                <motion.img
                                    src={`/storage/${data.image}`}
                                    alt={data.nama}
                                    className="relative rounded-2xl md:rounded-3xl shadow-2xl object-cover w-full h-[300px] sm:h-[350px] md:h-[450px] ring-2 md:ring-4 ring-gray-700/50 group-hover:ring-gray-600/70 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ) : (
                                <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl md:rounded-3xl ring-2 md:ring-4 ring-gray-700/50"></div>
                            )}

                            {/* Corner Accent - Hidden on mobile */}
                            <div className="hidden md:block absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-gray-600 rounded-tl-3xl"></div>
                            <div className="hidden md:block absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-gray-600 rounded-br-3xl"></div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        className="text-white"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Quote Icon */}
                        <motion.div
                            className="mb-4 md:mb-6"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Quote className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4 md:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Sambutan Ketua
                        </motion.h2>

                        {/* Name & Position */}
                        <motion.div
                            className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-100 mb-1 md:mb-2">
                                {data.nama}
                            </h3>
                            <p className="text-gray-400 text-base md:text-lg font-medium italic">
                                {data.jabatan}
                            </p>
                        </motion.div>

                        {/* Message */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {/* Decorative Line */}
                            <div className="absolute -left-3 md:-left-4 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-gray-600 to-transparent rounded-full"></div>
                            
                            <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line pl-3 md:pl-4">
                                {data.sambutan}
                            </p>
                        </motion.div>

                        {/* Signature Style Element */}
                        <motion.div
                            className="mt-6 md:mt-8 flex items-center gap-2 md:gap-3"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="h-px bg-gradient-to-r from-gray-600 to-transparent w-16 md:w-20"></div>
                            <div className="text-gray-500 text-xs md:text-sm font-medium">
                                Salam Hangat
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}