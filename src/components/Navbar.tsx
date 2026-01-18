'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { name: 'Overview', href: '#intro' },
        { name: 'Internal', href: '#inside' },
        { name: 'Control', href: '#precision' },
        { name: 'Form', href: '#comfort' },
        { name: 'Specs', href: '#technology' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none mix-blend-difference">
                <div className="pointer-events-auto z-50">
                    <Link href="/">
                        <Image
                            src="/scroll-logo.svg"
                            alt="Scroll Logo"
                            width={155}
                            height={60}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 pointer-events-auto">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden pointer-events-auto z-50 flex flex-col items-center justify-center gap-1.5 w-10 h-10 group"
                    aria-label="Toggle menu"
                >
                    <motion.div
                        animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-white group-hover:bg-cyan-400 transition-colors"
                    />
                    <motion.div
                        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-8 h-0.5 bg-white group-hover:bg-cyan-400 transition-colors"
                    />
                    <motion.div
                        animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-white group-hover:bg-cyan-400 transition-colors"
                    />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-[#0E0E11] flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl text-white font-light tracking-wider hover:text-cyan-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
