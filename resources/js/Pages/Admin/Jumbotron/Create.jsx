import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { Save, ArrowLeft, ImagePlus, Upload } from "lucide-react";
import { route } from "ziggy-js";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("jumbotron.store"));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Jumbotron" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <ImagePlus className="text-sky-600" size={28} />
                            Tambah Jumbotron
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Buat tampilan utama website desa kamu biar makin kece ✨
                        </p>
                    </div>

                    <Link
                        href={route("jumbotron.index")}
                        className="text-gray-600 hover:text-sky-600 flex items-center gap-1 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    {/* Preview Gambar */}
                    <div className="relative w-full h-96">
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover brightness-50"
                                />

                                {/* Overlay teks di atas gambar */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                                        {data.title || "Judul Jumbotron Kamu ✍️"}
                                    </h2>
                                    <p className="text-white text-base md:text-lg max-w-2xl drop-shadow-md">
                                        {data.description ||
                                            "Tulis deskripsi singkat biar makin menarik 😎"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                <Upload size={40} className="mb-3" />
                                <p className="text-gray-500">Belum ada gambar dipilih</p>
                            </div>
                        )}

                        {/* Tombol pilih gambar */}
                        <label
                            htmlFor="image"
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-sky-600 hover:text-sky-700 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-2 transition"
                        >
                            <ImagePlus size={16} />
                            Pilih Gambar
                        </label>

                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setData("image", file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </div>

                    {/* Input Section */}
                    <div className="p-6 space-y-6">
                        {/* Judul */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Judul
                            </label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Masukkan judul jumbotron..."
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                className="w-full border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Masukkan deskripsi singkat..."
                                rows={4}
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Error Gambar */}
                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                        )}

                        {/* Tombol Simpan */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2 font-medium"
                            >
                                <Save size={18} /> Simpan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
