import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud, X, ImagePlus } from "lucide-react";
import { route } from "ziggy-js";

export default function Create({ auth }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        deskripsi: "",
        anggota: "",
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("divisi.store"), {
            onSuccess: () => {
                reset();
                setPreviewImage(null);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Divisi" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <ImagePlus size={22} className="text-gray-600" />
                            Tambah Divisi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Lengkapi data divisi di bawah ini.
                        </p>
                    </div>
                    <Link
                        href={route("divisi.index")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-100"
                >
                    {/* Upload Gambar */}
                    <div className="flex flex-col items-center">
                        {previewImage ? (
                            <div className="relative w-48 h-48 mb-4">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl shadow"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewImage(null);
                                        setData("image", null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition">
                                <UploadCloud
                                    size={28}
                                    className="text-gray-400"
                                />
                                                                <span className="text-gray-600 font-medium">
                                    Klik untuk upload atau drag gambar ke sini
                                </span>
                                <span className="text-xs text-gray-400">
                                    (PNG, JPG, maksimal 2MB)
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Nama Divisi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Divisi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-gray-200 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                            placeholder="Masukkan nama divisi"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows="5"
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                            className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-gray-200 ${
                                errors.deskripsi ? "border-red-500" : ""
                            }`}
                            placeholder="Masukkan deskripsi divisi"
                        />
                        {errors.deskripsi && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg shadow transition"
                        >
                            <Save size={18} />
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
