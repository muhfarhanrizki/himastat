import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Users, GitBranch, Award, ArrowRight } from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function StrukturOrganisasi() {
    const cards = [
        {
            title: "Badan Eksekutif",
            description: "Struktur kepengurusan dan divisi dalam organisasi kami",
            icon: Users,
            href: "/struktur-organisasi/badan-eksekutif",
            gradient: "from-blue-600 to-blue-800",
            bgGradient: "from-blue-700 to-blue-900",
        },
        {
            title: "Bagan Struktur",
            description: "Visualisasi hierarki dan alur organisasi secara menyeluruh",
            icon: GitBranch,
            href: "/struktur-organisasi/bagan-struktur",
            gradient: "from-gray-600 to-gray-800",
            bgGradient: "from-gray-700 to-gray-900",
        },
        {
            title: "Dewan",
            description: "Dewan pembina dan pengawas organisasi",
            icon: Award,
            href: "/struktur-organisasi/dewan",
            gradient: "from-purple-600 to-purple-800",
            bgGradient: "from-purple-700 to-purple-900",
        },
    ];

    return (
        <FrontendLayout>
            <Head title="Struktur Organisasi" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-36 pb-16 md:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
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
                            <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-4">
                            Struktur Organisasi
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                            Mengenal susunan kepengurusan dan pembagian dalam organisasi kami
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CARDS SECTION */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {cards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Link href={card.href}>
                                        <div className="group relative h-full bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 cursor-pointer">
                                            {/* Background Gradient on Hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                            
                                            {/* Content */}
                                            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col h-full">
                                                {/* Icon */}
                                                <div className="mb-6">
                                                    <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${card.gradient} rounded-xl md:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-500">
                                                    {card.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow group-hover:text-gray-200 transition-colors duration-500">
                                                    {card.description}
                                                </p>

                                                {/* Arrow Button */}
                                                <div className="inline-flex items-center text-sm md:text-base font-semibold text-gray-700 group-hover:text-white transition-colors duration-500">
                                                    <span>Lihat Detail</span>
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                                                </div>
                                            </div>

                                            {/* Decorative Corner */}
                                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-300 rounded-br-2xl md:rounded-br-3xl opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}