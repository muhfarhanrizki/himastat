import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud, X, ImagePlus } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ pengurusInti }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        nama: pengurusInti.nama || "",
        jabatan: pengurusInti.jabatan || "",
        image: null,
    });

    const [preview, setPreview] = useState(
        pengurusInti.image ? `/storage/${pengurusInti.image}` : null
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengurusInti.update", pengurusInti.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Pengurus Inti" />

            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <ImagePlus size={22} className="text-gray-600" />
                            Tambah Pengurus Inti
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Ubah data pengurus inti.
                        </p>
                    </div>
                    <Link
                        href={route("pengurusInti.index")}
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
                    {/* Foto */}
                    <div className="flex flex-col items-center">
                        {preview ? (
                            <div className="relative w-48 h-48 mb-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl shadow"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreview(null);
                                        setData("image", null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition">
                                <UploadCloud
                                    size={28}
                                    className="text-gray-400"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Upload Foto Baru
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        )}
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-gray-200"
                            placeholder="Masukkan nama pengurus"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    {/* Jabatan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            value={data.jabatan}
                            onChange={(e) => setData("jabatan", e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-gray-200"
                            placeholder="Masukkan jabatan pengurus"
                        />
                        {errors.jabatan && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.jabatan}
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
                            {processing ? "Menyimpan..." : "Perbarui"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
