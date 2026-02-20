"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolioData";
import {
    Briefcase, GraduationCap, Award, ArrowLeft,
    CheckCircle, MapPin, Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ExpandableCardGrid, type ExpandableCardItem } from "@/components/ui/ExpandableCardGrid";

// ─── Section header ──────────────────────────────────────────────────────────
function SectionHeading({ icon: Icon, label, title }: { icon: React.ElementType; label: string; title: string }) {
    return (
        <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-brand-300" />
            </div>
            <div>
                <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase">{label}</p>
                <h2 className="text-2xl md:text-3xl font-black text-text-primary">{title}</h2>
            </div>
        </div>
    );
}

// ─── Experience card ─────────────────────────────────────────────────────────
function ExpCard({ title, company, period, description, skills, index }: {
    title: string; company: string; period: string;
    description: string; skills: string[]; index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-10 last:pb-0"
        >
            {/* Timeline line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/60 to-transparent last:hidden" />
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-brand-500/60 bg-bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
            </div>

            <div className="rounded-2xl border border-white/8 bg-bg-card/50 backdrop-blur-sm p-6 hover:border-brand-500/30 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                        <h3 className="text-base font-bold text-text-primary">{title}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <MapPin size={12} className="text-brand-400" />
                            <span className="text-sm text-text-secondary">{company}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted border border-white/10 rounded-full px-3 py-1">
                        <Calendar size={11} />
                        {period}
                    </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                        <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full border border-brand-500/25 bg-brand-500/10 text-brand-300">
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Education card ───────────────────────────────────────────────────────────
function EduCard({ degree, institution, period, description, achievements, current, index }: {
    degree: string; institution: string; period: string;
    description: string; achievements: string[]; current?: boolean; index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-10 last:pb-0"
        >
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 to-transparent" />
            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-accent/60 bg-bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
            </div>

            <div className="rounded-2xl border border-white/8 bg-bg-card/50 backdrop-blur-sm p-6 hover:border-accent/30 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-text-primary">{degree}</h3>
                            {current && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                                    Current
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <GraduationCap size={12} className="text-accent" />
                            <span className="text-sm text-text-secondary">{institution}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted border border-white/10 rounded-full px-3 py-1">
                        <Calendar size={11} />
                        {period}
                    </div>
                </div>
                {description && <p className="text-sm text-text-secondary leading-relaxed mb-3">{description}</p>}
                {achievements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {achievements.map((a) => (
                            <div key={a} className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                                <CheckCircle size={10} />
                                {a}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}


// ─── Main ─────────────────────────────────────────────────────────────────────
const IS_GITHUB_PAGES = process.env.GITHUB_PAGES === "true";
const PATH_PREFIX = IS_GITHUB_PAGES ? "/Portfolio" : "";

export default function AboutPage() {
    const { personalInfo, experience, education, certificates } = portfolioData;

    return (
        <div className="relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(98,65,232,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">

                {/* Back link */}
                <Link
                    href="/#about"
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-300 transition-colors mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Hero banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-20"
                >
                    <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

                        {/* ── Text ── */}
                        <div className="flex-1 min-w-0">
                            <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase mb-3">Full Profile</p>
                            <h1 className="text-4xl md:text-6xl font-black text-text-primary mb-4">
                                About{" Me"}
                            </h1>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                {personalInfo.description[0]}
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                {personalInfo.description[1]}
                            </p>

                            {/* Availability pill */}
                            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                                Available for freelance &amp; full-time
                            </div>
                        </div>

                        {/* ── Photo ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative flex-shrink-0"
                        >
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 to-accent opacity-30 blur-2xl scale-110 pointer-events-none" />

                            {/* Border gradient ring */}
                            <div className="relative p-[3px] rounded-full bg-gradient-to-br from-brand-400 via-accent to-brand-600">
                                <div className="rounded-full overflow-hidden w-52 h-52 md:w-64 md:h-64 bg-bg-card">
                                    <Image
                                        src={`${PATH_PREFIX}/images/ME.webp`}
                                        alt="Kaushal Gujarathi — Java Backend & Full Stack Developer"
                                        fill
                                        className="object-cover object-top"
                                        loading="eager"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-bg-card border border-white/10 text-xs font-semibold text-text-primary shadow-lg flex items-center gap-1.5">
                                <span className="text-brand-400">⚡</span> Java &amp; Full Stack Dev
                            </div>
                        </motion.div>

                    </div>
                </motion.div>


                {/* ── Experience + Education side by side ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <section>
                        <SectionHeading icon={Briefcase} label="Career" title="Work Experience" />
                        <div>
                            {experience.map((e, i) => (
                                <ExpCard key={e.id} {...e} index={i} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionHeading icon={GraduationCap} label="Academic" title="Education" />
                        <div>
                            {education.map((e, i) => (
                                <EduCard key={e.id} {...e} index={i} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── Certificates ───────────────── */}
                <section className="mb-16">
                    <SectionHeading icon={Award} label="Certifications" title="Certificates" />
                    <ExpandableCardGrid
                        items={certificates.map((c): ExpandableCardItem => ({
                            title: c.title,
                            description: c.institute,
                            src: `/images/${c.imgUrl}`,
                            badge: c.completionDate,
                            content: `Issued by ${c.institute} · Completed ${c.completionDate}`,
                        }))}
                    />
                </section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 justify-center p-10 rounded-3xl border border-brand-500/20 bg-brand-500/5"
                >
                    <div className="text-center sm:text-left">
                        <p className="text-lg font-bold text-text-primary">Interested in working together?</p>
                        <p className="text-sm text-text-secondary mt-1">Let&apos;s build something amazing.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(98,65,232,0.5)] transition-all duration-300 whitespace-nowrap"
                    >
                        Get In Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
