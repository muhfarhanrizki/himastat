import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { Save, ArrowLeft, Edit, ImagePlus, Upload, Image as ImageIcon } from "lucide-react";
import { route } from "ziggy-js";

export default function EditJumbotron() {
    const { jumbotron } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        title: jumbotron.title || "",
        description: jumbotron.description || "",
        image: null,
    });

    const [preview, setPreview] = useState(
        jumbotron.image ? `/storage/${jumbotron.image}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("jumbotron.update", jumbotron.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => console.log("✅ Jumbotron berhasil diperbarui!"),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Jumbotron" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <ImageIcon className="text-sky-600" size={28} />
                            Edit Jumbotron
                        </h1>
                    </div>

                    <Link
                        href={route("jumbotron.index")}
                        className="text-gray-600 hover:text-sky-600 flex items-center gap-1 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>

                {/* Card Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                >
                    {/* Preview Gambar */}
                    <div className="relative bg-gray-50">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-72 object-cover"
                            />
                        ) : (
                            <div className="w-full h-72 flex flex-col items-center justify-center text-gray-400">
                                <Upload size={40} className="mb-3" />
                                <p className="text-gray-500">Belum ada gambar dipilih</p>
                            </div>
                        )}

                        {/* Tombol Ganti Gambar */}
                        <label
                            htmlFor="image"
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-sky-600 hover:text-sky-700 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-2 transition"
                        >
                            <ImagePlus size={16} />
                            Ganti Gambar
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setData("image", file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </div>

                    {/* Form Input */}
                    <div className="p-6 space-y-6">
                        {/* Input Judul */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Judul
                            </label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Masukkan judul jumbotron..."
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Input Deskripsi */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                className="w-full border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Masukkan deskripsi singkat..."
                                rows={4}
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Error Gambar */}
                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                        )}

                        {/* Tombol Submit */}
                        <div className="pt-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2 font-medium disabled:opacity-60"
                            >
                                <Save size={18} />
                                {processing ? "Menyimpan..." : "Update"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
