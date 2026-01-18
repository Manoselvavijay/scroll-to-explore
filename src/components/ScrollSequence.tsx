'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 40;

export function ScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Opacity transforms for text
    const text1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

    // Canvas exit transition
    const canvasOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
    const canvasBlur = useTransform(scrollYProgress, [0.95, 1], ["blur(0px)", "blur(10px)"]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise((resolve) => {
                    const img = new Image();
                    const numStr = i.toString().padStart(3, '0');
                    img.src = `/sequences/ezgif-frame-${numStr}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(null);
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Canvas Drawing Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // "Cover" logic - Fill the screen
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas (relative to aspect), so it needs to match height and crop width
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imgRatio;
        } else {
            // Image is taller/narrower, so it needs to match width and crop height
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgRatio;
        }

        const offsetX = (canvasWidth - drawWidth) / 2;
        // Bias vertical alignment towards the bottom to prevent cropping the mouse base (0.85 instead of 0.5)
        const offsetY = (canvasHeight - drawHeight) * 0.85;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Resize handler
    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return;

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(Math.round(frameIndex.get()));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial sizing

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images]);

    // Update on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (isLoaded && images.length > 0) {
            // Use requestAnimationFrame for smooth drawing
            requestAnimationFrame(() => renderFrame(Math.round(latest)));
        }
    });

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-[#0E0E11]">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 font-mono text-sm z-20">
                        LOADING SEQUENCE...
                    </div>
                )}

                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        objectFit: 'cover',
                        opacity: canvasOpacity,
                        filter: canvasBlur
                    }}
                />

                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <motion.h2
                        style={{ opacity: text1Opacity, filter: "drop-shadow(0 0 10px rgba(0,243,255,0.5))" }}
                        className="absolute text-5xl md:text-8xl font-bold tracking-tight text-white text-center"
                    >
                        I play games.
                    </motion.h2>

                    <motion.h2
                        style={{ opacity: text2Opacity, filter: "drop-shadow(0 0 10px rgba(255,0,255,0.5))" }}
                        className="absolute text-5xl md:text-8xl font-bold tracking-tight text-white text-center"
                    >
                        Same mouse.<br />
                        <span className="text-white/50">Different focus.</span>
                    </motion.h2>

                    <motion.h2
                        style={{ opacity: text3Opacity, filter: "drop-shadow(0 0 10px rgba(188,19,254,0.5))" }}
                        className="absolute text-5xl md:text-8xl font-bold tracking-tight text-white text-center"
                    >
                        I build things.
                    </motion.h2>
                </div>
            </div>
        </section>
    );
}
