import React from "react";
import { Link } from "@inertiajs/react";
import { Mail, Phone, MapPin, Facebook, Instagram, Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-5 grid md:grid-cols-4 gap-8 md:gap-10">
                {/* Brand Section - Full width on mobile */}
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-3">Himastat Unhas</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Membangun desa dengan semangat kebersamaan dan transparansi.
                        Bersama menuju masa depan yang lebih maju dan berdaya saing.
                    </p>
                </div>

                {/* Navigation - Hidden on mobile, shown on md+ */}
                <div className="hidden md:block">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Navigasi
                    </h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                            <Link href="/" className="hover:text-white transition">
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link href="/profil-organisasi" className="hover:text-white transition">
                                Profil Organisasi
                            </Link>
                        </li>
                        <li>
                            <Link href="/galeri" className="hover:text-white transition">
                                Galeri
                            </Link>
                        </li>
                        <li>
                            <Link href="/kontak" className="hover:text-white transition">
                                Kontak
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info - Compact on mobile */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Kontak
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <MapPin size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                            <span className="break-words">Jl. Poros Unhas No. 123, Makassar</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} className="text-indigo-400 flex-shrink-0" />
                            <span>+62 812-3456-7890</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Mail size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                            <span className="break-all">himastatfmipaunhas@mail.cpm</span>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Sosial Media
                    </h3>
                    <div className="flex gap-3">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="bg-gray-700 hover:bg-indigo-600 transition p-2.5 rounded-full"
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="bg-gray-700 hover:bg-indigo-600 transition p-2.5 rounded-full"
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="#"
                            aria-label="Website"
                            className="bg-gray-700 hover:bg-indigo-600 transition p-2.5 rounded-full"
                        >
                            <Globe size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700/60 mt-8 py-4 text-center text-sm text-gray-500 px-4">
                © {new Date().getFullYear()} <span className="text-sky-600 font-medium">Himastat Unhas</span>. 
                All rights reserved
            </div>
        </footer>
    );
}