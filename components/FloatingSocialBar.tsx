"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, MessageCircle, Phone, Share2, X } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

const socials = (socialLinks: typeof portfolioData.socialLinks, contactInfo: typeof portfolioData.contactInfo) => [
    { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:bg-[#0077b5] hover:border-[#0077b5]" },
    { href: socialLinks.github, icon: Github, label: "GitHub", color: "hover:bg-[#333] hover:border-[#333]" },
    { href: socialLinks.instagram, icon: Instagram, label: "Instagram", color: "hover:bg-[#e1306c] hover:border-[#e1306c]" },
    { href: socialLinks.whatsapp, icon: MessageCircle, label: "WhatsApp", color: "hover:bg-[#25d366] hover:border-[#25d366]" },
    { href: `tel:${contactInfo.phone.replace(/\s/g, "")}`, icon: Phone, label: "Call", color: "hover:bg-brand-500 hover:border-brand-500" },
];

// ─── Desktop: always-visible right sidebar ──────────────────────────────────
function DesktopBar() {
    const { socialLinks, contactInfo } = portfolioData;
    const items = socials(socialLinks, contactInfo);

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-2.5"
        >
            {items.map(({ href, icon: Icon, label, color }, i) => (
                <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ scale: 1.15, x: -4 }}
                    whileTap={{ scale: 0.92 }}
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-bg-card/80 backdrop-blur-sm text-text-secondary hover:text-white transition-all duration-300 shadow-lg ${color}`}
                >
                    <Icon size={22} />
                    {/* Tooltip */}
                    <span className="absolute right-14 px-2.5 py-1 rounded-lg bg-bg-card border border-white/10 text-xs font-medium text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
                        {label}
                    </span>
                </motion.a>
            ))}
            <div className="mx-auto w-px h-10 bg-gradient-to-b from-white/10 to-transparent mt-1" />
        </motion.div>
    );
}

// ─── Mobile: collapsed toggle button in bottom-left ─────────────────────────
function MobileBar() {
    const [open, setOpen] = useState(false);
    const { socialLinks, contactInfo } = portfolioData;
    const items = socials(socialLinks, contactInfo);

    return (
        <div className="md:hidden fixed bottom-6 right-4 z-50 flex flex-col-reverse items-center gap-3">
            {/* Expanded social buttons — stacked above the toggle */}
            <AnimatePresence>
                {open && items.map(({ href, icon: Icon, label, color }, i) => (
                    <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-label={label}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ duration: 0.25, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/15 bg-bg-card/90 backdrop-blur-sm text-text-secondary hover:text-white transition-all duration-200 shadow-xl ${color}`}
                    >
                        <Icon size={22} />
                    </motion.a>
                ))}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close social links" : "Open social links"}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 text-white shadow-[0_0_24px_rgba(98,65,232,0.5)] border border-brand-400/40"
            >
                <motion.div
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {open ? <X size={24} /> : <Share2 size={22} />}
                </motion.div>
            </motion.button>
        </div>
    );
}

// ─── Combined export ─────────────────────────────────────────────────────────
export default function FloatingSocialBar() {
    return (
        <>
            <DesktopBar />
            <MobileBar />
        </>
    );
}
