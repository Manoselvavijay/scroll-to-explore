'use client';

export function Footer() {
    return (
        <footer className="py-8 bg-[#0E0E11] text-center border-t border-white/5">
            <p className="text-white/20 text-sm">
                © {new Date().getFullYear()} MANOSELVAVIJAY. All rights reserved.
            </p>
        </footer>
    );
}
