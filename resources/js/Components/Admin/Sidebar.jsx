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
    FolderIcon,
    Phone,
    Home,
    BookOpen,
    Columns3,
    ListIcon,
    X,
    GitBranch,
    Award,
    Users2,
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
        router.post(
            route("logout"),
            {},
            {
                onSuccess: () => router.visit(route("login")),
            },
        );
    };

    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            href: route("admin.dashboard"),
            active: route().current("dashboard"),
        },
        {
            name: "Beranda",
            icon: <Home size={20} />,
            submenu: [
                {
                    name: "Jumbotron",
                    icon: <Image size={18} />,
                    href: route("admin.jumbotron.index"),
                    active: route().current("jumbotron.*"),
                },
                {
                    name: "Sambutan",
                    icon: <Megaphone size={18} />,
                    href: route("admin.sambutan.index"),
                    active: route().current("sambutan.*"),
                },
            ],
        },
        {
            name: "Profil",
            icon: <BookOpen size={20} />,
            submenu: [
                {
                    name: "Profil Organisasi",
                    icon: <BookUser size={18} />,
                    href: route("admin.visimisi.index"),
                    active: route().current("visimisi.*"),
                },
                {
                    name: "Jejak Alumni",
                    icon: <Footprints size={18} />,
                    href: route("admin.alumniPath.index"),
                    active: route().current("alumniPath.*"),
                },
            ],
        },
        {
            name: "Struktur",
            icon: <Columns3 size={20} />,
            submenu: [
                {
                    name: "Badan Eksekutif",
                    icon: <Network size={18} />,
                    href: route("admin.struktur.index"),
                    active: route().current("struktur.*"),
                },
                {
                    name: "Dewan",
                    icon: <Award size={18} />,
                    href: route("admin.strukturdewan.index"),
                    active: route().current("strukturdewan*"),
                },
                {
                    name: "Bagan Struktur",
                    icon: <GitBranch size={18} />,
                    href: route("admin.baganStruktur.index"),
                    active: route().current("baganStruktur.*"),
                },
            ],
        },
        {
            name: "Divisi & Proker",
            icon: <Users2 size={20} />,
            submenu: [
                {
                    name: "Divisi",
                    icon: <Users2 size={18} />,
                    href: route("admin.divisi.index"),
                    active: route().current("divisi.*"),
                },
                {
                    name: "Proker",
                    icon: <ListIcon size={18} />,
                    href: route("admin.proker.index"),
                    active: route().current("proker.*"),
                },
            ],
        },
        {
            name: "Galeri",
            icon: <FolderIcon size={20} />,
            href: route("admin.galeri.index"),
            active: route().current("galeri.*"),
        },
        {
            name: "Kontak",
            icon: <Phone size={20} />,
            href: route("admin.contact.index"),
            active: route().current("contact.*"),
        },
    ];

    const [openMenu, setOpenMenu] = useState(() => {
        const activeMenu = menuItems.find((item) =>
            item.submenu?.some((sub) => sub.active),
        );
        return activeMenu ? activeMenu.name : null;
    });

    useEffect(() => {
        const activeMenu = menuItems.find((item) =>
            item.submenu?.some((sub) => sub.active),
        );
        if (activeMenu) setOpenMenu(activeMenu.name);
    }, [route().current()]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isSidebarOpen && window.innerWidth < 768) {
                const sidebar = document.getElementById("sidebar");
                if (
                    sidebar &&
                    !sidebar.contains(e.target) &&
                    !e.target.closest("[data-sidebar-toggle]")
                ) {
                    toggleSidebar();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
                    onClick={toggleSidebar}
                ></div>
            )}

            <aside
                id="sidebar"
                className={`fixed md:static inset-y-0 left-0 z-30 bg-white flex flex-col justify-between shadow-lg h-screen transition-transform duration-300 ease-in-out
                    ${
                        isSidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full md:translate-x-0"
                    }
                    w-64 md:w-64`}
            >
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-700 shrink-0">
                        <Link
                            href={route("admin.dashboard")}
                            className="flex items-center gap-3"
                        >
                            <img
                                src="/favicon.svg"
                                alt="Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-lg font-bold text-white tracking-wide">
                                Dashboard Admin
                            </span>
                        </Link>

                        <button
                            onClick={toggleSidebar}
                            className="text-gray-300 hover:text-white md:hidden p-1"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto mt-4 space-y-2 px-3 pb-4">
                        {menuItems.map((item, i) => (
                            <div key={i}>
                                <button
                                    onClick={() =>
                                        item.submenu
                                            ? toggleMenu(item.name)
                                            : router.visit(item.href)
                                    }
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all
                                    ${
                                        item.active
                                            ? "bg-gray-700 text-white shadow-sm"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </div>
                                    {item.submenu &&
                                        (openMenu === item.name ? (
                                            <ChevronDown size={18} />
                                        ) : (
                                            <ChevronRight size={18} />
                                        ))}
                                </button>

                                {item.submenu && openMenu === item.name && (
                                    <div className="mt-2 space-y-1 ml-2">
                                        {item.submenu.map((sub, j) => (
                                            <NavLink
                                                key={j}
                                                href={sub.href}
                                                active={sub.active}
                                                className={`flex items-center gap-3 pl-10 pr-4 py-2.5 pt-2 w-full rounded-lg text-sm font-medium transition-all
                                                ${
                                                    sub.active
                                                        ? "bg-gray-700 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                                }`}
                                            >
                                                {sub.icon}
                                                <span>{sub.name}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="border-t border-gray-200 p-4 shrink-0 bg-gray-50 space-y-3">
                    <Link
                        href={route("beranda")}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition text-sm font-medium shadow-sm"
                    >
                        <Home size={18} />
                        <span>Beranda</span>
                    </Link>

                    <Link
                        href={route("admin.profile.edit")}
                        className="flex items-center gap-3 group hover:bg-white px-3 py-3 rounded-lg transition shadow-sm border border-transparent hover:border-gray-200"
                    >
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <User size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user.email}
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-lg transition font-medium"
                    >
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
