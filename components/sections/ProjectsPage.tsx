"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import { ExpandableCardGrid, type ExpandableCardItem } from "@/components/ui/ExpandableCardGrid";

function inferTags(title: string, description: string): string {
    const text = (title + " " + description).toLowerCase();
    const tags: string[] = [];
    if (text.includes("react")) tags.push("React");
    if (text.includes("next")) tags.push("Next.js");
    if (text.includes("angular")) tags.push("Angular");
    if (text.includes("node") || text.includes("express")) tags.push("Node.js");
    if (text.includes("mern")) tags.push("MERN");
    if (text.includes("java") && !text.includes("javascript")) tags.push("Java");
    if (text.includes("spring")) tags.push("Spring Boot");
    if (text.includes("python")) tags.push("Python");
    if (text.includes("sql") || text.includes("mysql")) tags.push("SQL");
    if (text.includes("tailwind")) tags.push("Tailwind");
    if (text.includes("ai") || text.includes("minimax") || text.includes("chatbot") || text.includes("voice")) tags.push("AI");
    if (text.includes("arduino") || text.includes("esp32") || text.includes("sonar") || text.includes("embedded")) tags.push("Embedded");
    if (text.includes("typescript")) tags.push("TypeScript");
    return tags.slice(0, 3).join(" · ") || "Project";
}

const GRADIENTS = [
    "from-brand-900 to-indigo-900",
    "from-violet-900 to-purple-900",
    "from-blue-950 to-indigo-900",
    "from-emerald-950 to-teal-900",
    "from-cyan-950 to-blue-900",
    "from-rose-950 to-pink-900",
];

const PATH_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjectsPage() {
    const { projects } = portfolioData;

    const items: ExpandableCardItem[] = projects.map((p, i) => ({
        title: p.title,
        description: p.client ?? inferTags(p.title, p.description),
        src: p.imgUrl ? `${PATH_PREFIX}/images/${p.imgUrl}` : undefined,
        ctaText: p.demoUrl ? "Live Demo" : undefined,
        ctaLink: p.demoUrl,
        githubLink: p.githubUrl,
        badge: p.clientProject ? undefined : inferTags(p.title, p.description),
        content: p.description,
        featured: p.clientProject === true,
        placeholderColor: GRADIENTS[i % GRADIENTS.length],
    }));

    // Featured (client) first, then rest
    const sorted = [
        ...items.filter(i => i.featured),
        ...items.filter(i => !i.featured),
    ];

    return (
        <div className="relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(98,65,232,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

                {/* Back */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-300 transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-14">
                    <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase mb-3">Portfolio</p>
                    <h1 className="text-4xl md:text-6xl font-black text-text-primary mb-4">All Projects</h1>
                    <p className="text-text-secondary max-w-2xl leading-relaxed">
                        {projects.length} projects — client work, personal builds, AI experiments, and embedded systems. Click any card to expand.
                    </p>
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 mb-8 text-xs text-text-muted"
                >
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-brand-500/60 inline-block" /> ⭐ Client = live client project
                    </span>
                    <span>· Click to expand</span>
                </motion.div>

                {/* Grid */}
                <ExpandableCardGrid items={sorted} />

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="mt-20 flex flex-col sm:flex-row items-center gap-4 justify-center p-10 rounded-3xl border border-brand-500/20 bg-brand-500/5"
                >
                    <div className="text-center sm:text-left">
                        <p className="text-lg font-bold text-text-primary">Have a project in mind?</p>
                        <p className="text-sm text-text-secondary mt-1">Let&apos;s build it together.</p>
                    </div>
                    <Link href="/contact"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(98,65,232,0.5)] transition-all duration-300 whitespace-nowrap">
                        Get In Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
