import React from "react";
import { Head } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";

import JumbotronSection from "@/Components/Section/JumbotronSection";
import SambutanSection from "@/Components/Section/SambutanSection";
import VisiMisiSection from "@/Components/Section/VisiMisiSection";
import DivisiSection from "@/Components/Section/DivisiSection";
import AlumniSection from "@/Components/Section/AlumniSection";
import AboutSection from "@/Components/Section/AboutSection";

export default function Beranda({
    jumbotron,
    sambutan,
    visimisi,
    divisi,
    alumniPath,
}) {
    const mainJumbotron = jumbotron?.[0] || {};
    const mainSambutan = sambutan?.[0] || {};
    const mainVisiMisi = visimisi?.[0] || {};

    return (
        <FrontendLayout>
            <Head>
                <title>Beranda — Himastat FMIPA Unhas</title>

                {/* SEO Meta */}
                <meta
                    name="description"
                    content="Himastat FMIPA Universitas Hasanuddin. Informasi profil organisasi, visi misi, divisi, galeri, kegiatan, dan alumni Statistika Unhas."
                />
                <meta
                    name="keywords"
                    content="Himastat, Statistika Unhas, Himpunan Statistika, FMIPA Unhas, Organisasi Mahasiswa Unhas"
                />
                <link rel="canonical" href="https://himastat.sci.unhas.ac.id/" />

                {/* Open Graph */}
                <meta property="og:title" content="Himastat FMIPA Unhas" />
                <meta
                    property="og:description"
                    content="Website resmi Himpunan Mahasiswa Statistika FMIPA Universitas Hasanuddin."
                />
                <meta
                    property="og:image"
                    content={mainJumbotron?.image_url || "/default-og.png"}
                />
                <meta
                    property="og:url"
                    content="https://himastat.sci.unhas.ac.id/"
                />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Himastat FMIPA Universitas Hasanuddin"
                />
                <meta
                    name="twitter:description"
                    content="Informasi lengkap tentang Himastat FMIPA Unhas, kegiatan, divisi, dan alumni."
                />
                <meta
                    name="twitter:image"
                    content={mainJumbotron?.image_url || "/default-og.png"}
                />
            </Head>

            <JumbotronSection data={mainJumbotron} />
            <AboutSection />
            <SambutanSection data={mainSambutan} />
            <VisiMisiSection data={mainVisiMisi} />
            <DivisiSection data={divisi} />
            <AlumniSection data={alumniPath} />
        </FrontendLayout>
    );
}
