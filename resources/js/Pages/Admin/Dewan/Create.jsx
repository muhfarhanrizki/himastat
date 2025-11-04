import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, UploadCloud, Users } from "lucide-react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        jabatan: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

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
        post(route("admin.dewan.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Dewan" />

            <div className="p-8 max-w-full mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Users className="text-gray-800" size={28} />
                            Tambah Dewan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Lengkapi informasi anggota dewan untuk ditampilkan di website.
                        </p>
                    </div>
                    <Link
                        href={route("admin.strukturdewan.index")}
                        className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Masukkan nama"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jabatan <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.jabatan}
                            onChange={(e) => setData("jabatan", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Masukkan jabatan"
                        />
                        {errors.jabatan && (
                            <p className="text-red-500 text-sm mt-1">{errors.jabatan}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Foto
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-700"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                        )}
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

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg shadow transition disabled:opacity-70"
                        >
                            <UploadCloud size={18} />
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}