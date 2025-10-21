import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { route } from "ziggy-js";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        jabatan: "",
        image: null,
        deskripsi: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengurusInti.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pengurus Inti" />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                <Link
                    href={route("pengurusInti.index")}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                    <ArrowLeft size={18} /> Kembali
                </Link>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Nama</label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            value={data.jabatan}
                            onChange={(e) => setData("jabatan", e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.jabatan && (
                            <p className="text-red-500 text-sm">
                                {errors.jabatan}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2"
                        ></textarea>
                        {errors.deskripsi && (
                            <p className="text-red-500 text-sm">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Gambar</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="w-full"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        <Save size={18} /> Simpan
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
