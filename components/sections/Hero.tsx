"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { portfolioData } from "@/lib/portfolioData";
import { ArrowDown, Download, ExternalLink } from "lucide-react";



// ─── Magnetic Button ─────────────────────────────────────────────────────────
function MagneticButton({
    children,
    onClick,
    href,
    variant = "primary",
    className = "",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "outline";
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - rect.left - rect.width / 2;
        const dy = e.clientY - rect.top - rect.height / 2;
        x.set(dx * 0.35);
        y.set(dy * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const base =
        variant === "primary"
            ? "relative group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden bg-gradient-to-r from-brand-500 to-brand-400 text-white hover:shadow-[0_0_40px_rgba(98,65,232,0.6)] hover:scale-105"
            : "relative group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-brand-500/40 text-text-primary hover:border-brand-400 hover:bg-brand-500/10 transition-all duration-300";

    const inner = (
        <>
            {variant === "primary" && (
                <span className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
            <span className="relative flex items-center gap-2">{children}</span>
        </>
    );

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block ${className}`}
        >
            {href ? (
                <a href={href} className={base} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {inner}
                </a>
            ) : (
                <button onClick={onClick} className={base}>
                    {inner}
                </button>
            )}
        </motion.div>
    );
}

// ─── Rotating Title ───────────────────────────────────────────────────────────
function RotatingTitle({ titles }: { titles: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % titles.length);
        }, 3000);
        return () => clearInterval(id);
    }, [titles]);

    return (
        <div className="relative h-[1.3em] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.span
                    key={titles[index]}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-brand-400 via-accent to-brand-300 bg-clip-text text-transparent"
                >
                    {titles[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

// ─── Hero Stat ────────────────────────────────────────────────────────────────
function HeroStat({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center px-4">
            <div className="text-2xl md:text-3xl font-bold text-brand-300">{value}</div>
            <div className="text-xs text-text-secondary mt-0.5">{label}</div>
        </div>
    );
}

// ─── Hero (Main) ──────────────────────────────────────────────────────────────
export default function Hero() {
    const { personalInfo } = portfolioData;

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
            {/* Subtle radial glow for depth — canvas bg comes from page.tsx */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(98,65,232,0.15)_0%,transparent_70%)]" />
            </div>

            {/* Content — pt-16 clears the fixed navbar (64px) */}
            <div className="relative z-10 max-w-5xl mx-auto pt-16 pb-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-6"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />
                    Available for freelance work
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-text-primary mb-4"
                >
                    Hi, I&apos;m{" "}
                    <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-accent bg-clip-text text-transparent">
                            {personalInfo.name}
                        </span>
                    </span>
                </motion.h1>

                {/* Rotating Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6"
                >
                    <RotatingTitle titles={personalInfo.rotatingTitles} />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-4"
                >
                    {personalInfo.tagline}
                </motion.p>

                {/* Motto */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-sm text-text-muted max-w-xl mx-auto italic mb-10"
                >
                    &ldquo;{personalInfo.motto}&rdquo;
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-16"
                >
                    <MagneticButton
                        variant="primary"
                        onClick={() => scrollToSection("projects")}
                    >
                        View My Work <ExternalLink size={15} />
                    </MagneticButton>
                    <MagneticButton
                        variant="outline"
                        href={process.env.GITHUB_PAGES === "true" ? "/Portfolio/images/KaushalGujarathiFullStack.pdf" : "/images/KaushalGujarathiFullStack.pdf"}
                    >
                        Download Resume <Download size={15} />
                    </MagneticButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.7 }}
                    className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-8 border-t border-white/5"
                >
                    <HeroStat value="3+" label="Deployed Client Sites" />
                    <div className="w-px h-10 bg-white/10 hidden md:block" />
                    <HeroStat value="100%" label="Client Satisfaction" />
                    <div className="w-px h-10 bg-white/10 hidden md:block" />
                    <HeroStat value="1+" label="Years Experience" />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={() => scrollToSection("skills")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-brand-300 transition-colors"
                aria-label="Scroll down"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={16} />
                </motion.div>
            </motion.button>
        </section>
    );
}
