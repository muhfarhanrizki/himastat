import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function JumbotronSection({ data }) {
    return (
        <section
            id="beranda"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image or Gradient */}
            {data.image ? (
                <>
                    <img
                        src={`/storage/${data.image}`}
                        alt="Jumbotron"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/75 to-gray-900/80"></div>
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700"></div>
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-gray-900/30 z-[6]"></div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center text-white px-6 max-w-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="flex justify-center items-center mt-12">
                    <img src="/favicon.svg" alt="Logo" className="h-48 w-48" />
                </div>

                <motion.h1
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-white bg-clip-text text-transparent drop-shadow-2xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {data.title || "Selamat Datang di Himpunan Mahasiswa Statistika"}
                </motion.h1>

                <motion.p
                    className="text-md md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {data.description ||
                        "Tempat berbagi semangat, karya, dan kolaborasi!"}
                </motion.p>

                <motion.a
                    href="#profil"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-full font-semibold hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-xl border border-gray-600/50 group"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Pelajari Lebih Lanjut
                    <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 flex justify-center items-center transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1 relative">
                    <motion.div
                        className="w-1.5 h-2 bg-gray-400 rounded-full mx-auto absolute left-1/2 transform -translate-x-1/2"
                        animate={{
                            y: [0, 15, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
}