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
            <Head title="Himpunan Mahasiswa Statistika Unhas" />

            <JumbotronSection data={mainJumbotron} />
            <AboutSection />
            <SambutanSection data={mainSambutan} />
            <VisiMisiSection data={mainVisiMisi} />
            <DivisiSection data={divisi} />
            <AlumniSection data={alumniPath} />
        </FrontendLayout>
    );
}
