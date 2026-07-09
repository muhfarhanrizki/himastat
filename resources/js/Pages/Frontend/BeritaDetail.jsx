import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, BookOpen, Home, ChevronRight } from "lucide-react";
import { route } from "ziggy-js";
import FrontendLayout from "@/Layouts/FrontendLayout";

function BeritaDetailContent({ berita, recommendedNews }) {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
        <section className="relative h-[428px] overflow-hidden">

            {/* Background */}
            {berita.gambar ? (
                <>
                    <img
                        src={`/storage/${berita.gambar}`}
                        alt={berita.judul}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay gelap */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/85 to-gray-900/95"></div>
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-gray-900/70 z-[1]"></div>

            <div className="relative z-10 flex items-end h-full">
                <div className="max-w-7xl mx-auto w-full px-6 pb-8">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <Link
                            href={route("berita")}
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>

            {/* Content Section */}
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-2">
                            {/* Breadcrumb */}
                            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray mb-5">
                                <Link
                                    href={route("beranda")}
                                    className="flex items-center gap-1 hover:text-gray-500 transition"
                                >
                                    <Home className="w-4 h-4" />
                                    Beranda
                                </Link>

                                <ChevronRight className="w-4 h-4 text-gray-600" />

                                <Link
                                    href={route("berita")}
                                    className="hover:text-gray-500 transition"
                                >
                                    Berita
                                </Link>

                                <ChevronRight className="w-4 h-4 text-gray-600" />

                                <span className="text-gray font-medium truncate max-w-xs md:max-w-md">
                                    {berita.judul}
                                </span>
                            </nav>
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >

                                {/* Gambar */}
                                {berita.gambar ? (
                                    <img
                                        src={`/storage/${berita.gambar}`}
                                        alt={berita.judul}
                                        className="w-full h-72 md:h-[450px] object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-72 md:h-[450px] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                        <BookOpen className="w-16 h-16 text-gray-500" />
                                    </div>
                                )}

                                {/* Isi */}
                                <div className="p-8 md:p-10">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-black mb-4">
                                            {berita.judul}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b pb-5 mb-8">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{berita.penulis}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(berita.tanggal)}</span>
                                        </div>

                                    </div>

                                    <div
                                        className="
                                            text-gray-700
                                            leading-9
                                            text-justify
                                            whitespace-pre-line
                                            text-[17px]
                                        "
                                    >
                                        {berita.konten}
                                    </div>

                                </div>

                            </motion.article>

                        </div>

                        <aside className="lg:col-span-1">

                            <div className="sticky top-28 mt-10">

                                <div className="bg-white rounded-2xl shadow-lg p-6">

                                    <h3 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">
                                        Berita Lainnya
                                    </h3>

                                    <div className="space-y-5">

                                        {recommendedNews.map((item) => (

                                            <Link
                                                key={item.id}
                                                href={route("berita.show", item.id)}
                                                className="group block"
                                            >
                                                <div className="flex gap-4">

                                                    <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">

                                                        {item.gambar ? (

                                                            <img
                                                                src={`/storage/${item.gambar}`}
                                                                alt={item.judul}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                                            />

                                                        ) : (

                                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                <BookOpen className="w-6 h-6 text-gray-500" />
                                                            </div>

                                                        )}

                                                    </div>

                                                    <div className="flex flex-col justify-between">

                                                        <h4 className="font-semibold text-gray-800 leading-snug line-clamp-1 group-hover:text-blue-600 transition">
                                                            {item.judul}
                                                        </h4>

                                                        <h4 className="font-normal text-gray-400 leading-snug line-clamp-2 group-hover:text-blue-600 transition text-xs">
                                                            {item.konten ? item.konten : "Tidak ada deskripsi"}
                                                        </h4>

                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(item.tanggal)}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="border-b mt-5"></div>

                                            </Link>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default function BeritaDetail({ berita, recommendedNews }) {
    return (
        <FrontendLayout>
            <Head title={berita.judul} />
            <BeritaDetailContent berita={berita} recommendedNews={recommendedNews} />
        </FrontendLayout>
    );
}