import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, Image } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ struktur }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        thumbnail: "",
        struktur: "",
        deskripsi: struktur.deskripsi || "",
    });

    const [previewThumbnail, setPreviewThumbnail] = useState(
        struktur.thumbnail ? `/storage/${struktur.thumbnail}` : null
    );
    const [previewStruktur, setPreviewStruktur] = useState(
        struktur.struktur ? `/storage/${struktur.struktur}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.struktur.update", struktur.id));
    };

    const handleImageChange = (e, field, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Struktur Organisasi" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-800" size={28} />
                            Edit Foto Organisasi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Perbarui informasi struktur organisasi yang sudah ada.
                        </p>
                    </div>
                    <Link
                        href={route("admin.struktur.index")}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-600 font-medium"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Card 2: Struktur Gambar */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Foto Pengurus
                        </h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "struktur", setPreviewStruktur)}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-700"
                        />
                        {errors.struktur && (
                            <p className="text-red-500 text-sm mt-1">{errors.struktur}</p>
                        )}
                        {previewStruktur && (
                            <img
                                src={previewStruktur}
                                alt="Preview Struktur"
                                className="mt-3 w-full max-h-80 object-contain rounded-lg border"
                            />
                        )}
                    </div>

                    {/* Card 3: Deskripsi */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Tugas dan Fungsi
                        </h2>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) => setData("deskripsi", e.target.value)}
                            rows="5"
                            className="w-full rounded-lg border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Tulis deskripsi singkat tentang struktur organisasi..."
                        ></textarea>
                        {errors.deskripsi && (
                            <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>
                        )}
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg shadow transition disabled:opacity-70"
                        >
                            <Save size={18} />
                            Perbarui
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
