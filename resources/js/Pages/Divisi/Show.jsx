import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Users,
    Briefcase,
    UserCheck,
    Phone,
    Calendar,
    ArrowLeft,
    Mail,
} from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function Show({ divisi }) {
    return (
        <FrontendLayout>
            <Head title={`${divisi.name} - Himastat`} />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section dengan Image */}
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
                                            {divisi.name}
                                        </h1>
                                        <div className="flex justify-center items-center gap-6 text-white/90 pt-4">
                                            <div className="flex items-center gap-2">
                                                <UserCheck size={24} />
                                                <span className="text-xl font-medium">
                                                    {divisi.anggota?.length || 0}{" "}
                                                    Anggota
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={24} />
                                                <span className="text-xl font-medium">
                                                    {divisi.proker?.length || 0} Program
                                                    Kerja
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                <div className="max-w-6xl mx-auto px-6 pt-16">
                    {divisi.image ? (
                        <img
                            src={`/storage/${divisi.image}`}
                            alt={divisi.name}
                            className="w-full h-full object-cover rounded-3xl shadow-xl"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                            <Users
                                size={120}
                                className="text-white opacity-30"
                            />
                        </div>
                    )}               
                </div>      

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-6 py-16">
                    {/* Deskripsi Section */}
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Tentang {divisi.name}
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                {divisi.deskripsi}
                            </p>
                        </div>
                    </motion.section>

                    {/* Program Kerja Section */}
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-10 mt-10">
                            <Briefcase size={32} className="text-gray-800" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Program Kerja
                            </h2>
                            <span className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                                {divisi.proker?.length || 0}
                            </span>
                        </div>

                        {divisi.proker && divisi.proker.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {divisi.proker.map((proker, index) => (
                                    <motion.div
                                        key={proker.id}
                                        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{ y: -8 }}
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            {proker.image ? (
                                                <img
                                                    src={`/storage/${proker.image}`}
                                                    alt={proker.nama}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                                                    <Briefcase
                                                        size={50}
                                                        className="text-white/30"
                                                    />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="bg-white p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                {proker.nama}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {proker.deskripsi}
                                            </p>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Calendar size={16} />
                                                <span className="text-sm font-medium">
                                                    {proker.tanggal}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                                <Briefcase
                                    size={64}
                                    className="mx-auto text-gray-300 mb-4"
                                />
                                <p className="text-gray-500 text-lg">
                                    Belum ada program kerja yang tersedia
                                </p>
                            </div>
                        )}
                    </motion.section>

                    {/* Anggota Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-10 mt-10">
                            <Users size={32} className="text-gray-800" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Anggota Divisi
                            </h2>
                            <span className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                                {divisi.anggota?.length || 0}
                            </span>
                        </div>

                        {divisi.anggota && divisi.anggota.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {divisi.anggota.map((anggota, index) => (
                                    <motion.div
                                        key={anggota.id}
                                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.05,
                                        }}
                                    >
                                        {/* Avatar Placeholder or Image */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xl font-bold">
                                                    {anggota.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                                                    {anggota.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {anggota.jabatan ||
                                                        "Anggota"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-2 border-t border-gray-100 pt-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Phone
                                                    size={16}
                                                    className="text-gray-500 flex-shrink-0"
                                                />
                                                <span className="truncate">
                                                    {anggota.kontak || "-"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar
                                                    size={16}
                                                    className="text-gray-500 flex-shrink-0"
                                                />
                                                <span>
                                                    Angkatan{" "}
                                                    {anggota.angkatan || "-"}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                                <Users
                                    size={64}
                                    className="mx-auto text-gray-300 mb-4"
                                />
                                <p className="text-gray-500 text-lg">
                                    Belum ada anggota yang terdaftar
                                </p>
                            </div>
                        )}
                    </motion.section>
                </div>
            </div>
        </FrontendLayout>
    );
}
