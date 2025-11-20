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
            icon: <Image className="w-5 h-5 md:w-6 md:h-6" />,
            route: "/admin/galeri",
        },
        {
            name: "Divisi",
            value: stats.divisi,
            icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
            route: "/admin/divisi",
        },
        {
            name: "Proker",
            value: stats.proker,
            icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
            route: "/admin/proker",
        },
        {
            name: "Jejak Alumni",
            value: stats.alumniPath,
            icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
            route: "/admin/alumniPath",
        },
    ];

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

            <div className="max-w-full mx-auto py-4 md:py-8 px-4 md:px-8 space-y-4 md:space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-xl overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white opacity-5 rounded-full -mr-16 md:-mr-32 -mt-16 md:-mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-white opacity-5 rounded-full -ml-12 md:-ml-24 -mb-12 md:-mb-24"></div>

                    <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    {timeOfDay}, {auth?.user?.name || "Admin"}
                                </h1>
                                <p className="text-gray-300 text-sm md:text-lg max-w-3xl leading-relaxed">
                                    Selamat datang di dashboard! Di sini, kamu
                                    bisa melihat seluruh informasi penting yang
                                    dibutuhkan untuk memantau sistem dan
                                    aktivitas terbaru.
                                </p>
                            </div>

                            <div className="hidden md:flex items-center gap-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                                    <Activity className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-4">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs md:text-sm text-gray-200">
                                    Sistem Aktif
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
                                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                                <span className="text-xs md:text-sm text-gray-200">
                                    {new Date().toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Statistik Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={card.route}
                                className="bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 p-4 md:p-6 flex flex-col items-center text-center border border-gray-100"
                            >
                                <div className="p-2 md:p-4 rounded-lg md:rounded-xl text-white bg-gray-700 mb-2 md:mb-4">
                                    {card.icon}
                                </div>
                                <div className="text-2xl md:text-4xl font-bold text-gray-800">
                                    <CountUp
                                        end={card.value || 0}
                                        duration={1.5}
                                    />
                                </div>
                                <div className="text-xs md:text-base text-gray-600 mt-1 md:mt-2 font-medium">
                                    {card.name}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Galeri & Divisi */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Galeri Terbaru */}
                    <motion.div
                        className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="font-bold text-base md:text-xl text-gray-800 flex items-center gap-2">
                                <Image className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                                Galeri Terbaru
                            </h2>
                            <Link
                                href="/admin/galeri"
                                className="text-gray-700 hover:text-gray-900 text-xs md:text-sm font-medium flex items-center gap-1"
                            >
                                <span className="hidden sm:inline">
                                    Lihat semua
                                </span>
                                <ArrowRight
                                    size={14}
                                    className="md:w-4 md:h-4"
                                />
                            </Link>
                        </div>
                        {latest?.galeri?.length ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                                {latest.galeri.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative group overflow-hidden rounded-lg md:rounded-xl shadow-sm border border-gray-100"
                                    >
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="w-full h-24 md:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-2 md:p-3 transition-opacity">
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
                                    size={32}
                                    className="mx-auto text-gray-300 mb-2 md:w-10 md:h-10"
                                />
                                <p className="text-gray-400 text-xs md:text-sm">
                                    Belum ada galeri
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Daftar Divisi */}
                    <motion.div
                        className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="font-bold text-base md:text-xl text-gray-800 flex items-center gap-2">
                                <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                                Divisi Himpunan
                            </h2>
                            <Link
                                href="/admin/divisi"
                                className="text-gray-700 hover:text-gray-900 text-xs md:text-sm font-medium flex items-center gap-1"
                            >
                                <span className="hidden sm:inline">
                                    Lihat semua
                                </span>
                                <ArrowRight
                                    size={14}
                                    className="md:w-4 md:h-4"
                                />
                            </Link>
                        </div>
                        {latest?.divisi?.length ? (
                            <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
                                {latest.divisi.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/admin/divisi/${item.slug}`}
                                        className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                                    >
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.name}
                                                className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                                                <Users
                                                    size={20}
                                                    className="text-white md:w-6 md:h-6"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-gray-900 truncate">
                                                {item.name}
                                            </p>
                                            <div className="flex items-center gap-2 md:gap-3 text-xs text-gray-500 mt-1">
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
                                            size={16}
                                            className="text-gray-400 group-hover:text-gray-700 transition md:w-5 md:h-5"
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Users
                                    size={32}
                                    className="mx-auto text-gray-300 mb-2 md:w-10 md:h-10"
                                />
                                <p className="text-gray-400 text-xs md:text-sm">
                                    Belum ada divisi
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Proker & Aktivitas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Proker Terbaru */}
                    <motion.div
                        className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="font-bold text-base md:text-xl text-gray-800 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                                Program Kerja
                            </h2>
                            <Link
                                href="/admin/proker"
                                className="text-gray-700 hover:text-gray-900 text-xs md:text-sm font-medium flex items-center gap-1"
                            >
                                <span className="hidden sm:inline">
                                    Lihat semua
                                </span>
                                <ArrowRight
                                    size={14}
                                    className="md:w-4 md:h-4"
                                />
                            </Link>
                        </div>
                        {latest?.proker?.length ? (
                            <div className="space-y-2 md:space-y-3">
                                {latest.proker.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 md:p-4 border border-gray-100 rounded-lg md:rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-2 md:gap-3 mb-2">
                                            <h3 className="font-semibold text-sm md:text-base text-gray-800 line-clamp-1">
                                                {item.nama}
                                            </h3>
                                            <span className="px-2 py-0.5 md:py-1 bg-gray-700 text-white text-xs rounded-full whitespace-nowrap">
                                                {item.divisi?.name || "Divisi"}
                                            </span>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-2">
                                            {item.description ||
                                                "Tidak ada deskripsi"}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar
                                                size={12}
                                                className="md:w-4 md:h-4"
                                            />
                                            <span>{item.tanggal}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Briefcase
                                    size={32}
                                    className="mx-auto text-gray-300 mb-2 md:w-10 md:h-10"
                                />
                                <p className="text-gray-400 text-xs md:text-sm">
                                    Belum ada program kerja
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Aktivitas Terbaru */}
                    <motion.div
                        className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="font-bold text-base md:text-xl text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            Aktivitas Terbaru
                        </h2>
                        <div className="space-y-3 md:space-y-4 max-h-64 md:max-h-80 overflow-y-auto">
                            {recentActivities.length ? (
                                recentActivities.map((act) => (
                                    <div
                                        key={act.id}
                                        className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="w-2 h-2 bg-gray-700 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-800 font-medium text-xs md:text-sm">
                                                {act.title}
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-600 truncate">
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
                                        size={32}
                                        className="mx-auto text-gray-300 mb-2 md:w-10 md:h-10"
                                    />
                                    <p className="text-gray-400 text-xs md:text-sm">
                                        Belum ada aktivitas
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Jejak Alumni */}
                <motion.div
                    className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h2 className="font-bold text-base md:text-xl text-gray-800 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            Jejak Alumni
                        </h2>
                        <Link
                            href="/admin/alumniPath"
                            className="text-gray-700 hover:text-gray-900 text-xs md:text-sm font-medium flex items-center gap-1"
                        >
                            <span className="hidden sm:inline">
                                Lihat semua
                            </span>
                            <ArrowRight size={14} className="md:w-4 md:h-4" />
                        </Link>
                    </div>
                    {latest?.alumniPath?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {latest.alumniPath.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-gray-100 rounded-xl md:rounded-2xl p-4 md:p-5 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.nama}
                                            className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm md:text-base text-gray-800">
                                                {item.nama}
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-500">
                                                Angkatan {item.angkatan}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-700 italic leading-relaxed line-clamp-4">
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
                                size={32}
                                className="mx-auto text-gray-300 mb-2 md:w-10 md:h-10"
                            />
                            <p className="text-gray-400 text-xs md:text-sm">
                                Belum ada data alumni
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
