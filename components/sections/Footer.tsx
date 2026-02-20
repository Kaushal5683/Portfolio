"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolioData";
import { Github, Linkedin, Instagram, MessageCircle, Heart } from "lucide-react";

const socialItems = [
    { icon: Github, href: (s: typeof portfolioData.socialLinks) => s.github, label: "GitHub" },
    { icon: Linkedin, href: (s: typeof portfolioData.socialLinks) => s.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: (s: typeof portfolioData.socialLinks) => s.instagram, label: "Instagram" },
    { icon: MessageCircle, href: (s: typeof portfolioData.socialLinks) => s.whatsapp, label: "WhatsApp" },
];

const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    const { personalInfo, socialLinks } = portfolioData;
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-bg-secondary/30 border-t border-white/8 overflow-hidden">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

            {/* ── MOBILE layout (hidden on md+) ──────────────────── */}
            <div className="md:hidden px-6 py-8 flex flex-col items-center gap-5 text-center">
                {/* Name */}
                <p className="text-lg font-black bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                    {personalInfo.name}
                </p>

                {/* Social icons row */}
                <div className="flex items-center gap-3">
                    {socialItems.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href(socialLinks)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-9 h-9 rounded-full border border-white/10 bg-bg-card/60 flex items-center justify-center text-text-secondary hover:text-brand-300 hover:border-brand-500/40 transition-all duration-200"
                        >
                            <Icon size={15} />
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p className="text-xs text-text-muted">
                    © {year} {personalInfo.name} · Made with{" "}
                    <Heart size={10} className="inline text-brand-400 fill-brand-400" />
                </p>
            </div>

            {/* ── DESKTOP layout (hidden on mobile) ──────────────── */}
            <div className="hidden md:block">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-3 gap-12 mb-12">

                        {/* Brand column */}
                        <div className="space-y-4">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl font-black bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent"
                            >
                                {personalInfo.name}
                            </motion.p>
                            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                                {personalInfo.footerTagline}
                            </p>
                            <div className="flex gap-3 pt-1">
                                {socialItems.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href(socialLinks)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 rounded-full border border-white/10 bg-bg-card/60 flex items-center justify-center text-text-secondary hover:text-brand-300 hover:border-brand-500/40 transition-all duration-200"
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation column */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-5">Navigation</p>
                            <ul className="space-y-3">
                                {navLinks.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="text-sm text-text-secondary hover:text-brand-300 transition-colors duration-200"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact column */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-5">Get In Touch</p>
                            <div className="space-y-3">
                                <p className="text-sm text-text-secondary">{personalInfo.footerMotto}</p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(98,65,232,0.4)] transition-all duration-300"
                                >
                                    Hire Me
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/8 pt-8 flex items-center justify-between">
                        <p className="text-xs text-text-muted">
                            © {year} {personalInfo.name}. All rights reserved.
                        </p>
                        <p className="text-xs text-text-muted flex items-center gap-1.5">
                            Built with <Heart size={11} className="text-brand-400 fill-brand-400" /> using Next.js &amp; Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
