import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, UploadCloud, ImagePlus, Save, X } from "lucide-react";
import { route } from "ziggy-js";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        tanggal: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const removeImage = () => {
        setData("image", null);
        setPreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("galeri.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Galeri" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <ImagePlus size={22} className="text-gray-600" />
                            Tambah Galeri
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Unggah foto baru untuk galeri himpunan.
                        </p>
                    </div>

                    <Link
                        href={route("galeri.index")}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-600 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 space-y-6"
                >
                    {/* Nama */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Nama Gambar
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Contoh: Rapat Kerja"
                            className="w-full border-gray-300 rounded-lg focus:border-gray-400 focus:ring-gray-300 text-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            rows="3"
                            placeholder="Tuliskan deskripsi singkat tentang gambar..."
                            className="w-full border-gray-300 rounded-lg focus:border-gray-400 focus:ring-gray-300 text-sm"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Tanggal
                        </label>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={(e) => setData("tanggal", e.target.value)}
                            className="w-full border-gray-300 rounded-lg focus:border-gray-400 focus:ring-gray-300 text-sm"
                        />
                        {errors.tanggal && (
                            <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Gambar
                        </label>

                        {preview ? (
                            <div className="relative group w-fit mx-auto">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded-xl shadow-md border border-gray-200"
                                />

                                {/* Tombol hapus */}
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white hover:bg-red-100 text-red-600 rounded-full p-1.5 shadow-sm transition-all duration-200"
                                    title="Hapus gambar"
                                >
                                    <X size={16} />
                                </button>

                                {/* Tombol ubah gambar */}
                                <label
                                    htmlFor="image"
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                                >
                                    Ubah Gambar
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image"
                                />
                            </div>
                        ) : (
                            <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200 text-center"
                            >
                                <UploadCloud className="text-gray-400" size={42} />
                                <span className="text-gray-700 font-medium">
                                    Klik untuk upload atau drag gambar ke sini
                                </span>
                                <span className="text-xs text-gray-400">
                                    (PNG, JPG, maksimal 2MB)
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image"
                                />
                            </label>
                        )}

                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                        )}
                    </div>


                    {/* Tombol Simpan */}
                    <div className="pt-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-md transition
                                ${processing
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-gray-600 hover:bg-gray-700 text-white"}`}
                        >
                            <Save size={16} /> Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
