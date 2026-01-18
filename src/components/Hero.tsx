'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export function Hero() {
    const { scrollY } = useScroll();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Transform values based on scroll position
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);
    const blur = useTransform(scrollY, [0, 800], ["blur(0px)", "blur(10px)"]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
    const y = useTransform(scrollY, [0, 800], [0, 100]); // Parallax effect

    // Load images
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 1; i <= 120; i++) {
                const img = new Image();
                const paddedIndex = i.toString().padStart(3, '0');
                img.src = `/hero-sequence/ezgif-frame-${paddedIndex}.jpg`;

                // We don't necessarily need to await each onload for performance, 
                // but for a smooth start it helps. 
                // Let's just push (browser caches) and trust the canvas draw.
                // Actually, preloading is better.
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });

                if (!isMounted) return;
                loadedImages.push(img);
            }

            if (isMounted) {
                setImages(loadedImages);
                setIsLoaded(true);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, []);

    // Animation Loop
    useEffect(() => {
        if (!canvasRef.current || images.length === 0 || !isLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let currentFrame = 0;
        let lastFrameTime = 0;
        const fps = 24; // Smooth speed (5s loop)
        const frameInterval = 1000 / fps;

        const render = (time: number) => {
            if (!isInView) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const deltaTime = time - lastFrameTime;

            if (deltaTime >= frameInterval) {
                const img = images[currentFrame];

                // Draw image 'cover' style
                const w = canvas.width;
                const h = canvas.height;
                // Avoid div by zero
                if (img.height === 0) return;

                const imgRatio = img.width / img.height;
                const canvasRatio = w / h;

                let drawW, drawH, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawW = w;
                    drawH = w / imgRatio;
                    offsetX = 0;
                    offsetY = (h - drawH) / 2;
                } else {
                    drawH = h;
                    drawW = h * imgRatio;
                    offsetX = (w - drawW) / 2;
                    offsetY = 0;
                }

                ctx.clearRect(0, 0, w, h);
                ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

                currentFrame = (currentFrame + 1) % images.length;
                lastFrameTime = time;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current || !canvasRef.current) return;
            canvasRef.current.width = containerRef.current.clientWidth;
            canvasRef.current.height = containerRef.current.clientHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [images, isLoaded, isInView]);

    return (
        <section ref={containerRef} id="intro" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E0E11]">

            {/* Background Canvas Sequence */}
            <motion.div
                style={{ opacity, filter: blur, scale }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Fallback/Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 bg-[#0E0E11] flex items-center justify-center">
                        {/* Optional: Add a spinner or just keep dark */}
                        <div className="w-full h-full bg-[#0E0E11]" />
                    </div>
                )}

                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] via-black/40 to-[#0E0E11]/80" />
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
