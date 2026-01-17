'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';

const cards = [
    { title: "Gaming", subtitle: "Dominate the lobby", color: "from-blue-500 to-cyan-500" },
    { title: "Designing", subtitle: "Pixel perfect flow", color: "from-purple-500 to-pink-500" },
    { title: "Coding", subtitle: "Stay in the zone", color: "from-emerald-500 to-green-500" },
    { title: "Creating", subtitle: "Unleash potential", color: "from-orange-500 to-red-500" },
];

function Card({ title, subtitle, color, index }: { title: string, subtitle: string, color: string, index: number }) {
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
            className="relative w-full aspect-[4/5] perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-end overflow-hidden group hover:border-white/20 transition-colors"
            >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${color} blur-xl`} />

                <div className="relative z-10 transform translate-z-20">
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <p className="text-white/50">{subtitle}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function GravityCards() {
    return (
        <section className="py-32 px-6 md:px-20 bg-[#0E0E11]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <Card key={card.title} {...card} index={i} />
                ))}
            </div>
        </section>
    );
}
