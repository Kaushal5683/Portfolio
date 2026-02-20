"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export interface ExpandableCardItem {
    title: string;
    description: string;
    src?: string;                // image path (optional)
    ctaText?: string;
    ctaLink?: string;
    githubLink?: string;
    content: string;
    badge?: string;
    featured?: boolean;
    placeholderColor?: string;   // tailwind gradient classes
}

const DEFAULT_GRADIENTS = [
    "from-brand-900 to-indigo-900",
    "from-violet-900 to-purple-900",
    "from-blue-950 to-indigo-900",
    "from-emerald-950 to-teal-900",
    "from-cyan-950 to-blue-900",
    "from-rose-950 to-pink-900",
];

export function ExpandableCardGrid({ items }: { items: ExpandableCardItem[] }) {
    const [active, setActive] = useState<ExpandableCardItem | null>(null);
    const id = useId();
    const overlayRef = useRef<HTMLDivElement>(null);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = active ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [active]);

    // Escape key
    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, []);

    useOutsideClick(overlayRef, () => setActive(null));

    return (
        <>
            {/* ── Backdrop ──────────────────────────────────── */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* ── Expanded card ─────────────────────────────── */}
            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 z-50 grid place-items-center p-4">
                        <motion.div
                            ref={overlayRef}
                            key="overlay"
                            initial={{ opacity: 0, scale: 0.94, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-bg-card shadow-2xl"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setActive(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center hover:bg-black/80 transition-colors"
                            >
                                <X size={14} className="text-white" />
                            </button>

                            {/* Image */}
                            {active.src ? (
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={active.src}
                                        alt={active.title}
                                        className="w-full h-58 object-cover object-top"
                                    />
                                </div>
                            ) : (
                                <div className={`h-40 bg-gradient-to-br ${active.placeholderColor ?? DEFAULT_GRADIENTS[0]} flex items-center justify-center`}>
                                    <span className="text-5xl font-black text-white/10 uppercase">{active.title.charAt(0)}</span>
                                </div>
                            )}

                            {/* Body */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex-1 min-w-0">
                                        {active.badge && (
                                            <p className="text-xs text-amber-400 font-semibold tracking-widest uppercase mb-1">{active.badge}</p>
                                        )}
                                        {active.featured && (
                                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/80 text-white uppercase tracking-widest mb-1.5">
                                                ⭐ Client Project
                                            </span>
                                        )}
                                        <h3 className="text-lg font-bold text-text-primary leading-snug">{active.title}</h3>
                                        <p className="text-sm text-text-secondary mt-0.5">{active.description}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-text-secondary leading-relaxed border-t border-white/8 pt-4 mb-5">
                                    {active.content}
                                </p>

                                {/* Links */}
                                <div className="flex items-center gap-3">
                                    {active.githubLink && (
                                        <a href={active.githubLink} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-text-secondary hover:text-text-primary hover:border-white/20 transition-all">
                                            <Github size={14} /> Code
                                        </a>
                                    )}
                                    {active.ctaLink && (
                                        <a href={active.ctaLink} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white text-sm font-semibold hover:shadow-[0_0_16px_rgba(98,65,232,0.5)] transition-all">
                                            <ExternalLink size={14} /> {active.ctaText ?? "Live Demo"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Grid ──────────────────────────────────────── */}
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    // ⚡ KEY FIX: NO layoutId on the outer li — cards never disappear
                    <li
                        key={item.title}
                        onClick={() => setActive(item)}
                        className="group cursor-pointer rounded-2xl border bg-bg-card/60 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(98,65,232,0.12)] hover:-translate-y-0.5"
                        style={{ borderColor: item.featured ? "rgba(98,65,232,0.35)" : "rgba(255,255,255,0.08)" }}
                    >
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden">
                            {item.src ? (
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-28 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            ) : (
                                <div className={`h-28 bg-gradient-to-br ${item.placeholderColor ?? DEFAULT_GRADIENTS[idx % DEFAULT_GRADIENTS.length]} flex items-center justify-center`}>
                                    <span className="text-3xl font-black text-white/10 uppercase">{item.title.charAt(0)}</span>
                                </div>
                            )}
                            {item.featured && (
                                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/80 border border-brand-400/30 text-[9px] font-bold text-white uppercase tracking-widest">
                                    ⭐ Client
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-3">
                            {item.badge && (
                                <p className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase mb-0.5 truncate">{item.badge}</p>
                            )}
                            <h3 className="text-xs font-bold text-text-primary leading-snug line-clamp-2">{item.title}</h3>
                            <p className="text-[10px] text-text-muted mt-0.5 truncate">{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
