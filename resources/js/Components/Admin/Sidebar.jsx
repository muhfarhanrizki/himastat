import { Link, router, usePage } from "@inertiajs/react";
import { 
    LayoutDashboard, 
    User, 
    LogOut,  
    Image, 
    Megaphone, 
    Users2, 
    Network, 
    ClipboardList, 
    UserCheck, 
    FolderIcon, 
    Phone, 
    Footprints, 
    BookUser, 

} from "lucide-react";
import NavLink from "@/Components/NavLink";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const { user } = usePage().props.auth;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"), {}, {
            onSuccess: () => router.visit(route("login")),
        });
    };

const menuItems = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        href: route("dashboard"),
        active: route().current("dashboard"),
    },
    {
        name: "Jumbotron",
        icon: <Image size={20} />,
        href: route("jumbotron.index"),
        active: route().current("jumbotron.*"),
    },
    {
        name: "Sambutan",
        icon: <Megaphone size={20} />,
        href: route("sambutan.index"),
        active: route().current("sambutan.*"),
    },
    {
        name: "Profil Organisasi",
        icon: <BookUser size={20} />,
        href: route("visimisi.index"),
        active: route().current("visimisi.*"),
    },
    {
        name: "Divisi",
        icon: <Users2 size={20} />,
        href: route("divisi.index"),
        active: route().current("divisi.*"),
    },
    {
        name: "Program Kerja",
        icon: <ClipboardList size={20} />,
        href: route("proker.index"),
        active: route().current("proker.*"),
    },
    {
        name: "Struktur Pengurus",
        icon: <Network size={20} />,
        href: route("struktur.index"),
        active: route().current("struktur.*"),
    },
    {
        name: "Pengurus Inti",
        icon: <UserCheck size={20} />,
        href: route("pengurusinti.index"),
        active: route().current("pengurusinti.*"),
    },
    {
        name: "Jejak Alumni",
        icon: <Footprints size={20} />,
        href: route("alumniPath.index"),
        active: route().current("alumniPath.*"),
    },
    {
        name: "Galeri",
        icon: <FolderIcon size={20} />,
        href: route("galeri.index"),
        active: route().current("galeri.*"),
    },
    {
        name: "Kontak",
        icon: <Phone size={20} />,
        href: route("contact.index"),
        active: route().current("contact.*"),
    },
];

    return (
        <aside
            className={`fixed md:static inset-y-0 left-0 z-30 bg-white drop-blur-xl border-r border-gray-200 flex flex-col shadow-lg
            transition-all duration-500 ease-in-out transform
            ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-56 md:translate-x-0 md:w-20"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200/70">
                <Link href={route("dashboard")} className="flex items-center gap-2">
                    <img
                        src="/favicon.svg"
                        alt="Logo"
                        className="h-10 w-10 object-contain mr-2"
                    />
                    {isSidebarOpen && (
                        <span className="text-lg font-bold text-gray-800 tracking-wide mt-1">
                            Dashboard
                        </span>
                    )}
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-gray-700 md:hidden"
                >
                    ☰
                </button>
            </div>

            {/* Menu */}
            <nav className="flex flex-col mt-4 space-y-2 px-2">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        href={item.href}
                        active={item.active}
                        className={`flex items-center gap-3 px-4 py-2 pt-3 pb-3 rounded-lg font-medium transition-all duration-200
                            ${item.active
                                ? "bg-gray-600 text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                    >
                        {item.icon}
                        {isSidebarOpen && item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Info */}
            <div className="mt-auto border-t border-gray-200 p-4">
                <Link
                    href={route("profile.edit")}
                    className="flex items-center gap-3 group hover:bg-gray-50 px-3 py-2 rounded-md transition"
                >
                    <User size={20} className="text-gray-500 group-hover:text-gray-600" />
                    {isSidebarOpen && (
                        <div className="transition">
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-700">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    )}
                </Link>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full mt-3 px-3 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-md transition"
                >
                    <LogOut size={20} />
                    {isSidebarOpen && "Log Out"}
                </button>
            </div>
        </aside>
    );
}
