'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureProps {
    id?: string;
    title: string;
    description: ReactNode; // Changed to ReactNode to allow multiline or rich text
    align?: 'left' | 'right' | 'center';
    children?: ReactNode;
}

export function FeatureSection({ id, title, description, align = 'center', children }: FeatureProps) {
    return (
        <section id={id} className="min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-20 relative overflow-hidden">

            {/* Neon Background Glow Element */}
            <div className={`absolute top-1/2 ${align === 'left' ? 'left-[-10%]' : align === 'right' ? 'right-[-10%]' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 w-[600px] h-[600px] ${align === 'left' ? 'bg-cyan-500/10' : align === 'right' ? 'bg-purple-500/10' : 'bg-magenta-500/10'} rounded-full blur-[150px] pointer-events-none mix-blend-screen`} />

            {/* Additional crisp glow spot */}
            <div className={`absolute top-1/2 ${align === 'left' ? 'left-[10%]' : align === 'right' ? 'right-[10%]' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 w-[200px] h-[200px] ${align === 'left' ? 'bg-cyan-400/20' : align === 'right' ? 'bg-purple-400/20' : 'bg-pink-400/20'} rounded-full blur-[80px] pointer-events-none`} />

            <div className={`z-10 max-w-5xl w-full flex flex-col ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'}`}>
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-bold mb-8 text-white"
                >
                    {title}
                </motion.h3>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-3xl text-white/60 max-w-3xl font-light leading-relaxed"
                >
                    {description}
                </motion.div>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 w-full"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
