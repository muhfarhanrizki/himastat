import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Image,
    Users,
    Calendar,
    MapPin,
    Briefcase,
    Activity,
    MessageSquare,
    ArrowRight,
} from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function Dashboard({ stats = {}, latest = {}, auth }) {
    const [timeOfDay, setTimeOfDay] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay("Selamat pagi");
        else if (hour < 18) setTimeOfDay("Selamat sore");
        else setTimeOfDay("Selamat malam");
    }, []);

    const cards = [
        {
            name: "Galeri",
            value: stats.galeri,
            icon: <Image className="w-6 h-6" />,
            route: "/galeri",
        },
        {
            name: "Divisi",
            value: stats.divisi,
            icon: <Users className="w-6 h-6" />,
            route: "/divisi",
        },
        {
            name: "Proker",
            value: stats.proker,
            icon: <Briefcase className="w-6 h-6" />,
            route: "/proker",
        },
        {
            name: "Jejak Alumni",
            value: stats.alumniPath,
            icon: <MapPin className="w-6 h-6" />,
            route: "/alumniPath",
        },
    ];

    // Format waktu relatif
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "Baru saja";
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        if (diffHours < 24) return `${diffHours} jam yang lalu`;
        if (diffDays === 1) return "Kemarin";
        if (diffDays < 7) return `${diffDays} hari yang lalu`;
        return past.toLocaleDateString("id-ID");
    };

    // Gabungkan semua aktivitas
    const recentActivities = [
        ...(latest.galeri?.map((g) => ({
            id: `galeri-${g.id}`,
            type: "galeri",
            title: "Galeri Baru Ditambahkan",
            description: g.name,
            created_at: g.created_at,
        })) || []),
        ...(latest.proker?.map((p) => ({
            id: `proker-${p.id}`,
            type: "proker",
            title: "Program Kerja Baru",
            description: `${p.nama} - ${p.divisi?.name || "Divisi"}`,
            created_at: p.created_at,
        })) || []),
        ...(latest.alumniPath?.map((a) => ({
            id: `alumni-${a.id}`,
            type: "alumni",
            title: "Alumni Terdaftar",
            description: `${a.nama} (Angkatan ${a.angkatan})`,
            created_at: a.created_at,
        })) || []),
    ]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="max-w-full mx-auto py-8 px-4 space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl p-8 shadow-lg"
                >
                    <h1 className="text-3xl font-bold">
                        {timeOfDay}, {auth?.user?.name || "Admin"} 👋
                    </h1>
                    <p className="text-gray-300 mt-2">
                        Selamat datang kembali! Berikut ringkasan sistem hari
                        ini.
                    </p>
                </motion.div>

                {/* Statistik Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={card.route}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 flex flex-col items-center text-center border border-gray-100"
                            >
                                <div className="p-4 rounded-xl text-white bg-gray-700 mb-4">
                                    {card.icon}
                                </div>
                                <div className="text-4xl font-bold text-gray-800">
                                    <CountUp
                                        end={card.value || 0}
                                        duration={1.5}
                                    />
                                </div>
                                <div className="text-gray-600 mt-2 font-medium">
                                    {card.name}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Galeri & Divisi */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Galeri Terbaru */}
                    <motion.div
                        className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                <Image className="w-6 h-6 text-gray-700" />
                                Galeri Terbaru
                            </h2>
                            <Link
                                href="/galeri"
                                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
                            >
                                Lihat semua <ArrowRight size={16} />
                            </Link>
                        </div>
                        {latest?.galeri?.length ? (
                            <div className="grid grid-cols-3 gap-4">
                                {latest.galeri.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative group overflow-hidden rounded-xl shadow-sm border border-gray-100"
                                    >
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-3 transition-opacity">
                                            <p className="text-white text-xs font-medium line-clamp-2">
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Image
                                    size={40}
                                    className="mx-auto text-gray-300 mb-2"
                                />
                                <p className="text-gray-400 text-sm">
                                    Belum ada galeri
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Daftar Divisi */}
                    <motion.div
                        className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                <Users className="w-6 h-6 text-gray-700" />
                                Daftar Divisi
                            </h2>
                            <Link
                                href="/divisi"
                                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
                            >
                                Lihat semua <ArrowRight size={16} />
                            </Link>
                        </div>
                        {latest?.divisi?.length ? (
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {latest.divisi.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/divisi/${item.slug}`}
                                        className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                                    >
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.name}
                                                className="w-14 h-14 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                                                <Users
                                                    size={24}
                                                    className="text-white"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 group-hover:text-gray-900 truncate">
                                                {item.name}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                <span>
                                                    {item.proker_count || 0}{" "}
                                                    Proker
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    {item.anggota_count || 0}{" "}
                                                    Anggota
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight
                                            size={18}
                                            className="text-gray-400 group-hover:text-gray-700 transition"
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Users
                                    size={40}
                                    className="mx-auto text-gray-300 mb-2"
                                />
                                <p className="text-gray-400 text-sm">
                                    Belum ada divisi
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Proker & Aktivitas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Proker Terbaru */}
                    <motion.div
                        className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-gray-700" />
                                Program Kerja Terbaru
                            </h2>
                            <Link
                                href="/proker"
                                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
                            >
                                Lihat semua <ArrowRight size={16} />
                            </Link>
                        </div>
                        {latest?.proker?.length ? (
                            <div className="flex flex-col gap-3">
                                {latest.proker.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/divisi/${
                                            item.divisi?.slug || "#"
                                        }`}
                                    >
                                        <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h3 className="font-semibold text-gray-800 line-clamp-1">
                                                    {item.nama}
                                                </h3>
                                                <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full whitespace-nowrap">
                                                    {item.divisi?.name ||
                                                        "Divisi"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                {item.description ||
                                                    "Tidak ada deskripsi"}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar size={14} />
                                                <span>{item.tanggal}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Briefcase
                                    size={40}
                                    className="mx-auto text-gray-300 mb-2"
                                />
                                <p className="text-gray-400 text-sm">
                                    Belum ada program kerja
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Aktivitas Terbaru */}
                    <motion.div
                        className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                            <Activity className="w-6 h-6 text-gray-700" />
                            Aktivitas Terbaru
                        </h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {recentActivities.length ? (
                                recentActivities.map((act) => (
                                    <div
                                        key={act.id}
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="w-2 h-2 bg-gray-700 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-800 font-medium text-sm">
                                                {act.title}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                {act.description}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {formatTimeAgo(act.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Activity
                                        size={40}
                                        className="mx-auto text-gray-300 mb-2"
                                    />
                                    <p className="text-gray-400 text-sm">
                                        Belum ada aktivitas
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Jejak Alumni */}
                <motion.div
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-gray-700" />
                            Jejak Alumni
                        </h2>
                        <Link
                            href="/alumniPath"
                            className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
                        >
                            Lihat semua <ArrowRight size={16} />
                        </Link>
                    </div>
                    {latest?.alumniPath?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {latest.alumniPath.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-gray-100 rounded-2xl p-5 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.nama}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {item.nama}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Angkatan {item.angkatan}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-4">
                                        "
                                        {item.pesan ||
                                            "Belum ada pesan dari alumni ini."}
                                        "
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <MessageSquare
                                size={40}
                                className="mx-auto text-gray-300 mb-2"
                            />
                            <p className="text-gray-400 text-sm">
                                Belum ada data alumni
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
