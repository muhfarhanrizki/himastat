import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, UploadCloud, FileText } from "lucide-react";

export default function Edit({ bagan }) {
    const { data, setData, post, processing, errors } = useForm({
        title: bagan.title || "",
        description: bagan.description || "",
        image: null,
        _method: "PUT",
    });

    const [imagePreview, setImagePreview] = useState(
        bagan.image ? `/storage/${bagan.image}` : null
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
        post(route("admin.baganStruktur.update", bagan.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Bagan Struktur" />

            <div className="p-8 max-w-full mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="text-gray-800" size={28} />
                            Edit Bagan Struktur
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Perbarui informasi bagan struktur untuk ditampilkan di website.
                        </p>
                    </div>
                    <Link
                        href={route("admin.baganStruktur.index")}
                        className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Judul <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Masukkan judul bagan"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            rows="5"
                            className="w-full rounded-lg border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Tulis deskripsi singkat..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gambar Bagan
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-700"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Biarkan kosong jika tidak ingin mengubah gambar
                        </p>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                        )}
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview Bagan"
                                className="mt-3 w-full max-h-80 object-contain rounded-lg border"
                            />
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg shadow transition disabled:opacity-70"
                        >
                            <UploadCloud size={18} />
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}