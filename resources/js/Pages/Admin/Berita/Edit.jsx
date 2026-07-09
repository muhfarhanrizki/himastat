import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud, X, BookOpen } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ berita }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        judul: berita.judul || "",
        penulis: berita.penulis || "",
        tanggal: berita.tanggal || "",
        konten: berita.konten || "",
        gambar: null,
    });

    const [preview, setPreview] = useState(
        berita.gambar ? `/storage/${berita.gambar}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.berita.update", berita.id));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("gambar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData("gambar", null);
        setPreview(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${berita.judul}`} />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <BookOpen className="text-gray-600" size={28} />
                            Edit Berita
                        </h1>
                    </div>

                    <Link
                        href={route("admin.berita.index")}
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
                    {/* Judul */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                        />
                        {errors.judul && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    {/* Penulis */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Penulis
                        </label>
                        <input
                            type="text"
                            value={data.penulis}
                            onChange={(e) => setData("penulis", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                        />
                        {errors.penulis && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.penulis}
                            </p>
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
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                        />
                        {errors.tanggal && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tanggal}
                            </p>
                        )}
                    </div>

                    {/* Konten */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Konten
                        </label>
                        <textarea
                            value={data.konten}
                            onChange={(e) => setData("konten", e.target.value)}
                            rows="8"
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                        />
                        {errors.konten && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.konten}
                            </p>
                        )}
                    </div>

                    {/* Gambar */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Gambar (opsional)
                        </label>

                        {preview ? (
                            <div className="relative group w-fit mx-auto">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-64 h-64 object-cover rounded-xl shadow-md border border-gray-200"
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
                                    htmlFor="gambar"
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                >
                                    Ubah Gambar
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="gambar"
                                />
                            </div>
                        ) : (
                            <label
                                htmlFor="gambar"
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
                                    id="gambar"
                                />
                            </label>
                        )}

                        {errors.gambar && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.gambar}
                            </p>
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
                            <Save size={16} /> Perbarui Berita
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}