import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ alumniPath }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        nama: alumniPath.nama || "",
        pesan: alumniPath.pesan || "",
        image: null,
    });

    const [preview, setPreview] = useState(
        alumniPath.image ? `/storage/${alumniPath.image}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("alumniPath.update", alumniPath.id));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${alumniPath.nama}`} />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Edit Jejak Alumni
                    </h1>
                    <Link
                        href={route("alumniPath.index")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-sky-600 transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 space-y-6"
                >
                    {/* Nama */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Nama Alumni
                        </label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full rounded-xl border-gray-300 focus:border-gray-500 focus:ring-gray-400"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nama}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Angkatan
                        </label>
                        <input
                            type="text"
                            value={data.angkatan}
                            onChange={(e) =>
                                setData("angkatan", e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-300 text-sm shadow-sm"
                            placeholder="Masukkan Angkatan alumni"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.angkatan}
                            </p>
                        )}
                    </div>
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
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    {/* Pesan */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Pesan / Cerita
                        </label>
                        <textarea
                            value={data.pesan}
                            onChange={(e) => setData("pesan", e.target.value)}
                            rows="5"
                            className="w-full rounded-xl border-gray-300 focus:border-gray-500 focus:ring-gray-400"
                        />
                        {errors.pesan && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pesan}
                            </p>
                        )}
                    </div>

                    {/* Upload Gambar */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Foto Alumni (opsional)
                        </label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-xl shadow mb-4"
                                />
                            ) : (
                                <UploadCloud
                                    className="text-gray-400 mb-3"
                                    size={40}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image"
                            />
                            <label
                                htmlFor="image"
                                className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm transition"
                            >
                                Ganti Gambar
                            </label>
                        </div>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Tombol Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-medium px-5 py-3 rounded-xl transition"
                        >
                            <Save size={18} /> Perbarui Data
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
