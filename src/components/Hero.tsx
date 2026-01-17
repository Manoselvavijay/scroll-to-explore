'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
    const { scrollY } = useScroll();

    // Transform values based on scroll position
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);
    const blur = useTransform(scrollY, [0, 800], ["blur(0px)", "blur(10px)"]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
    const y = useTransform(scrollY, [0, 800], [0, 100]); // Parallax effect

    return (
        <section id="intro" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E0E11]">

            {/* Background Image Container */}
            <motion.div
                style={{ opacity, filter: blur, scale }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <img
                    src="/hero-background.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-80"
                />
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] via-black/40 to-[#0E0E11]/80" />
            </motion.div>

            {/* Abstract Background Elements (Subtle Overlay) */}
            <motion.div
                style={{ opacity, y }}
                className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
            >
                {/* Neon Circle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/20 shadow-[0_0_100px_rgba(0,243,255,0.1)]"
                />
            </motion.div>

            {/* Hero Content */}
            <motion.div
                style={{ opacity, y }}
                className="z-10 text-center space-y-8 max-w-4xl px-4 relative"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                >
                    Pure Magic
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="space-y-2 text-lg md:text-xl text-white/80 font-light"
                >
                    <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Your new favorite way to connect with your digital world.</p>
                    <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Playfully precise. Seriously comfortable.</p>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ opacity }} // Fade out scroll indicator too
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase z-10"
            >
                <span className="drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400/50 to-transparent shadow-[0_0_10px_#00f3ff]" />
            </motion.div>
        </section>
    );
}
