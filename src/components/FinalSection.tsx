'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';

// --- Card Component (Internal) ---
function FeatureCard({ title, subtitle, index }: { title: string, subtitle: string, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 150, damping: 20 });

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full aspect-square perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full bg-[#0E0E11]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center overflow-hidden group hover:border-white/20 transition-colors cursor-default shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br from-purple-500 to-blue-500 blur-xl" />

                <div className="relative z-10 transform translate-z-20 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-white/60 text-sm">{subtitle}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function FinalSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#0E0E11] text-center px-4 relative overflow-hidden py-32">

            {/* Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
            />
            {/* Added Pink Glow */}
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none delay-1000"
            />

            <div className="relative z-10 max-w-4xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        Create without limits.
                    </h2>
                    <p className="text-2xl md:text-3xl text-white/40 font-light mb-12">
                        The ultimate tool for those who shape the game.
                    </p>
                </motion.div>

                {/* Functionality/Abstract Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-3xl mx-auto px-4">
                    <FeatureCard title="Precision" subtitle="Pixel-perfect tracking for every movement." index={0} />
                    <FeatureCard title="Speed" subtitle="Zero latency. Instant reaction." index={1} />
                    <FeatureCard title="Control" subtitle="Ergonomic design for absolute mastery." index={2} />
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0E0E11] to-transparent pointer-events-none" />
        </section>
    );
}
