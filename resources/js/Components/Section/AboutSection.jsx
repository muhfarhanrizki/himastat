import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function AboutSection() {
    return (
        <section
            id="tentang"
            className="py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/3 left-10 w-64 h-64 bg-gray-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-gray-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Tentang Himastat
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">
                        Mengenal lebih dekat siapa Himastat dan apa tujuan organisasi kami
                    </p>
                </motion.div>

                {/* Content Card */}
                <motion.div
                    className="relative group max-w-6xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ y: -10 }}
                >
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-xl border border-gray-200 relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                        {/* Icon */}
                        <div className="flex justify-center mb-8 relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-lg">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 text-center">
                            <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
                                Kami adalah organisasi yang berfokus pada pengembangan potensi, kreativitas,
                                dan solidaritas mahasiswa dalam bidang teknologi serta sosial. Melalui berbagai
                                kegiatan, pelatihan, dan proyek kolaboratif, kami berupaya menciptakan generasi
                                muda yang inovatif, berdaya saing, dan berkarakter.
                                <br />
                                <br />
                                Dengan semangat kolaborasi dan rasa kekeluargaan, kami percaya bahwa setiap
                                individu mampu membawa perubahan positif. Bersama, kita tumbuh, belajar, dan
                                menciptakan karya yang berdampak nyata bagi masyarakat.
                            </p>
                        </div>

                        {/* Corner Decoration */}
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-300 rounded-br-3xl opacity-50"></div>
                    </div>
                </motion.div>

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
