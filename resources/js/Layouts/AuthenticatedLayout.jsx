import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";

export default function AuthenticatedLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="relative flex min-h-screen bg-gray-100 overflow-hidden">
            {!isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(true)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity duration-300"
                ></div>
            )}

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>

            <main className="flex-1 transition-all duration-500 ease-in-out p-8">
                {children}
            </main>
        </div>
    );
}
