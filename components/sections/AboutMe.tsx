"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import { Code2, Layers, Wrench, Database, Sparkles, Brain } from "lucide-react";


// ─── Real SVG Logo map (Devicons CDN) ────────────────────────────────────────
// Uses the free jsdelivr CDN — no install needed, always up-to-date
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const skillLogos: Record<string, string> = {
    // Languages
    Java: `${DEVICON_BASE}/java/java-original.svg`,
    SQL: `${DEVICON_BASE}/mysql/mysql-original.svg`,
    HTML: `${DEVICON_BASE}/html5/html5-original.svg`,
    CSS: `${DEVICON_BASE}/css3/css3-original.svg`,
    JavaScript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
    TypeScript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
    Python: `${DEVICON_BASE}/python/python-original.svg`,
    PHP: `${DEVICON_BASE}/php/php-original.svg`,
    // Frameworks
    "Spring Boot": `${DEVICON_BASE}/spring/spring-original.svg`,
    Hibernate: `${DEVICON_BASE}/hibernate/hibernate-original.svg`,
    Angular: `${DEVICON_BASE}/angularjs/angularjs-original.svg`,
    React: `${DEVICON_BASE}/react/react-original.svg`,
    "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
    "Tailwind CSS": `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
    "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
    Express: `${DEVICON_BASE}/express/express-original.svg`,
    // Databases
    MySQL: `${DEVICON_BASE}/mysql/mysql-original.svg`,
    PostgreSQL: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
    MongoDB: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
    // Tools
    Git: `${DEVICON_BASE}/git/git-original.svg`,
    GitHub: `${DEVICON_BASE}/github/github-original.svg`,
    "VS Code": `${DEVICON_BASE}/vscode/vscode-original.svg`,
    Eclipse: `${DEVICON_BASE}/eclipse/eclipse-original.svg`,
    Postman: `${DEVICON_BASE}/postman/postman-original.svg`,
    Docker: `${DEVICON_BASE}/docker/docker-original.svg`,
    Linux: `${DEVICON_BASE}/linux/linux-original.svg`,
    Maven: `${DEVICON_BASE}/maven/maven-original.svg`,
    IntelliJ: `${DEVICON_BASE}/intellij/intellij-original.svg`,
};

// ─── Logo chip ────────────────────────────────────────────────────────────────
function LogoChip({ name, color, mobileMode = "icon" }: { name: string; color: string; mobileMode?: "icon" | "name" }) {
    const logoSrc = skillLogos[name];
    const [active, setActive] = useState(false);

    const iconNode = logoSrc ? (
        <img src={logoSrc} alt={name} width={22} height={22}
            className="object-contain flex-shrink-0" loading="lazy" />
    ) : (
        <span className="text-base leading-none">✦</span>
    );

    return (
        <>
            {/* ── Mobile ── */}
            {mobileMode === "name" ? (
                // Name-only text pill (for Technical & Soft Skills cards)
                <motion.span
                    whileTap={{ scale: 0.95 }}
                    className={`sm:hidden inline-flex items-center px-2.5 py-1.5 rounded-full text-[10px] font-semibold border cursor-default ${color}`}
                >
                    {name}
                </motion.span>
            ) : (
                // Icon square → tap reveals name below
                <motion.button
                    type="button"
                    aria-label={name}
                    whileTap={{ scale: 0.92 }}
                    onTouchStart={() => setActive(v => !v)}
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                    className={`sm:hidden inline-flex flex-col items-center gap-1 rounded-xl border p-2 w-14 cursor-default transition-all duration-200 ${color} ${active ? "shadow-[0_0_12px_rgba(98,65,232,0.35)]" : ""}`}
                >
                    {iconNode}
                    <span className={`text-[9px] font-semibold leading-tight text-center w-full truncate transition-all duration-200 ${active ? "opacity-100 max-h-4" : "opacity-0 max-h-0 overflow-hidden"}`}>
                        {name}
                    </span>
                </motion.button>
            )}

            {/* ── Desktop (sm+): full pill chip — always icon + name ── */}
            <motion.span
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold border cursor-default transition-all duration-300 ${color}`}
            >
                {logoSrc ? (
                    <img src={logoSrc} alt={name} width={14} height={14}
                        className="flex-shrink-0 object-contain" loading="lazy" />
                ) : (
                    <span className="text-xs leading-none">✦</span>
                )}
                {name}
            </motion.span>
        </>
    );
}


// ─── Bento category card ──────────────────────────────────────────────────────
function SkillCard({ icon: Icon, title, skills, chipColor, delay, mobileMode = "icon" }: {
    icon: React.ElementType; title: string; skills: string[];
    chipColor: string; delay: number; mobileMode?: "icon" | "name";
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.01 }}
            className="relative rounded-2xl border border-white/8 bg-bg-card/60 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:border-brand-500/30 hover:shadow-[0_0_30px_rgba(98,65,232,0.12)] group"
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-brand-400" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-muted">{title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skills.map((s) => <LogoChip key={s} name={s} color={chipColor} mobileMode={mobileMode} />)}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Soft skill badge ─────────────────────────────────────────────────────────
function SoftBadge({ label, emoji }: { label: string; emoji: string }) {
    const [lit, setLit] = useState(false);
    return (
        <motion.div
            onHoverStart={() => setLit(true)}
            onHoverEnd={() => setLit(false)}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 cursor-default
        ${lit ? "border-brand-400/50 bg-brand-500/15 text-brand-300 shadow-[0_0_20px_rgba(98,65,232,0.2)]" : "border-white/10 bg-white/4 text-text-secondary"}`}
        >
            <span>{emoji}</span><span>{label}</span>
        </motion.div>
    );
}

// ─── About Me (Main) ──────────────────────────────────────────────────────────
export default function AboutMe() {
    const { personalInfo, skills } = portfolioData;

    const skillGroups = [
        {
            icon: Code2, title: "Languages", skills: skills.languages,
            chipColor: "bg-brand-500/15 text-brand-300 border-brand-500/25 hover:bg-brand-500/30 hover:border-brand-400/50",
            delay: 0.05, mobileMode: "icon" as const,
        },
        {
            icon: Layers, title: "Frameworks", skills: skills.frameworks,
            chipColor: "bg-sky-500/15 text-sky-300 border-sky-500/25 hover:bg-sky-500/30 hover:border-sky-400/50",
            delay: 0.1, mobileMode: "icon" as const,
        },
        {
            icon: Database, title: "Databases", skills: skills.databases,
            chipColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/30 hover:border-emerald-400/50",
            delay: 0.15, mobileMode: "icon" as const,
        },
        {
            icon: Wrench, title: "Tools", skills: skills.tools,
            chipColor: "bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/30 hover:border-amber-400/50",
            delay: 0.2, mobileMode: "icon" as const,
        },
        {
            icon: Sparkles, title: "Technical Skills", skills: skills.technical,
            chipColor: "bg-pink-500/15 text-pink-400 border-pink-500/25 hover:bg-pink-500/30 hover:border-pink-400/50",
            delay: 0.25, mobileMode: "name" as const,
        },
        {
            icon: Brain, title: "Soft Skills", skills: skills.soft,
            chipColor: "bg-violet-500/15 text-violet-300 border-violet-500/25 hover:bg-violet-500/30 hover:border-violet-400/50",
            delay: 0.3, mobileMode: "name" as const,
        },
    ];

    return (
        <section id="about" className="relative overflow-hidden">
            {/* Soft centre glow for depth only — canvas bg from page.tsx */}

            {/* Soft centre glow for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse,rgba(98,65,232,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* ── Main Content ───────────────────────────────────────────────── */}
            <div className="relative py-20 sm:py-28 px-4">
                <div className="relative max-w-6xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase mb-3">Who I Am</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">About Me</h2>
                        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-brand-500 to-accent mx-auto" />
                    </motion.div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

                        {/* ── Left: Bio ──────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-2 space-y-5"
                        >
                            <div className="space-y-4">
                                {personalInfo.description.map((para, i) => (
                                    <p key={i} className="text-text-secondary leading-relaxed text-sm md:text-base">{para}</p>
                                ))}
                            </div>

                            <div className="w-full h-px bg-white/8" />

                            {/* Stats — 2 columns on mobile, 3 on sm+ */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { value: "1+", label: "Years Exp." },
                                    { value: "3+", label: "Live Projects" },
                                    { value: "100%", label: "Client Sat." },
                                ].map(({ value, label }) => (
                                    <div key={label} className="text-center p-3 sm:p-4 rounded-2xl border border-white/8 bg-bg-card/40">
                                        <div className="text-xl sm:text-2xl font-black text-brand-300">{value}</div>
                                        <div className="text-[10px] sm:text-xs text-text-muted mt-0.5">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* View full profile CTA */}
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold hover:bg-brand-500/20 hover:border-brand-400/50 hover:shadow-[0_0_20px_rgba(98,65,232,0.25)] transition-all duration-300 group"
                            >
                                View Full Profile
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* ── Right: Bento skill grid ─ */}
                        {/* Mobile: 2-col × 3-row. sm+: 2-col. */}
                        <div className="lg:col-span-3 grid grid-cols-2 gap-3 sm:gap-4">
                            {skillGroups.map((group) => <SkillCard key={group.title} {...group} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
