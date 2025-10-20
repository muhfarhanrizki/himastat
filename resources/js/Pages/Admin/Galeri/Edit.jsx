import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Image as ImageIcon, Save } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ galeri }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: galeri.name || "",
        description: galeri.description || "",
        tanggal: galeri.tanggal || "",
        image: null,
    });

    const [preview, setPreview] = useState(galeri.image ? `/storage/${galeri.image}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("galeri.update", galeri.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Galeri" />

            <div className="max-w-6xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <ImageIcon size={22} className="text-gray-600" />
                            Edit Galeri
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Ubah detail foto galeri.
                        </p>
                    </div>

                    <Link
                        href={route("galeri.index")}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

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

                    {/* Gambar */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Gambar
                        </label>
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
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                        )}
                    </div>

                    {/* Tombol Update */}
                    <div className="pt-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-md transition
                                ${processing
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-gray-600 hover:bg-gray-700 text-white"}`}
                        >
                            <Save size={16} /> Perbarui
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
