import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, UploadCloud, Image} from "lucide-react";
import { route } from "ziggy-js";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        thumbnail: "",
        struktur: "",
        deskripsi: "",
    });

    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const [previewStruktur, setPreviewStruktur] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.struktur.store"));
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
            <Head title="Tambah Struktur Organisasi" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-800" size={28} />
                            Tambah Struktur Organisasi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Lengkapi informasi struktur organisasi untuk
                            ditampilkan di website.
                        </p>
                    </div>
                    <Link
                        href={route("admin.struktur.index")}
                        className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6"
                >
                    {/* Struktur */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Foto Pengurus
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleImageChange(
                                    e,
                                    "struktur",
                                    setPreviewStruktur
                                )
                            }
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-700"
                        />
                        {errors.struktur && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.struktur}
                            </p>
                        )}
                        {previewStruktur && (
                            <img
                                src={previewStruktur}
                                alt="Preview Struktur"
                                className="mt-3 w-full max-h-80 object-contain rounded-lg border"
                            />
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tugas dan Fungsi
                        </label>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                            rows="5"
                            className="w-full rounded-lg border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Tulis deskripsi singkat tentang struktur organisasi..."
                        ></textarea>
                        {errors.deskripsi && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg shadow transition disabled:opacity-70"
                        >
                            <UploadCloud size={18} />
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

