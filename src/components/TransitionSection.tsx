'use client';

import { motion } from 'framer-motion';

export function TransitionSection() {
    return (
        <section id="inside" className="min-h-[120vh] -mt-[30vh] flex flex-col items-center justify-center bg-[#0E0E11] px-4 py-24 text-center z-10 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6">
                    Inside, it’s not magic.
                </h2>
                <p className="text-2xl md:text-4xl text-white/50 font-light leading-relaxed">
                    It’s sensors, switches, and structure <br className="hidden md:block" />
                    working together.
                </p>
            </motion.div>
        </section>
    );
}
