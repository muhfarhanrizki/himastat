import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ auth, divisis }) {
    const { data, setData, post, errors, processing } = useForm({
        nama: "",
        deskripsi: "",
        divisi_id: "",
        tanggal: "",
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("proker.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Program Kerja
                </h2>
            }
        >
            <Head title="Tambah Program Kerja" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nama Proker */}
                                <div>
                                    <label
                                        htmlFor="nama"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Nama Program Kerja{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.nama
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="Masukkan nama program kerja"
                                    />
                                    {errors.nama && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.nama}
                                        </p>
                                    )}
                                </div>

                                {/* Divisi */}
                                <div>
                                    <label
                                        htmlFor="divisi_id"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Divisi{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="divisi_id"
                                        value={data.divisi_id}
                                        onChange={(e) =>
                                            setData("divisi_id", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.divisi_id
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">Pilih Divisi</option>
                                        {divisis.map((divisi) => (
                                            <option
                                                key={divisi.id}
                                                value={divisi.id}
                                            >
                                                {divisi.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.divisi_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.divisi_id}
                                        </p>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                <div>
                                    <label
                                        htmlFor="deskripsi"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Deskripsi{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData("deskripsi", e.target.value)
                                        }
                                        rows="5"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.deskripsi
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="Masukkan deskripsi program kerja"
                                    />
                                    {errors.deskripsi && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.deskripsi}
                                        </p>
                                    )}
                                </div>
                                {/* Tanggal */}
                                <div>
                                    <label
                                        htmlFor="tanggal"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Tanggal{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal"
                                        value={data.tanggal}
                                        onChange={(e) =>
                                            setData("tanggal", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.tanggal
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="dd MMM yyyy"
                                    />
                                    {errors.tanggal && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.tanggal}
                                        </p>
                                    )}
                                </div>
                                {/* Image Upload */}
                                <div>
                                    <label
                                        htmlFor="image"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Gambar
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                        <div className="space-y-1 text-center">
                                            {previewImage ? (
                                                <div className="mb-4">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="mx-auto h-48 w-auto rounded-lg"
                                                    />
                                                </div>
                                            ) : (
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="image"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                >
                                                    <span>Upload gambar</span>
                                                    <input
                                                        id="image"
                                                        name="image"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    atau drag and drop
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 2MB
                                            </p>
                                        </div>
                                    </div>
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center justify-end gap-4 pt-4">
                                    <Link
                                        href={route("proker.index")}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
