import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Calendar,
    Users,
    Award,
    Zap,
    TrendingUp,
    FileText,
    Handshake,
    Vote,
} from "lucide-react";
import FrontendLayout from "@/Layouts/FrontendLayout";

function SejarahContent() {
    const timelineData = [
        {
            year: "2015",
            title: "Pembentukan Himpunan",
            description:
                "Himpunan Mahasiswa Statistika bermula sebelum adanya kepengurusan mengenai pembentukan Departemen Statistika itu sendiri. Namun saat itu masih berupa perbincangan antara mulut ke mulut dan masih berupa isu yang beredar. Saat itu Mahasiswa Statistika masih berhimpun dalam Himpunan Mahasiswa Matematika kemudian dari situ ada beberapa Mahasiswa Statistika kemudian berinisiatif untuk menghimpun diri sendiri dengan semangat untuk membuat suatu wadah untuk mendukung persiapan.",
            icon: <Users className="w-6 h-6" />,
        },
        {
            year: "2015",
            title: "Deklarasi Pembentukan",
            description:
                "Persiapan kemudian dilakukan yang diinisiasi oleh Kanda Anugrah Ariansyah (Statistika 2015) dan Kanda Nifal Gusri (Statistika 2015) yang kemudian melihatkan beberapa Mahasiswa Lainsa angkatan untuk langsung membahas mengenai persiapan mengenai pembentukan Himpunan ini.",
            icon: <FileText className="w-6 h-6" />,
        },
        {
            year: "2016",
            title: "Pembentukan Struktur Organisasi",
            description:
                "Kanda Anugrah dan Kanda Nifal melakukan mahasiswa angkatan yang kemudian dikutusi sendiri oleh Kanda Anugrah Ariansyah. Tim pembentuk yang kemudian memilih perangkat untuk mempersiapkan, melakukan deklarasi, dan menyusun aturan dasar organisasi dalam hal ini seperti Mekanisme Tata Tertib, Kerangka-kerangka Anggaran Dasar dan Anggaran Rumah Tangga, Garis-Garis Besar Haluan Organisasi, Logo Himpunan dan juga Bendera Himpunan.",
            icon: <TrendingUp className="w-6 h-6" />,
        },
        {
            year: "9 Oktober 2016",
            title: "Kerangka Kerja Rumah Tangga",
            description:
                "Semangat tidak lanjut dari tim pembentukan itu kemudian sampai pada tanggal 9 Oktober 2016 dimana struktur kerangka menegasai anggaran dasar organisasi yang telah dibuat oleh tim pembentuk kemudian dibahas pada pertemuan yang melibatkan Mahasiswa Statistika. Pada saat itu juga sudah terbentak logo Himpunan Mahasiswa Statistika yang didesain oleh Kanda Teguh Fajri Nugraha (Statistika 2013) dan Kak Seto Aprilianto (Statistika 2015).",
            icon: <FileText className="w-6 h-6" />,
        },
        {
            year: "23 Oktober 2019",
            title: "Pengesahan Nama Resmi",
            description:
                "Setelah rampungnya pembahasan mengenai Aturan Dasar, kemudian Tim Pembentuk atas melakukan deklarasi pada tanggal 23 Oktober 2019 bertempat di lantai 4 Departemen Statistika kemudian telah seburah Mahasiswa Statistika yang kemudian dibuatsikan kepada Departemen Statistika dengan nama Mahasiswa Statistika yang kemudian dinamakan nama Mahasiswa Statistika.",
            icon: <Award className="w-6 h-6" />,
        },
        {
            year: "2019",
            title: "Pembentukan Struktur Kepengurusan",
            description:
                "Setelah terbentuknya Himpunan Mahasiswa Statistika yang dilandasi dengan deklarasi, kemudian Himpunan membuat surat pernintaan kepada Majeperva pola saat itu yang diketahui oleh Kanda Muh. Siddiq T dengan tujuan permintaan untuk bergabung dalam KM FMIPA Unhas dan diteredesiasi kepada Departemen Statistika. Kemudian Majeperva memberikan surat bahwa Himpunan Mahasiswa Statistika dalam Keluarga Mahasiswa Fakultas yang secara resmi telah diterima di Universitas Hasanuddin (KM FMIPA Unhas).",
            icon: <Handshake className="w-6 h-6" />,
        },
        {
            year: "28 Oktober 2019",
            title: "Pembentukan AD/ART & Musyawarah",
            description:
                "Semangat itu berlanjut untuk kemudian membuat struktur organisasi dan menetapkan Anggaran Dasar dan Anggaran Rumah Tangga pada Musyawarah Pembentukan Himpunan Pertama mengenai surat permintaan kepada Majeperva pada saat itu yang diketahui oleh Kanda Abdul Rahman (Statistika 2017), Kanda Ainul Fajri (Statistika 2017), Kanda Annisa Miftahul Sakīnah (Statistika 2018), dan Kanda Fadhil Al Anshory (Statistika 2019) sebari setelah deklarasi tejadi sampai pada pencatapanya ditanggal 28 Oktober 2019.",
            icon: <Vote className="w-6 h-6" />,
        },
        {
            year: "9 November 2019",
            title: "Pembentukan Dewan Pertama",
            description:
                "Setelah dilakukannya Musyawarah Pembentukan Himpunan Mahasiswa Statistika 2019 Himastat terbentuk untuk membuka anggota. Musyawarah anggota pertama dari Himpunan Mahasiswa Statistika yang dijalankan demi mewujudkan ini terlaksana pada tangga 10 September 2010 dimana terpilihlah Dewan pertama dari Himastat pada tanggal 9 November 2019 yang diketuhui Kanda Fadhil Al Anshory dan Kanda Natasya Maharani.",
            icon: <Users className="w-6 h-6" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-36 pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center"
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
                            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent py-2 mb-4">
                            Sejarah Himastat
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                            Perjalanan pembentukan Himpunan Mahasiswa Statistika
                            Universitas Hasanuddin
                        </p>
                    </motion.div>
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
                                        Semangat awal mengenai pembentukan
                                        Himpunan Mahasiswa Statistika bermula
                                        sebelum adanya kepengurusan mengenai
                                        pembentukan Departemen Statistika itu
                                        sendiri. Namun saat itu masih berupa
                                        perbincangan antara mulut ke mulut dan
                                        masih berupa isu yang beredar. Saat itu
                                        Mahasiswa Statistika masih berhimpun
                                        dalam Himpunan Mahasiswa Matematika
                                        kemudian dari situ ada beberapa
                                        Mahasiswa Statistika kemudian
                                        berinisiatif untuk menghimpun diri
                                        sendiri dengan semangat untuk membuat
                                        suatu wadah dalam bentuk organisasi
                                        kemahasiswaan.
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 to-transparent rounded-full"></div>
                                    <p className="text-gray-700 leading-relaxed text-lg pl-4">
                                        Beberapa persiapan kemudian dilakukan
                                        yang diinisiasi oleh Kanda Anugrah
                                        Ariansyah (Statistika 2015) dan Kanda
                                        Nifal Gusri (Statistika 2015) yang
                                        kemudian melibatkan beberapa Mahasiswa
                                        Lainnya satu angkatan untuk langsung
                                        membahas mengenai persiapan mengenai
                                        pembentukan Himpunan ini. Perjalanan ini
                                        dimulai dengan semangat untuk
                                        menciptakan wadah bagi mahasiswa
                                        Statistika dalam mengembangkan potensi
                                        dan berkontribusi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline Section */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div
                            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 rounded-full"
                            style={{ top: "2rem", bottom: "2rem" }}
                        ></div>

                        <div className="space-y-8">
                            {timelineData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex flex-col md:flex-row gap-8 items-center ${
                                        index % 2 === 0
                                            ? "md:flex-row"
                                            : "md:flex-row-reverse"
                                    }`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 md:w-1/2">
                                        <motion.div
                                            className={`bg-gradient-to-br ${
                                                index % 2 === 0
                                                    ? "from-white to-gray-50"
                                                    : "from-gray-900 to-gray-800"
                                            } rounded-2xl p-8 shadow-xl border ${
                                                index % 2 === 0
                                                    ? "border-gray-200"
                                                    : "border-gray-700"
                                            } relative overflow-hidden group hover:shadow-2xl transition-all duration-300`}
                                            whileHover={{ y: -5 }}
                                        >
                                            {/* Background Glow */}
                                            <div
                                                className={`absolute top-0 right-0 w-32 h-32 ${
                                                    index % 2 === 0
                                                        ? "bg-gradient-to-br from-gray-200/40"
                                                        : "bg-gradient-to-br from-gray-700/40"
                                                } to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                                            ></div>

                                            <div className="relative z-10">
                                                <div
                                                    className={`flex items-center gap-3 mb-4 ${
                                                        index % 2 === 0
                                                            ? "text-gray-900"
                                                            : "text-white"
                                                    }`}
                                                >
                                                    <div
                                                        className={`flex items-center justify-center w-12 h-12 ${
                                                            index % 2 === 0
                                                                ? "bg-gradient-to-br from-gray-700 to-gray-900"
                                                                : "bg-gradient-to-br from-gray-600 to-gray-400"
                                                        } rounded-xl shadow-lg`}
                                                    >
                                                        <div
                                                            className={
                                                                index % 2 === 0
                                                                    ? "text-white"
                                                                    : "text-gray-900"
                                                            }
                                                        >
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-bold">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <p
                                                    className={`leading-relaxed ${
                                                        index % 2 === 0
                                                            ? "text-gray-700"
                                                            : "text-gray-200"
                                                    }`}
                                                >
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Year Badge */}
                                    <div className="flex-shrink-0 relative z-20">
                                        <motion.div
                                            className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-50"
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 5,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="text-center px-2">
                                                <Calendar className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                                                <p className="text-white font-bold text-base leading-tight">
                                                    {item.year}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block flex-1 md:w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Closing Section */}
                    <motion.div
                        className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-700 relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-700/40 to-transparent rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                                Melangkah ke Masa Depan
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg text-center max-w-3xl mx-auto">
                                Dari semangat awal hingga terbentuknya struktur
                                organisasi yang solid, Himpunan Mahasiswa
                                Statistika terus berkembang dan berinovasi.
                                Setiap langkah dalam perjalanan ini adalah bukti
                                komitmen mahasiswa Statistika untuk terus
                                berkarya dan memberikan kontribusi terbaik bagi
                                almamater dan masyarakat.
                            </p>
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
        </div>
    );
}

export default function Sejarah() {
    return (
        <FrontendLayout>
            <Head title="Sejarah - Himpunan Mahasiswa Statistika" />
            <SejarahContent />
        </FrontendLayout>
    );
}
