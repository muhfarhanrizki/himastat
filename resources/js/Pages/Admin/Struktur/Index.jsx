import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Index({ title = "Jumbotron", data = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title={title} />

            <div className="p-12 min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-4 md:mb-0">
                        {title}
                    </h1>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition">
                            <Plus size={18} /> Tambah
                        </button>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                    {data.length === 0 ? (
                        <div className="text-center text-gray-500 py-16">
                            <p className="text-lg">Belum ada data untuk ditampilkan 😅</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-600">
                                <thead>
                                    <tr className="bg-gray-100 border-b text-gray-700">
                                        <th className="px-4 py-3 font-semibold">#</th>
                                        <th className="px-4 py-3 font-semibold">Nama</th>
                                        <th className="px-4 py-3 font-semibold">Deskripsi</th>
                                        <th className="px-4 py-3 font-semibold text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, i) => (
                                        <tr
                                            key={i}
                                            className="border-b hover:bg-blue-50 transition"
                                        >
                                            <td className="px-4 py-3">{i + 1}</td>
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {item.nama}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {item.deskripsi || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
