// AuthenticatedLayout.jsx (atau layout utama yang wrap sidebar)
import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import { Menu } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Mobile - Menu Toggle */}
                <header className="bg-white shadow-sm z-10 md:hidden shrink-0">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={toggleSidebar}
                            data-sidebar-toggle
                            className="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800">
                            Dashboard
                        </h1>
                        <div className="w-10"></div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
