import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Edit({ dewan }) {
    const { data, setData, post, processing, errors } = useForm({
        nama: dewan.nama || "",
        jabatan: dewan.jabatan || "",
        deskripsi: dewan.deskripsi || "",
        image: null,
        _method: "PUT",
    });

    const [imagePreview, setImagePreview] = useState(
        dewan.image ? `/storage/${dewan.image}` : null
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.dewan.update", dewan.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Dewan" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route("admin.dewan.index")}
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Kembali
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Edit Dewan
                        </h2>
                    </div>

                    {/* Form */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Nama */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData("nama", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Masukkan nama"
                                />
                                {errors.nama && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
                                )}
                            </div>

                            {/* Jabatan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jabatan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.jabatan}
                                    onChange={(e) => setData("jabatan", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Masukkan jabatan"
                                />
                                {errors.jabatan && (
                                    <p className="mt-1 text-sm text-red-600">{errors.jabatan}</p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) => setData("deskripsi", e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Masukkan deskripsi"
                                />
                                {errors.deskripsi && (
                                    <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>
                                )}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto
                                </label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Biarkan kosong jika tidak ingin mengubah foto
                                </p>
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                )}
                                
                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-40 w-40 object-cover rounded-full border-4 border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Link
                                    href={route("admin.dewan.index")}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
                                >
                                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}