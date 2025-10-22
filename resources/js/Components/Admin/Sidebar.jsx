import { Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    User,
    LogOut,
    ChevronDown,
    ChevronRight,
    Image,
    Megaphone,
    BookUser,
    Footprints,
    Network,
    UserCheck,
    Users2,
    FolderIcon,
    Phone,
    Home,
    BookOpen,
    Columns3,
    ListCheck,
    ListIcon,
} from "lucide-react";
import NavLink from "@/Components/NavLink";
import { useState, useEffect } from "react";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const { user } = usePage().props.auth;

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

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
            name: "Beranda",
            icon: <Home size={20} />,
            submenu: [
                { name: "Jumbotron", icon: <Image size={18} />, href: route("jumbotron.index"), active: route().current("jumbotron.*") },
                { name: "Sambutan", icon: <Megaphone size={18} />, href: route("sambutan.index"), active: route().current("sambutan.*") },
            ],
        },
        {
            name: "Profil",
            icon: <BookOpen size={20} />,
            submenu: [
                { name: "Profil Organisasi", icon: <BookUser size={18} />, href: route("visimisi.index"), active: route().current("visimisi.*") },
                { name: "Jejak Alumni", icon: <Footprints size={18} />, href: route("alumniPath.index"), active: route().current("alumniPath.*") },
            ],
        },
        {
            name: "Struktur",
            icon: <Columns3 size={20} />,
            submenu: [
                { name: "Struktur Pengurus", icon: <Network size={18} />, href: route("struktur.index"), active: route().current("struktur.*") },
                { name: "Pengurus Inti", icon: <UserCheck size={18} />, href: route("pengurusInti.index"), active: route().current("pengurusInti.*") },
                { name: "Divisi", icon: <Users2 size={18} />, href: route("divisi.index"), active: route().current("divisi.*") },
                { name: "Proker", icon: <ListIcon size={18} />, href: route("proker.index"), active: route().current("proker.*") },
            ],
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

    const [openMenu, setOpenMenu] = useState(() => {
        const activeMenu = menuItems.find((item) =>
            item.submenu?.some((sub) => sub.active)
        );
        return activeMenu ? activeMenu.name : null;
    });

    useEffect(() => {
        const activeMenu = menuItems.find((item) =>
            item.submenu?.some((sub) => sub.active)
        );
        if (activeMenu) setOpenMenu(activeMenu.name);
    }, [route().current()]);

    return (
        <aside
            className={`fixed md:static inset-y-0 left-0 z-30 bg-white flex flex-col justify-between shadow-lg h-screen transition-all duration-500
                ${
                    isSidebarOpen
                        ? "translate-x-0 w-64"
                        : "-translate-x-56 md:translate-x-0 md:w-20"
                }`}
        >
            {/* Bagian Atas: Logo + Menu */}
            <div className="flex flex-col flex-grow overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-600 shrink-0">
                    <Link href={route("dashboard")} className="flex items-center gap-2">
                        <img
                            src="/favicon.svg"
                            alt="Logo"
                            className="h-10 w-10 object-contain"
                        />
                        {isSidebarOpen && (
                            <span className="text-lg font-bold text-white tracking-wide">
                                Himastat FMIPA
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={toggleSidebar}
                        className="text-gray-300 hover:text-white md:hidden"
                    >
                        ☰
                    </button>
                </div>

                {/* Menu Section */}
                <nav className="flex-1 overflow-y-auto mt-4 space-y-3 px-2 pb-4">
                    {menuItems.map((item, i) => (
                        <div key={i}>
                            <button
                                onClick={() =>
                                    item.submenu
                                        ? toggleMenu(item.name)
                                        : router.visit(item.href)
                                }
                                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg font-medium transition-all
                                ${
                                    item.active
                                        ? "bg-gray-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    {isSidebarOpen && item.name}
                                </div>
                                {item.submenu &&
                                    isSidebarOpen &&
                                    (openMenu === item.name ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    ))}
                            </button>

                            {item.submenu && openMenu === item.name && (
                                <div className="mt-1 space-y-2">
                                    {item.submenu.map((sub, j) => (
                                        <NavLink
                                            key={j}
                                            href={sub.href}
                                            active={sub.active}
                                            className={`flex items-center gap-2 pl-8 px-4 py-2 w-full rounded-md text-sm font-medium transition-all
                                            ${
                                                sub.active
                                                    ? "bg-gray-600 text-white"
                                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                            }`}
                                        >
                                            {sub.icon}
                                            {isSidebarOpen && sub.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Bagian Bawah: Profil & Logout */}
            <div className="border-t border-gray-200 p-4 shrink-0">
                <Link
                    href={route("profile.edit")}
                    className="flex items-center gap-3 group hover:bg-gray-50 px-3 py-2 rounded-md transition"
                >
                    <User
                        size={20}
                        className="text-gray-500 group-hover:text-gray-600"
                    />
                    {isSidebarOpen && (
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user.email}
                            </p>
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
