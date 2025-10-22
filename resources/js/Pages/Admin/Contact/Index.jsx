import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Phone, Mail, Pencil, Trash2, Plus } from "lucide-react";
import { route } from "ziggy-js";

export default function Index({ contacts = [] }) {
    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus kontak ini?")) {
            router.delete(route("contact.destroy", id));
        }
    };

    const contact = contacts.length > 0 ? contacts[0] : null;

    return (
        <AuthenticatedLayout>
            <Head title="Kontak Himpunan" />

            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Phone className="text-gray-800" size={26} />
                            Kontak Himpunan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola informasi kontak seperti nomor telepon dan email resmi.
                        </p>
                    </div>

                    {contact ? (
                        <Link
                            href={route("contact.edit", contact.id)}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <Pencil size={18} /> Edit Kontak
                        </Link>
                    ) : (
                        <Link
                            href={route("contact.create")}
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <Plus size={18} /> Tambah Kontak
                        </Link>
                    )}
                </div>

                {/* Konten */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Card Phone */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-gray-100 text-gray-600 rounded-xl">
                                    <Phone size={22} />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Nomor Telepon
                                </h2>
                            </div>
                            {contact ? (
                                <p className="text-gray-600 text-lg">{contact.phone}</p>
                            ) : (
                                <p className="text-gray-400 italic text-lg">
                                    Belum ada nomor telepon
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Card Email */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-gray-100 text-gray-600 rounded-xl">
                                    <Mail size={22} />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Email Desa
                                </h2>
                            </div>
                            {contact ? (
                                <p className="text-gray-600 text-lg">{contact.email}</p>
                            ) : (
                                <p className="text-gray-400 italic text-lg">
                                    Belum ada email desa
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
