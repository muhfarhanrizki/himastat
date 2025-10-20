import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Edit, Trash2, Image, PlusCircle } from "lucide-react";
import { route } from "ziggy-js";

/**
 * Index page for Jumbotron
 *
 * This page displays the jumbotron's image, title, and description.
 * If the jumbotron doesn't exist, it will display a message and a button to create a new jumbotron.
 * The page also includes a button to edit the jumbotron and a button to delete it.
 *
 * @param {Object} jumbotrons - The jumbotron object to display.
 * @returns {JSX.Element} - The JSX element to render.
 */
export default function Index({ jumbotrons }) {
    const jumbotron = jumbotrons[0];

    return (
        <AuthenticatedLayout>
            <Head title="Jumbotron" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-600" size={28} />
                            Jumbotron
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola tampilan header website kamu.
                        </p>
                    </div>
                </div>

                {/* Content */}
                {jumbotron ? (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                        <div className="relative w-full h-96">
                            {jumbotron.image ? (
                                <img
                                    src={`/storage/${jumbotron.image}`}
                                    alt={jumbotron.title}
                                    className="w-full h-full object-cover brightness-50"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-lg">
                                    Tidak ada gambar 🖼️
                                </div>
                            )}

                            {/* Overlay teks di atas gambar */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                                    {jumbotron.title}
                                </h2>
                                <p className="text-white text-base md:text-lg max-w-2xl drop-shadow-md">
                                    {jumbotron.description ||
                                        "Belum ada deskripsi ditambahkan."}
                                </p>
                            </div>

                            {/* Tombol Aksi di pojok kanan atas */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <Link
                                    href={route("jumbotron.edit", jumbotron.id)}
                                    className="p-2 rounded-lg bg-white/80 hover:bg-white text-sky-600 transition"
                                    title="Edit"
                                >
                                    <Edit size={16} />
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={route(
                                        "jumbotron.destroy",
                                        jumbotron.id
                                    )}
                                    className="p-2 rounded-lg bg-white/80 hover:bg-red-100 text-red-600 transition"
                                    title="Hapus"
                                >
                                    <Trash2 size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-100">
                        <p className="text-gray-500 text-lg">
                            Belum ada jumbotron yang dibuat 😅
                        </p>
                        <Link
                            href={route("jumbotron.create")}
                            className="inline-flex items-center gap-2 mt-6 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition font-medium"
                        >
                            <PlusCircle size={18} />
                            Tambah Sekarang
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
