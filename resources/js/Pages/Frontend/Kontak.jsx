import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { 
    Phone, 
    Mail, 
    MapPin, 
    Building,
    Clock,
    MessageSquare
} from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

function KontakContent({ contact }) {
    const mainContact = contact?.[0] || {};

    // Lokasi sekretariat - sesuaikan dengan lokasi Anda
    const secretariatLocation = {
        address: "Gedung Fakultas MIPA, Universitas Indonesia",
        fullAddress: "Kampus UI Depok, Jawa Barat 16424",
        operationalHours: [
            { day: "Senin - Jumat", time: "09.00 - 17.00 WIB" },
            { day: "Sabtu", time: "09.00 - 14.00 WIB" },
            { day: "Minggu", time: "Tutup" }
        ],
        // Ganti dengan koordinat dan embed URL lokasi Anda
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.822673977686!2d119.48601289999999!3d-5.132242499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefb8c3aa414f7%3A0x59585e28c7ee3ebc!2sFakultas%20Matematika%20dan%20Ilmu%20Pengetahuan%20Alam%20UNHAS!5e0!3m2!1sid!2sid!4v1761414022218!5m2!1sid!2sid"
    };

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
                            <Mail className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent pb-2 mb-6">
                            Hubungi Kami
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Jangan ragu untuk menghubungi kami. Kami siap membantu Anda!
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

            {/* Contact Cards Section */}
            <section className="py-16 -mt-1 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Top 3 Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Contact Person Card */}
                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 relative overflow-hidden group hover:-translate-y-3 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Icon */}
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-lg relative z-10"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Phone className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Contact Person
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                        <a 
                                            href={`tel:${mainContact.phone || '+6281234567890'}`}
                                            className="hover:text-gray-900 transition-colors font-medium"
                                        >
                                            {mainContact.phone || "+62 812-3456-7890"}
                                        </a>
                                    </div>
                                    <p className="text-gray-600 text-sm pl-5">
                                        Hubungi kami untuk informasi lebih lanjut
                                    </p>
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-300 rounded-br-3xl opacity-50"></div>
                        </motion.div>

                        {/* Lokasi Sekretariat Card */}
                        <motion.div
                            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group hover:-translate-y-3 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-700/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Icon */}
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-400 rounded-2xl mb-6 shadow-lg relative z-10"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Building className="w-8 h-8 text-gray-900" />
                            </motion.div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">
                                    Lokasi Sekretariat
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium mb-1">{secretariatLocation.address}</p>
                                            <p className="text-gray-400 text-sm">{secretariatLocation.fullAddress}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium mb-2">Jam Operasional</p>
                                            {secretariatLocation.operationalHours.map((schedule, index) => (
                                                <p key={index} className="text-gray-400 text-sm">
                                                    {schedule.day}: {schedule.time}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-700 rounded-br-3xl opacity-50"></div>
                        </motion.div>

                        {/* Have Any Question Card */}
                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 relative overflow-hidden group hover:-translate-y-3 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* Icon */}
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-lg relative z-10"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <MessageSquare className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Have Any Question?
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Mail className="w-5 h-5 text-gray-600" />
                                        <a 
                                            href={`mailto:${mainContact.email || 'hima@university.ac.id'}`}
                                            className="hover:text-gray-900 transition-colors font-medium break-all"
                                        >
                                            {mainContact.email || "hima@university.ac.id"}
                                        </a>
                                    </div>
                                    <p className="text-gray-600 text-sm pl-8">
                                        Kirimkan pertanyaan Anda via email
                                    </p>
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-300 rounded-br-3xl opacity-50"></div>
                        </motion.div>
                    </div>

                    {/* Google Maps Card - Full Width Below */}
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {/* Maps Header */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl">
                                    <MapPin className="w-6 h-6 text-gray-900" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Peta Lokasi</h3>
                                    <p className="text-gray-400">Temukan kami di peta</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="relative">
                            <iframe
                                src={secretariatLocation.mapEmbedUrl}
                                width="100%"
                                height="500"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                                title="Lokasi Sekretariat"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default function Kontak({ contact }) {
    return (
        <FrontendLayout>
            <Head title="Kontak" />
            <KontakContent contact={contact} />
        </FrontendLayout>
    );
}