import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud, X } from "lucide-react";
import { route } from "ziggy-js";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        pesan: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("alumniPath.store"));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData("image", null);
        setPreview(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Jejak Alumni" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <ImagePlus className="text-gray-600" size={28} />
                            Tambah Jejak Alumni
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Buat kisah inspiratif dari alumni.
                        </p>
                    </div>

                    <Link
                        href={route("alumniPath.index")}
                        className="text-gray-600 hover:text-sky-600 flex items-center gap-1 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-sm rounded-xl p-8 border border-gray-200 space-y-8"
                >
                    {/* Nama */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Nama Alumni
                        </label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                            placeholder="Masukkan nama alumni"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                        )}
                    </div>

                    {/* Pesan */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Pesan / Cerita
                        </label>
                        <textarea
                            value={data.pesan}
                            onChange={(e) => setData("pesan", e.target.value)}
                            rows="4"
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                            placeholder="Tulis pesan atau cerita singkat..."
                        />
                        {errors.pesan && (
                            <p className="text-red-500 text-sm mt-1">{errors.pesan}</p>
                        )}
                    </div>

                    {/* Upload Gambar Modern */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Foto Alumni (opsional)
                        </label>

                        {preview ? (
                            <div className="relative group w-fit mx-auto">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded-xl shadow-md border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white/90 hover:bg-red-100 text-red-600 rounded-full p-1.5 shadow-sm transition"
                                    title="Hapus gambar"
                                >
                                    <X size={16} />
                                </button>
                                <label
                                    htmlFor="image"
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
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
                                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:bg-gray-100 cursor-pointer transition text-center"
                            >
                                <UploadCloud className="text-gray-400" size={42} />
                                <span className="text-gray-600 font-medium">
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

                    {/* Tombol Submit */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition shadow-sm ${
                                processing
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-gray-600 hover:bg-gray-700 text-white"
                            }`}
                        >
                            <Save size={16} /> Simpan Alumni
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
