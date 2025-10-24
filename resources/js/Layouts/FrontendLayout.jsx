import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Frontend/Navbar";
import Footer from "@/Components/Frontend/Footer";

export default function FrontendLayout({ title, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 overflow-x-hidden">
            <Head title={title} />

            {/* Navbar transparan di atas jumbotron */}
            <Navbar />

            {/* Konten halaman */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
