import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { Save, ArrowLeft, ImagePlus, Upload } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ sambutan }) {
    const { data, setData, post, processing, errors } = useForm({
        sambutan: sambutan.sambutan || "",
        nama: sambutan.nama || "",
        jabatan: sambutan.jabatan || "",
        image: null,
        _method: "PUT",
    });

    const [preview, setPreview] = useState(
        sambutan.image ? `/storage/${sambutan.image}` : null
    );

    function handleSubmit(e) {
        e.preventDefault();
        post(route("sambutan.update", sambutan.id));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Sambutan" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <ImagePlus className="text-gray-600" size={28} />
                            Edit Sambutan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Perbarui sambutan untuk pengunjung website.
                        </p>
                    </div>

                    <Link
                        href={route("sambutan.index")}
                        className="text-gray-600 hover:text-sky-600 flex items-center gap-1 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    {/* Preview Section - Split Layout */}
                    <div className="flex flex-col md:flex-row min-h-[500px]">
                        {/* Gambar di kiri */}
                        <div className="relative w-full md:w-1/2 h-[500px]">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-[500px] object-cover object-center"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                    <Upload size={40} className="mb-3" />
                                    <p className="text-gray-500">
                                        Belum ada gambar dipilih
                                    </p>
                                </div>
                            )}

                            {/* Tombol pilih gambar */}
                            <label
                                htmlFor="image"
                                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-sky-600 hover:text-sky-700 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-2 transition shadow-lg"
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

                        {/* Text sambutan di kanan */}
                        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-8 md:p-12">
                            <div className="text-center space-y-4 max-w-md">
                                <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
                                    {data.sambutan || "Tulis sambutan kamu"}
                                </p>

                                {(data.nama || data.jabatan) && (
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                        {data.nama && (
                                            <p className="text-gray-900 font-semibold text-base">
                                                {data.nama}
                                            </p>
                                        )}
                                        {data.jabatan && (
                                            <p className="text-gray-600 text-sm">
                                                {data.jabatan}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="p-6 space-y-6">
                        {/* Sambutan */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Sambutan
                            </label>
                            <textarea
                                className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                value={data.sambutan}
                                onChange={(e) =>
                                    setData("sambutan", e.target.value)
                                }
                                placeholder="Masukkan sambutan..."
                                rows={4}
                            ></textarea>
                            {errors.sambutan && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.sambutan}
                                </p>
                            )}
                        </div>
                        {/* Nama */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Nama
                            </label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                placeholder="Masukkan nama..."
                            />
                            {errors.nama && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        {/* Jabatan */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Jabatan
                            </label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                value={data.jabatan}
                                onChange={(e) =>
                                    setData("jabatan", e.target.value)
                                }
                                placeholder="Masukkan jabatan..."
                            />
                            {errors.jabatan && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.jabatan}
                                </p>
                            )}
                        </div>

                        {/* Error Gambar */}
                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}

                        {/* Tombol Simpan */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2 font-medium"
                            >
                                <Save size={18} /> Perbarui
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
