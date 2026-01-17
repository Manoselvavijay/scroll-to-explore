'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TechnologySection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

    // Engineering focused items
    const items = [
        { label: "My Sensor", desc: "26K DPI. I see everything." },
        { label: "My Switches", desc: "90M Clicks. I don't miss." },
        { label: "My Connection", desc: "1ms. I am instant." },
    ];

    return (
        <section id="technology" ref={containerRef} className="relative min-h-[120vh] flex flex-col items-center py-32 bg-[#0E0E11] overflow-hidden">

            {/* Neon Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="z-10 text-center mb-32 max-w-2xl px-6">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-3xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]"
                >
                    Specs Matter.
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    className="text-lg md:text-xl text-white/50"
                >
                    No fluff. Just performance.
                </motion.p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center z-10 gap-16 md:gap-8">

                {/* Connecting Lines (Desktop) - Neon */}
                <div className="absolute top-1/2 left-0 w-full hidden md:block -translate-y-1/2 -z-10">
                    <svg width="100%" height="100" viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <motion.path
                            d="M50 50 L 750 50"
                            stroke="rgba(0, 243, 255, 0.1)"
                            strokeWidth="2"
                        />
                        <motion.path
                            d="M50 50 L 750 50"
                            stroke="#00f3ff"
                            strokeWidth="2"
                            style={{ pathLength, filter: "drop-shadow(0 0 5px #00f3ff)" }}
                        />
                    </svg>
                </div>

                {/* Connecting Lines (Mobile) */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-cyan-500/10 md:hidden -translate-x-1/2 -z-10">
                    <motion.div
                        style={{ height: useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]), filter: "drop-shadow(0 0 5px #00f3ff)" }}
                        className="w-full bg-cyan-400"
                    />
                </div>

                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="flex flex-col items-center text-center bg-[#0E0E11]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 w-64 h-64 justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    >
                        <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{item.label}</h4>
                        <p className="text-sm text-white/40">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
