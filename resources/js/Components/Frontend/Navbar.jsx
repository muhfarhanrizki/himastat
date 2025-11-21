import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { ChevronDown, X, Menu } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(false);
    };

    return (
        <header
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[85%] rounded-2xl transition-all duration-300 border border-white/10 ${
                scrolled
                    ? "backdrop-blur-md bg-gradient-to-br from-gray-600 to-gray-800 mt-3"
                    : "backdrop-blur-md bg-white/20 shadow-md mt-6"
            }`}
        >
            <nav className="flex justify-between items-center px-8 py-3 transition-all duration-300">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
                    <span
                        className={`text-lg font-medium tracking-wide transition-colors duration-300 ${
                            scrolled
                                ? "text-white drop-shadow-md"
                                : "text-white"
                        }`}
                    >
                        
                    </span>
                </Link>

                {/* Desktop Menu */}
                <ul
                    className={`hidden md:flex items-center space-x-8 font-medium transition-colors duration-300 ${
                        scrolled ? "text-white" : "text-white"
                    }`}
                >
                    <li>
                        <Link
                            href="/"
                            className="hover:text-gray-900 transition"
                        >
                            Beranda
                        </Link>
                    </li>

                    {/* Dropdown Profil */}
                    <li className="relative group" ref={dropdownRef}>
                        <button
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className="flex items-center gap-1 hover:text-gray-900 transition"
                        >
                            Profil
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                    openDropdown ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <ul
                            className={`absolute left-0 top-10 bg-white/95 backdrop-blur-md shadow-lg rounded-xl py-2 w-56 text-sm text-gray-700 border border-gray-100 transform transition-all duration-200 ease-out ${
                                openDropdown
                                    ? "opacity-100 visible translate-y-0"
                                    : "opacity-0 invisible -translate-y-2"
                            }`}
                        >
                            <li>
                                <Link
                                    href="/profil-organisasi"
                                    className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-300 hover:text-gray-700 hover:translate-x-1"
                                    onClick={() => setOpenDropdown(false)}
                                >
                                    Profil Organisasi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sejarah"
                                    className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-300 hover:text-gray-700 hover:translate-x-1"
                                    onClick={() => setOpenDropdown(false)}
                                >
                                    Sejarah
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/struktur-organisasi"
                                    className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-300 hover:text-gray-700 hover:translate-x-1"
                                    onClick={() => setOpenDropdown(false)}
                                >
                                    Struktur Organisasi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/achievements"
                                    className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-300 hover:text-gray-700 hover:translate-x-1"
                                    onClick={() => setOpenDropdown(false)}
                                >
                                    Achievements
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            href="/galeri-himpunan"
                            className="hover:text-gray-900 transition"
                        >
                            Galeri
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/kontak"
                            className="hover:text-gray-900 transition"
                        >
                            Kontak
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Icon */}
                <button
                    className={`md:hidden focus:outline-none transition-colors ${
                        scrolled ? "text-white" : "text-white"
                    }`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg rounded-b-2xl border-t border-gray-200 animate-fadeIn overflow-hidden">
                    <ul className="flex flex-col space-y-1 p-4 text-gray-700 font-medium">
                        <li>
                            <Link
                                href="/"
                                className="block px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                                onClick={handleLinkClick}
                            >
                                Beranda
                            </Link>
                        </li>

                        {/* Mobile Dropdown */}
                        <li>
                            <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                            >
                                <span>Profil</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${
                                        openDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Mobile Dropdown Menu with Animation */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openDropdown
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <ul className="mt-2 ml-3 border-l-2 border-gray-300 pl-4 space-y-2 text-sm text-gray-600">
                                    <li>
                                        <Link
                                            href="/profil-organisasi"
                                            className="block py-2 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                                            onClick={handleLinkClick}
                                        >
                                            Profil Organisasi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/sejarah"
                                            className="block py-2 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                                            onClick={handleLinkClick}
                                        >
                                            Sejarah
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/struktur-organisasi"
                                            className="block py-2 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                                            onClick={handleLinkClick}
                                        >
                                            Struktur Organisasi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/achievements"
                                            className="block py-2 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                                            onClick={handleLinkClick}
                                        >
                                            Achievement
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <Link
                                href="/galeri-himpunan"
                                className="block px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                                onClick={handleLinkClick}
                            >
                                Galeri
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/kontak"
                                className="block px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                                onClick={handleLinkClick}
                            >
                                Kontak
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
