import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { Phone, Mail, ArrowLeft, Save } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ contact }) {
    const [values, setValues] = useState({
        phone: contact.phone || "",
        email: contact.email || "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("contact.update", contact.id), values, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Kontak" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Phone className="text-gray-600" /> Edit Kontak
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Ubah informasi kontak seperti nomor telepon dan email.
                        </p>
                    </div>

                    <Link
                        href={route("contact.index")}
                        className="mt-4 md:mt-0 inline-flex items-center gap-2 text-gray-600 hover:text-gray-600 transition"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Card Nomor Telepon */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Phone className="text-gray-600" />
                            <h2 className="font-semibold text-gray-800">
                                Nomor Telepon
                            </h2>
                        </div>
                        <input
                            type="text"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Contoh: +62 812 3456 7890"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                        )}
                    </div>

                    {/* Card Email */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="text-gray-600" />
                            <h2 className="font-semibold text-gray-800">Email</h2>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Contoh: himastat@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                        )}
                    </div>

                    {/* Tombol Simpan */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg shadow transition"
                        >
                            <Save size={18} /> Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
