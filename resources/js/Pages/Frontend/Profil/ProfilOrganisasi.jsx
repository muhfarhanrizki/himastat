import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Users, Target, Award, Sparkles } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

function ProfilContent({ visimisi }) {
    const mainVisiMisi = visimisi?.[0] || {};

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-36 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-700 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-2xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Users className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent pb-2 mb-2">
                            Profil Organisasi
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Mengenal lebih dekat dengan organisasi kami
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
                    </svg>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 -mt-1 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 space-y-8">
                    {/* Tentang Kami Card - Full Width */}
                    <motion.div
                        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 md:p-12 shadow-xl border border-gray-200 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ y: -5 }}
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-200/30 to-transparent rounded-full blur-3xl"></div>
                        
                        {/* Top Border Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t-3xl"></div>

                        <div className="relative z-10">
                            {/* Icon & Title */}
                            <div className="flex items-center justify-center gap-6 mb-8">
                                <motion.div>
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-lg">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                </motion.div>
                                
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                    Tentang Kami
                                </h2>
                            </div>

                            {/* Content */}
                            <div className="text-center ">
                                <div className="relative">
                                    <p className="text-gray-700 leading-relaxed text-lg px-18">
                                        Himpunan Mahasiswa kami adalah organisasi yang berdedikasi untuk mengembangkan 
                                        potensi mahasiswa melalui berbagai kegiatan akademik dan non-akademik. Kami percaya 
                                        bahwa setiap mahasiswa memiliki talenta unik yang dapat dikembangkan untuk mencapai 
                                        kesuksesan.
                                    </p>
                                </div>
                
                            </div>

                            {/* Decorative Elements */}
                            <div className="mt-8 flex justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Corner Decoration */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-gray-300 rounded-br-3xl opacity-50"></div>
                    </motion.div>

                    {/* Visi & Misi Cards - 2 Columns */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Visi Card */}
                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-xl border border-gray-200 relative overflow-hidden group"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            {/* Background Glow Effect */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Top Border Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t-3xl"></div>

                            <div className="relative z-10">
                                {/* Icon & Title */}
                                <motion.div
                                    className="flex items-center gap-4 mb-6"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div>
                                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-lg">
                                            <Target className="w-8 h-8 text-white" />
                                        </div>
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-gray-900">Visi</h3>
                                </motion.div>
                                
                                <div className="relative">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 to-transparent rounded-full"></div>
                                    {mainVisiMisi.visi ? (
                                        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg pl-4">
                                            {mainVisiMisi.visi}
                                        </p>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed text-lg pl-4">
                                            Menjadi wadah yang inspiratif dan inovatif dalam membentuk mahasiswa yang unggul, 
                                            berkarakter, dan berkontribusi positif bagi masyarakat dan bangsa.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-300 rounded-br-3xl opacity-50"></div>
                        </motion.div>

                        {/* Misi Card */}
                        <motion.div
                            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 shadow-xl text-white relative overflow-hidden group"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            {/* Background Glow Effect */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-700/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Top Border Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-300 rounded-t-3xl"></div>

                            <div className="relative z-10">
                                {/* Icon & Title */}
                                <motion.div
                                    className="flex items-center gap-4 mb-6"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div>
                                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-400 rounded-2xl shadow-lg">
                                            <Award className="w-8 h-8 text-gray-900" />
                                        </div>
                                    </motion.div>
                                    <h3 className="text-3xl font-bold">Misi</h3>
                                </motion.div>
                                
                                <div className="relative">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-400 to-transparent rounded-full"></div>
                                    {mainVisiMisi.misi ? (
                                        <p className="text-gray-200 whitespace-pre-line leading-relaxed text-lg pl-4">
                                            {mainVisiMisi.misi}
                                        </p>
                                    ) : (
                                        <ul className="space-y-3 pl-4">
                                            {[
                                                "Mengembangkan potensi akademik dan non-akademik mahasiswa",
                                                "Membangun karakter kepemimpinan yang berintegritas",
                                                "Menciptakan lingkungan belajar yang kolaboratif",
                                                "Menjalin kerjasama dengan berbagai pihak"
                                            ].map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <span className="text-gray-400 font-bold text-xl mt-0.5">•</span>
                                                    <span className="text-gray-200 text-lg">{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-700 rounded-br-3xl opacity-50"></div>
                        </motion.div>
                    </div>

                    {/* Bottom Decoration */}
                    <motion.div
                        className="mt-8 flex justify-center"
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
        </div>
    );
}

export default function Profil({ visimisi }) {
    return (
        <FrontendLayout>
            <Head title="Profil Organisasi" />
            <ProfilContent visimisi={visimisi} />
        </FrontendLayout>
    );
}