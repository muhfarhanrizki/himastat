import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Users,
    Plus,
    Trash2,
    Pencil,
    Briefcase,
    UserCheck,
    Phone,
    Calendar,
    ArrowLeft,
} from "lucide-react";

export default function Show({ auth, divisi }) {
    const [showProkerModal, setShowProkerModal] = useState(false);
    const [showAnggotaModal, setShowAnggotaModal] = useState(false);
    const [editingProker, setEditingProker] = useState(null);
    const [editingAnggota, setEditingAnggota] = useState(null);

    // Form untuk Proker
    const prokerForm = useForm({
        nama: "",
        deskripsi: "",
        divisi_id: divisi.id,
        tanggal: "",
        image: null,
        _method: "POST",
    });

    // Form untuk Anggota
    const anggotaForm = useForm({
        name: "",
        divisi_id: divisi.id,
        kontak: "",
        angkatan: "",
        jabatan: "",
        _method: "POST",
    });

    const [previewImage, setPreviewImage] = useState(null);

    // Handle Proker
    const openProkerModal = (proker = null) => {
        if (proker) {
            setEditingProker(proker);
            prokerForm.setData({
                nama: proker.nama,
                deskripsi: proker.deskripsi,
                divisi_id: divisi.id,
                tanggal: proker.tanggal,
                image: null,
                _method: "PUT",
            });
            setPreviewImage(proker.image ? `/storage/${proker.image}` : null);
        } else {
            setEditingProker(null);
            prokerForm.reset();
            prokerForm.setData("divisi_id", divisi.id);
            setPreviewImage(null);
        }
        setShowProkerModal(true);
    };

    const closeProkerModal = () => {
        setShowProkerModal(false);
        setEditingProker(null);
        prokerForm.reset();
        setPreviewImage(null);
    };

    const handleProkerSubmit = (e) => {
        e.preventDefault();

        if (editingProker) {
            prokerForm.post(route("proker.update", editingProker.slug), {
                onSuccess: () => closeProkerModal(),
            });
        } else {
            prokerForm.post(route("proker.store"), {
                onSuccess: () => closeProkerModal(),
            });
        }
    };

    const handleDeleteProker = (slug) => {
        if (confirm("Apakah Anda yakin ingin menghapus proker ini?")) {
            prokerForm.delete(route("proker.destroy", slug));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            prokerForm.setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Anggota
    const openAnggotaModal = (anggota = null) => {
        if (anggota) {
            setEditingAnggota(anggota);
            anggotaForm.setData({
                name: anggota.name,
                divisi_id: divisi.id,
                kontak: anggota.kontak,
                angkatan: anggota.angkatan,
                jabatan: anggota.jabatan || "",
                _method: "PUT",
            });
        } else {
            setEditingAnggota(null);
            anggotaForm.reset();
            anggotaForm.setData("divisi_id", divisi.id);
        }
        setShowAnggotaModal(true);
    };

    const closeAnggotaModal = () => {
        setShowAnggotaModal(false);
        setEditingAnggota(null);
        anggotaForm.reset();
    };

    const handleAnggotaSubmit = (e) => {
        e.preventDefault();

        if (editingAnggota) {
            anggotaForm.post(route("anggotaDiv.update", editingAnggota.slug), {
                onSuccess: () => closeAnggotaModal(),
            });
        } else {
            anggotaForm.post(route("anggotaDiv.store"), {
                onSuccess: () => closeAnggotaModal(),
            });
        }
    };

    const handleDeleteAnggota = (slug) => {
        if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
            anggotaForm.delete(route("anggotaDiv.destroy", slug));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Divisi
                </h2>
            }
        >
            <Head title={`Detail - ${divisi.name}`} />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Users className="text-gray-800" size={26} />
                            Divisi {`${divisi.name}`}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola divisi dan struktur dari {`${divisi.name}`}
                        </p>
                    </div>

                    <Link
                        href={route("divisi.index")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Kembali</span>
                    </Link>
                </div>

                {/* Hero Image Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl mb-8 h-96">
                    {divisi.image ? (
                        <img
                            src={`/storage/${divisi.image}`}
                            alt={divisi.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <Users
                                size={100}
                                className="text-white opacity-50"
                            />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            {divisi.name}
                        </h1>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-white">
                                <UserCheck size={20} />
                                <span className="text-lg">
                                    {divisi.anggota?.length || 0} Anggota
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Briefcase size={20} />
                                <span className="text-lg">
                                    {divisi.proker?.length || 0} Program Kerja
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Deskripsi
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {divisi.deskripsi}
                    </p>
                </div>

                {/* Program Kerja Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Program Kerja ({divisi.proker?.length || 0})
                        </h2>
                        <button
                            onClick={() => openProkerModal()}
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <Plus size={18} /> Tambah Proker
                        </button>
                    </div>

                    {divisi.proker && divisi.proker.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {divisi.proker.map((proker) => (
                                <div
                                    key={proker.id}
                                    className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white"
                                >
                                    {/* Tombol Hapus & Edit di pojok kanan atas */}
                                    <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            onClick={() =>
                                                openProkerModal(proker)
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition shadow-lg"
                                            title="Edit"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteProker(proker.slug)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition shadow-lg"
                                            title="Hapus"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="relative h-48 overflow-hidden">
                                        {proker.image ? (
                                            <img
                                                src={`/storage/${proker.image}`}
                                                alt={proker.nama}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <Briefcase
                                                    size={40}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                                                {proker.nama}
                                            </h3>
                                            <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                                                {proker.deskripsi}
                                            </p>
                                            <div className="flex items-center gap-1 text-white text-xs">
                                                <Calendar size={14} />
                                                <span>{proker.tanggal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <Briefcase
                                size={50}
                                className="mx-auto text-gray-300 mb-3"
                            />
                            <p className="text-gray-500">
                                Belum ada program kerja
                            </p>
                        </div>
                    )}
                </div>

                {/* Anggota Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Anggota Divisi ({divisi.anggota?.length || 0})
                        </h2>
                        <button
                            onClick={() => openAnggotaModal()}
                            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                        >
                            <Plus size={18} /> Tambah Anggota
                        </button>
                    </div>

                    {divisi.anggota && divisi.anggota.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {divisi.anggota.map((anggota) => (
                                <div
                                    key={anggota.id}
                                    className="relative group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Tombol Aksi */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() =>
                                                openAnggotaModal(anggota)
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md shadow-sm transition"
                                            title="Edit"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteAnggota(
                                                    anggota.slug
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md shadow-sm transition"
                                            title="Hapus"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    {/* Konten */}
                                    <div className="flex items-center gap-4 p-5">
                                        {/* Jika ada gambar tampilkan, jika tidak skip */}
                                        {anggota.image && (
                                            <img
                                                src={anggota.image}
                                                alt={anggota.name}
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                        )}

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-lg truncate">
                                                {anggota.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {anggota.jabatan || "Anggota"}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Phone
                                                        size={14}
                                                        className="text-gray-500"
                                                    />
                                                    <span>
                                                        {anggota.kontak || "-"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar
                                                        size={14}
                                                        className="text-gray-500"
                                                    />
                                                    <span>
                                                        Angkatan{" "}
                                                        {anggota.angkatan ||
                                                            "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <Users
                                size={50}
                                className="mx-auto text-gray-300 mb-3"
                            />
                            <p className="text-gray-500">Belum ada anggota</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Proker */}
            {showProkerModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeProkerModal}
                >
                    <div
                        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingProker
                                    ? "Edit Program Kerja"
                                    : "Tambah Program Kerja"}
                            </h3>
                            <button
                                onClick={closeProkerModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form
                            onSubmit={handleProkerSubmit}
                            className="p-6 space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Program Kerja{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={prokerForm.data.nama}
                                    onChange={(e) =>
                                        prokerForm.setData(
                                            "nama",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={prokerForm.data.tanggal}
                                    onChange={(e) =>
                                        prokerForm.setData(
                                            "tanggal",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: 15 Januari 2025"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={prokerForm.data.deskripsi}
                                    onChange={(e) =>
                                        prokerForm.setData(
                                            "deskripsi",
                                            e.target.value
                                        )
                                    }
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gambar
                                </label>
                                {previewImage && (
                                    <div className="mb-3">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="h-32 w-auto rounded-lg border border-gray-200"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={closeProkerModal}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={prokerForm.processing}
                                    className="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition disabled:opacity-50"
                                >
                                    {prokerForm.processing
                                        ? "Menyimpan..."
                                        : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Anggota */}
            {showAnggotaModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeAnggotaModal}
                >
                    <div
                        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingAnggota
                                    ? "Edit Anggota"
                                    : "Tambah Anggota"}
                            </h3>
                            <button
                                onClick={closeAnggotaModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form
                            onSubmit={handleAnggotaSubmit}
                            className="p-6 space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={anggotaForm.data.name}
                                    onChange={(e) =>
                                        anggotaForm.setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jabatan
                                </label>
                                <input
                                    type="text"
                                    value={anggotaForm.data.jabatan}
                                    onChange={(e) =>
                                        anggotaForm.setData(
                                            "jabatan",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: Ketua Divisi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kontak{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={anggotaForm.data.kontak}
                                    onChange={(e) =>
                                        anggotaForm.setData(
                                            "kontak",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: 081234567890"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Angkatan{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={anggotaForm.data.angkatan}
                                    onChange={(e) =>
                                        anggotaForm.setData(
                                            "angkatan",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: 2023"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={closeAnggotaModal}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={anggotaForm.processing}
                                    className="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition disabled:opacity-50"
                                >
                                    {anggotaForm.processing
                                        ? "Menyimpan..."
                                        : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
