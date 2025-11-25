import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen gap-4 items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <img
                        src="/favicon.svg"
                        alt="Logo"
                        className="h-72 w-72 mb-6"
                    />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
