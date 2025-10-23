import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, Target } from "lucide-react";
import { route } from "ziggy-js";

export default function Edit({ visimisi }) {
    const { data, setData, put, processing, errors } = useForm({
        visi: visimisi.visi || "",
        misi: visimisi.misi || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("visimisi.update", visimisi.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Visi & Misi" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Target className="text-gray-600" size={28} />
                            Edit Visi & Misi
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Perbarui data visi dan misi organisasi.
                        </p>
                    </div>
                    <Link
                        href={route("visimisi.index")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-sky-600 transition"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8"
                >
                    {/* Visi */}
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2">
                            Visi
                        </label>
                        <textarea
                            rows="4"
                            className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-xl"
                            value={data.visi}
                            onChange={(e) => setData("visi", e.target.value)}
                        />
                        {errors.visi && (
                            <p className="text-red-600 text-sm mt-1">{errors.visi}</p>
                        )}
                    </div>

                    {/* Misi */}
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2">
                            Misi
                        </label>
                        <textarea
                            rows="5"
                            className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-xl"
                            value={data.misi}
                            onChange={(e) => setData("misi", e.target.value)}
                        />
                        {errors.misi && (
                            <p className="text-red-600 text-sm mt-1">{errors.misi}</p>
                        )}
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
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
