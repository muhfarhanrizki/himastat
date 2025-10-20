import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { Phone, Mail, ArrowLeft, Save } from "lucide-react";
import { route } from "ziggy-js";

export default function Create() {
    const [values, setValues] = useState({
        phone: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("contact.store"), values, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kontak" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <ImagePlus className="text-gray-600" size={28} />
                            Tambah Kontak
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Tambah informasi kontak himpunan seperti nomor telepon dan email resmi.
                        </p>
                    </div>
                    <Link
                        href={route("contact.index")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-sky-600 transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Dua Card */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card Nomor Telepon */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-3 bg-sky-100 text-gray-600 rounded-xl">
                                        <Phone size={22} />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Nomor Telepon
                                    </h2>
                                </div>

                                <input
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    placeholder="Contoh: +62 812 3456 7890"
                                    className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Card Email */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-3 bg-gray-100 text-gray-600 rounded-xl">
                                        <Mail size={22} />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Email
                                    </h2>
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Contoh: desa@example.com"
                                    className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="pt-8 text-right">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg shadow transition"
                        >
                            <Save size={18} /> Simpan Kontak
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
