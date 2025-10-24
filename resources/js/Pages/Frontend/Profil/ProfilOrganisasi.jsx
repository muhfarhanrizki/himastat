import React from "react";
import { Head } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";

import JumbotronSection from "@/Components/Section/JumbotronSection";
import SambutanSection from "@/Components/Section/SambutanSection";
import VisiMisiSection from "@/Components/Section/VisiMisiSection";
import DivisiSection from "@/Components/Section/DivisiSection";
import AlumniSection from "@/Components/Section/AlumniSection";

export default function Beranda() {

    return (
        <FrontendLayout>
            <Head title="Beranda" />
            <h1>Tes</h1>
        </FrontendLayout>
    );
}
