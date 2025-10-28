import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Users, Award, Zap, TrendingUp } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

function SejarahContent() {
    const timelineData = [
        {
            year: "2015",
            title: "Berdirinya Organisasi",
            description: "Himpunan Mahasiswa didirikan oleh sekelompok mahasiswa yang memiliki visi untuk membangun wadah pengembangan potensi mahasiswa.",
            icon: <Users className="w-6 h-6" />
        },
        {
            year: "2017",
            title: "Ekspansi Program",
            description: "Meluncurkan berbagai program kerja yang berfokus pada pengembangan akademik, kepemimpinan, dan kewirausahaan mahasiswa.",
            icon: <TrendingUp className="w-6 h-6" />
        },
        {
            year: "2019",
            title: "Penghargaan Nasional",
            description: "Meraih penghargaan sebagai organisasi mahasiswa terbaik tingkat nasional atas kontribusi dalam pengembangan soft skills mahasiswa.",
            icon: <Award className="w-6 h-6" />
        },
        {
            year: "2021",
            title: "Transformasi Digital",
            description: "Mengadopsi teknologi digital dalam seluruh kegiatan organisasi dan meluncurkan platform online untuk memfasilitasi pembelajaran mahasiswa.",
            icon: <Zap className="w-6 h-6" />
        },
        {
            year: "2023",
            title: "Kolaborasi Internasional",
            description: "Menjalin kerjasama dengan organisasi mahasiswa dari berbagai negara untuk program pertukaran budaya dan kolaborasi proyek.",
            icon: <Users className="w-6 h-6" />
        },
        {
            year: "2025",
            title: "Era Inovasi",
            description: "Melanjutkan komitmen untuk terus berinovasi dan memberikan dampak positif bagi mahasiswa dan masyarakat luas.",
            icon: <TrendingUp className="w-6 h-6" />
        }
    ];

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
                            <BookOpen className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent pb-2 mb-2">
                            Sejarah Organisasi
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Perjalanan panjang kami dalam membangun wadah pengembangan mahasiswa
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

            {/* Introduction Section */}
            <section className="py-16 -mt-1 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 md:p-12 shadow-xl border border-gray-200 relative overflow-hidden group mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        
                        {/* Top Border Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Awal Mula Perjalanan
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="relative">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 to-transparent rounded-full"></div>
                                    <p className="text-gray-700 leading-relaxed text-lg pl-4">
                                        Himpunan Mahasiswa kami lahir dari semangat sekelompok mahasiswa yang memiliki 
                                        visi untuk menciptakan wadah pengembangan potensi mahasiswa. Berawal dari diskusi 
                                        kecil pada tahun 2015, kami berkomitmen untuk membangun organisasi yang tidak hanya 
                                        fokus pada akademik, tetapi juga pengembangan karakter dan kepemimpinan.
                                    </p>
                                </div>
                                
                                <div className="relative">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 to-transparent rounded-full"></div>
                                    <p className="text-gray-700 leading-relaxed text-lg pl-4">
                                        Seiring berjalannya waktu, kami terus berkembang dan berinovasi. Dari organisasi 
                                        dengan puluhan anggota, kini kami telah menjadi wadah bagi ratusan mahasiswa untuk 
                                        belajar, berkarya, dan berkontribusi. Setiap langkah perjalanan kami adalah bagian 
                                        dari komitmen untuk memberikan dampak positif.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline Section */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 rounded-full" style={{ top: '2rem', bottom: '2rem' }}></div>

                        <div className="space-y-8">
                            {timelineData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex flex-col md:flex-row gap-8 items-center ${
                                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 md:w-1/2">
                                        <motion.div
                                            className={`bg-gradient-to-br ${
                                                index % 2 === 0 
                                                    ? 'from-white to-gray-50' 
                                                    : 'from-gray-900 to-gray-800'
                                            } rounded-2xl p-8 shadow-xl border ${
                                                index % 2 === 0 
                                                    ? 'border-gray-200' 
                                                    : 'border-gray-700'
                                            } relative overflow-hidden group hover:shadow-2xl transition-all duration-300`}
                                            whileHover={{ y: -5 }}
                                        >
                                            {/* Background Glow */}
                                            <div className={`absolute top-0 right-0 w-32 h-32 ${
                                                index % 2 === 0 
                                                    ? 'bg-gradient-to-br from-gray-200/40' 
                                                    : 'bg-gradient-to-br from-gray-700/40'
                                            } to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                                            
                                            <div className="relative z-10">
                                                <div className={`flex items-center gap-3 mb-4 ${
                                                    index % 2 === 0 ? 'text-gray-900' : 'text-white'
                                                }`}>
                                                    <div className={`flex items-center justify-center w-12 h-12 ${
                                                        index % 2 === 0 
                                                            ? 'bg-gradient-to-br from-gray-700 to-gray-900' 
                                                            : 'bg-gradient-to-br from-gray-600 to-gray-400'
                                                    } rounded-xl shadow-lg`}>
                                                        <div className={index % 2 === 0 ? 'text-white' : 'text-gray-900'}>
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                                </div>
                                                <p className={`leading-relaxed ${
                                                    index % 2 === 0 ? 'text-gray-700' : 'text-gray-200'
                                                }`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Year Badge */}
                                    <div className="flex-shrink-0 relative z-20">
                                        <motion.div
                                            className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-50"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="text-center">
                                                <Calendar className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                                                <p className="text-white font-bold text-lg">{item.year}</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block flex-1 md:w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
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
        </div>
    );
}

export default function Sejarah() {
    return (
        <FrontendLayout>
            <Head title="Sejarah Organisasi" />
            <SejarahContent />
        </FrontendLayout>
    );
}