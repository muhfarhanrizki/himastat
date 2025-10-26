import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud, X } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ alumniPath }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        nama: alumniPath.nama || "",
        angkatan: alumniPath.angkatan || "",
        kontak: alumniPath.kontak || "",
        pesan: alumniPath.pesan || "",
        image: null,
    });

    const [preview, setPreview] = useState(
        alumniPath.image ? `/storage/${alumniPath.image}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.alumniPath.update", alumniPath.id));
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
            <Head title={`Edit ${alumniPath.nama}`} />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Edit Jejak Alumni
                    </h1>
                    <Link
                        href={route("admin.alumniPath.index")}
                        className="text-gray-600 hover:text-sky-600 flex items-center gap-1 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-sm rounded-xl p-8 border border-gray-200 space-y-6"
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

                    {/* Angkatan */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Angkatan
                        </label>
                        <input
                            type="text"
                            value={data.angkatan}
                            onChange={(e) => setData("angkatan", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                            placeholder="Masukkan Angkatan alumni"
                        />
                        {errors.angkatan && (
                            <p className="text-red-500 text-sm mt-1">{errors.angkatan}</p>
                        )}
                    </div>

                    {/* Kontak */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Kontak Alumni
                        </label>
                        <input
                            type="text"
                            value={data.kontak}
                            onChange={(e) => setData("kontak", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                            placeholder="Masukkan kontak alumni"
                        />
                        {errors.kontak && (
                            <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>
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

                    {/* Upload Gambar */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Foto Alumni (opsional)
                        </label>

                        {preview ? (
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-lg mb-3 shadow-sm"
                                />
                            ) : (
                                <ImageIcon className="text-gray-400 mb-2" size={40} />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="image"
                                className="hidden"
                            />
                            <label
                                htmlFor="image"
                                className="cursor-pointer text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md transition"
                            >
                                Ganti Gambar
                            </label>
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
                            <Save size={16} /> Perbarui Alumni
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
