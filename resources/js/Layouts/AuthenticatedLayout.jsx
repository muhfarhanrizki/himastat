import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";

export default function AuthenticatedLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Overlay (aktif kalau sidebar tertutup di mobile) */}
            {!isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(true)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 transition-opacity duration-300 md:hidden"
                ></div>
            )}

            {/* Sidebar — tetap fix di kiri */}
            <div
                className={`fixed inset-y-0 left-0 z-30 transform bg-white shadow-lg transition-transform duration-300 ease-in-out w-64
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:inset-0`}
            >
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
            </div>

            {/* Main content — scrollable */}
            <main className="flex-1 overflow-y-auto p-8 transition-all duration-500 ease-in-out">
                {children}
            </main>
        </div>
    );
}
