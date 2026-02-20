"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import Image from "next/image";

// Keep a stable random rotation per slot
const rotations = [-8, 6, -5, 9, -7, 4, -6, 8];

const PATH_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function AnimatedTestimonials() {
    const { testimonials, sectionDescriptions } = portfolioData;
    const [active, setActive] = useState(0);
    const total = testimonials.length;

    const next = () => setActive((a) => (a + 1) % total);
    const prev = () => setActive((a) => (a - 1 + total) % total);

    // Autoplay
    useEffect(() => {
        const id = setInterval(next, 5500);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isActive = (i: number) => i === active;

    const t = testimonials[active];

    return (
        <section
            id="testimonials"
            className="relative py-28 bg-bg-secondary/20 overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(98,65,232,0.1)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
                        Client Feedback
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
                        What Clients Say
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        {sectionDescriptions.testimonials}
                    </p>
                </motion.div>

                {/* Aceternity layout: image stack (left) + content (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* ── Left: stacked rotating images ─────────────── */}
                    <div className="relative w-full aspect-video max-w-lg mx-auto md:mx-0">
                        {testimonials.map((t, index) => (
                            <motion.div
                                key={t.id}
                                className="absolute inset-0 origin-bottom"
                                animate={{
                                    opacity: isActive(index) ? 1 : 0.6,
                                    scale: isActive(index) ? 1 : 0.93,
                                    rotate: isActive(index) ? 0 : rotations[index % rotations.length],
                                    zIndex: isActive(index) ? total + 1 : total - index,
                                    y: isActive(index) ? [0, -16, 0] : 0,
                                }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <Image
                                    src={`${PATH_PREFIX}/images/${t.image}`}
                                    alt={t.name}
                                    fill
                                    className="rounded-3xl object-cover object-top border border-white/8 shadow-2xl"
                                    draggable={false}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* ── Right: animated text content ──────────────── */}
                    <div className="flex flex-col justify-between h-full min-h-[320px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="flex flex-col gap-5"
                            >
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} size={16} className="text-brand-300 fill-brand-300" />
                                    ))}
                                </div>

                                {/* Project type badge */}
                                <span className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300">
                                    {t.projectType}
                                </span>

                                {/* Word-by-word blur-in quote — Aceternity's signature effect */}
                                <motion.p className="text-lg md:text-xl text-text-primary font-medium leading-relaxed">
                                    {t.text.split(" ").map((word, i) => (
                                        <motion.span
                                            key={`${active}-${i}`}
                                            initial={{ opacity: 0, filter: "blur(8px)", y: 4 }}
                                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * i }}
                                            className="inline-block mr-1"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.p>

                                {/* Author */}
                                <div className="pt-2">
                                    <p className="text-base font-bold text-text-primary">{t.name}</p>
                                    <p className="text-sm text-text-secondary">{t.position}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center gap-4 mt-10">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: -12 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prev}
                                className="w-10 h-10 rounded-full border border-white/12 bg-bg-card/70 hover:border-brand-500/50 hover:bg-brand-500/10 text-text-secondary hover:text-text-primary transition-all flex items-center justify-center"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={18} />
                            </motion.button>

                            {/* Dot indicators */}
                            <div className="flex gap-1.5">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "bg-brand-400 w-6" : "bg-white/20 w-1.5 hover:bg-white/40"
                                            }`}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 12 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={next}
                                className="w-10 h-10 rounded-full border border-white/12 bg-bg-card/70 hover:border-brand-500/50 hover:bg-brand-500/10 text-text-secondary hover:text-text-primary transition-all flex items-center justify-center"
                                aria-label="Next"
                            >
                                <ChevronRight size={18} />
                            </motion.button>

                            <span className="text-text-muted text-sm ml-1">
                                {active + 1} / {total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
