import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Error404() {
    return (
        <>
            <Head title="404 - Halaman Tidak Ditemukan" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
                <div className="text-center">
                    {/* Main 404 */}
                    <div className="mb-8">
                        <div className="inline-block bg-gray-700 rounded-2xl shadow-xl p-8 mb-6">
                            <div className="text-8xl font-bold text-white mb-2">
                                4<span className="text-red-500">0</span>4
                            </div>
                            <div className="text-xl text-white font-mono">
                                P-value ={" "}
                                <span className="text-red-500 font-bold">
                                    0.404
                                </span>
                            </div>
                            <div className="mt-3 px-4 py-2 bg-white text-red-700 rounded-lg font-semibold">
                                α = 0.05 → TOLAK H₀!
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Halaman Tidak Signifikan! 📊
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Halaman yang Anda cari berada di luar confidence
                            interval. Seperti data outlier yang harus
                            di-exclude! 😅
                        </p>
                    </div>

                    {/* Button */}
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-800 rounded-md text-white font-medium transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        <svg
                            className="w-6 h-6 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Kembali ke Dashboard
                    </Link>
                </div>
            </div>
        </>
    );
}
