import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Plus, Image, Calendar, Pencil, Trash2, Search, GripVertical, AlertCircle } from "lucide-react";
import { route } from "ziggy-js";
import ModalImage from "react-modal-image";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ─── Sortable Gallery Card ──────────────────────────────────────
function SortableGaleriCard({ galeri, onDelete, isDragDisabled }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: galeri.id, disabled: isDragDisabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 ${
                isDragging ? "ring-2 ring-gray-400 shadow-2xl" : ""
            }`}
        >
            {/* Drag Handle */}
            {!isDragDisabled && (
                <button
                    {...attributes}
                    {...listeners}
                    className="absolute top-3 left-3 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-lg cursor-grab active:cursor-grabbing transition-colors backdrop-blur-sm"
                    title="Seret untuk mengubah urutan"
                >
                    <GripVertical size={18} />
                </button>
            )}

            {/* Image */}
            {galeri.image ? (
                <ModalImage
                    small={`/storage/${galeri.image}`}
                    large={`/storage/${galeri.image}`}
                    alt={galeri.name}
                    hideDownload={true}
                    hideZoom={false}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <Image size={42} className="text-gray-300" />
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-100 transition pointer-events-none">
                <h2 className="text-white font-semibold text-lg line-clamp-1">
                    {galeri.name}
                </h2>
                <div className="flex items-center justify-between text-xs text-gray-300">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} /> {galeri.tanggal}
                    </div>
                    <div className="flex gap-2 pointer-events-auto">
                        <Link
                            href={route("admin.galeri.edit", galeri.id)}
                            className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-md transition"
                            title="Edit galeri"
                        >
                            <Pencil size={15} />
                        </Link>
                        <button
                            onClick={() => onDelete(galeri.id)}
                            className="bg-red-500/70 hover:bg-red-600 text-white p-1.5 rounded-md transition"
                            title="Hapus galeri"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Static Gallery Card (no drag) ─────────────────────────────
function StaticGaleriCard({ galeri, onDelete }) {
    return (
        <div className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100">
            {/* Image */}
            {galeri.image ? (
                <ModalImage
                    small={`/storage/${galeri.image}`}
                    large={`/storage/${galeri.image}`}
                    alt={galeri.name}
                    hideDownload={true}
                    hideZoom={false}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <Image size={42} className="text-gray-300" />
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-100 transition pointer-events-none">
                <h2 className="text-white font-semibold text-lg line-clamp-1">
                    {galeri.name}
                </h2>
                <div className="flex items-center justify-between text-xs text-gray-300">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} /> {galeri.tanggal}
                    </div>
                    <div className="flex gap-2 pointer-events-auto">
                        <Link
                            href={route("admin.galeri.edit", galeri.id)}
                            className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-md transition"
                            title="Edit galeri"
                        >
                            <Pencil size={15} />
                        </Link>
                        <button
                            onClick={() => onDelete(galeri.id)}
                            className="bg-red-500/70 hover:bg-red-600 text-white p-1.5 rounded-md transition"
                            title="Hapus galeri"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────
export default function Index() {
    const { galeris, filters } = usePage().props;
    const [search, setSearch] = useState(filters?.search || "");
    const [items, setItems] = useState(galeris.data);

    // Detect whether search is active or we're on a paginated (non-first) page
    const isSearchActive = !!(filters?.search);
    const currentPage = galeris.current_page || 1;
    const totalPages = galeris.last_page || 1;
    const perPage = galeris.per_page || 9;

    // Drag is disabled when search is active (reordering filtered results is meaningless)
    const isDragDisabled = isSearchActive;

    // Calculate the position offset for the current page
    // Page 1 items start at position 0, page 2 at 9, page 3 at 18, etc.
    const pageOffset = (currentPage - 1) * perPage;

    // Sync items state whenever galeris.data changes (page navigation, search, etc.)
    useEffect(() => {
        setItems(galeris.data);
    }, [galeris.data]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus galeri ini?")) {
            router.delete(route("admin.galeri.destroy", id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.galeri.index"), { search }, { preserveState: true });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((currentItems) => {
                const oldIndex = currentItems.findIndex((item) => item.id === active.id);
                const newIndex = currentItems.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(currentItems, oldIndex, newIndex);

                // Send the new order to the server with page offset
                const orderedIds = newItems.map((item) => item.id);
                router.post(route("admin.galeri.reorder"), {
                    orderedIds,
                    pageOffset,
                }, {
                    preserveState: true,
                    preserveScroll: true,
                });

                return newItems;
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Galeri Himpunan" />

            <div className="p-8 px-8 max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Image className="text-gray-800" size={26} />
                            Galeri Himpunan
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Dokumentasi kegiatan dan momen penting.
                            {!isDragDisabled && " Seret kartu untuk mengubah urutan."}
                        </p>
                    </div>

                    <Link
                        href={route("admin.galeri.create")}
                        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        <Plus size={18} /> Tambah Galeri
                    </Link>
                </div>

                {/* 🔍 Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="mb-6 flex items-center gap-2"
                >
                    <div className="relative w-full md:w-1/3">
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari gambar berdasarkan nama..."
                            className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring focus:ring-gray-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                    >
                        Cari
                    </button>
                </form>

                {/* Info banners */}
                {isSearchActive && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl">
                        <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />
                        <span>
                            Pengurutan drag & drop dinonaktifkan saat pencarian aktif. Hapus pencarian untuk mengatur ulang urutan.
                        </span>
                    </div>
                )}

                {!isDragDisabled && items.length > 1 && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl">
                        <GripVertical size={16} className="text-gray-400" />
                        <span>
                            Gunakan ikon <strong>⠿</strong> di pojok kiri atas kartu untuk mengubah urutan tampilan galeri.
                            {totalPages > 1 && (
                                <> Urutan berlaku pada halaman {currentPage} ini (posisi {pageOffset + 1}–{pageOffset + items.length}).</>
                            )}
                        </span>
                    </div>
                )}

                {/* Daftar Galeri */}
                {items.length > 0 ? (
                    <>
                        {isDragDisabled ? (
                            /* Static grid when drag is disabled (search active) */
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {items.map((galeri) => (
                                    <StaticGaleriCard
                                        key={galeri.id}
                                        galeri={galeri}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Draggable grid */
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={items.map((item) => item.id)}
                                    strategy={rectSortingStrategy}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                        {items.map((galeri) => (
                                            <SortableGaleriCard
                                                key={galeri.id}
                                                galeri={galeri}
                                                onDelete={handleDelete}
                                                isDragDisabled={isDragDisabled}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        )}

                        {/* 📄 Pagination */}
                        {galeris.links.length > 3 && (
                            <div className="flex justify-center gap-2 mt-10 flex-wrap">
                                {galeris.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || "#"}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg text-sm ${
                                            link.active
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } ${
                                            !link.url
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    // Empty state
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Image
                            size={60}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum Ada Galeri
                        </h3>
                        <p className="text-gray-500">
                            Tambahkan dokumentasi kegiatan himpunan sekarang.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
