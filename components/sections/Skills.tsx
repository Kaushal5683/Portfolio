"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolioData";

// Skill icon map (emoji fallback for tech stack icons)
const skillIcons: Record<string, string> = {
    // Languages
    Java: "☕",
    SQL: "🗃️",
    HTML: "🌐",
    CSS: "🎨",
    JavaScript: "⚡",
    TypeScript: "🔷",
    Python: "🐍",
    PHP: "🐘",
    // Frameworks
    "Spring Boot": "🍃",
    Hibernate: "🔥",
    Angular: "🅰️",
    React: "⚛️",
    "Tailwind CSS": "💨",
    "Node.js": "🟢",
    // Tools
    Git: "🔀",
    GitHub: "🐙",
    "VS Code": "💻",
    Eclipse: "🌑",
    Postman: "📮",
    Docker: "🐳",
    // Databases
    MySQL: "🐬",
    PostgreSQL: "🐘",
    MongoDB: "🍃",
    // Technical skills
    "Backend Development": "⚙️",
    "Java Development": "☕",
    "Webpage Design": "🖥️",
    "API Development": "🔌",
    // Soft
    "Quick Learner": "🚀",
    "Fast Problem Solver": "🧩",
    "Active Listener": "👂",
    "Efficient Communication": "💬",
};

interface SkillChipProps {
    name: string;
    category: string;
}

function SkillChip({ name }: SkillChipProps) {
    const icon = skillIcons[name] || "✦";
    return (
        <div className="flex-shrink-0 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/8 bg-bg-card/80 text-text-secondary text-sm font-medium hover:border-brand-500/40 hover:text-text-primary hover:bg-brand-500/10 transition-all duration-300 cursor-default">
            <span className="text-base leading-none">{icon}</span>
            {name}
        </div>
    );
}

function MarqueeRow({
    items,
    direction,
    category,
}: {
    items: string[];
    direction: "ltr" | "rtl";
    category: string;
}) {
    // Duplicate for seamless loop
    const doubled = [...items, ...items, ...items];
    const animClass =
        direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl";

    return (
        <div className="relative overflow-hidden py-2">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none" />

            <div className={`flex gap-3 ${animClass} w-max`}>
                {doubled.map((item, i) => (
                    <SkillChip key={`${item}-${i}`} name={item} category={category} />
                ))}
            </div>
        </div>
    );
}

interface CategoryHeaderProps {
    label: string;
    color: string;
}

function CategoryHeader({ label, color }: CategoryHeaderProps) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                {label}
            </span>
        </div>
    );
}

export default function Skills() {
    const { skills, sectionDescriptions } = portfolioData;

    return (
        <section
            id="skills"
            className="relative py-28 bg-bg-secondary overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(98,65,232,0.12)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
                        What I Work With
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
                        Skills &amp; Technologies
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        {sectionDescriptions.technicalSkills}
                    </p>
                </motion.div>

                {/* Marquee rows */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                >
                    <CategoryHeader label="Programming Languages" color="bg-brand-400" />
                    <MarqueeRow
                        items={skills.languages}
                        direction="ltr"
                        category="language"
                    />

                    <div className="pt-4">
                        <CategoryHeader label="Frameworks & Libraries" color="bg-accent" />
                    </div>
                    <MarqueeRow
                        items={[...skills.frameworks, ...skills.databases]}
                        direction="rtl"
                        category="framework"
                    />

                    <div className="pt-4">
                        <CategoryHeader
                            label="Tools & Technical Skills"
                            color="bg-brand-300"
                        />
                    </div>
                    <MarqueeRow
                        items={[...skills.tools, ...skills.technical]}
                        direction="ltr"
                        category="tool"
                    />
                </motion.div>

                {/* Soft skills grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {skills.soft.map((skill) => (
                        <div
                            key={skill}
                            className="group relative flex flex-col items-center text-center p-6 rounded-2xl border border-white/8 bg-bg-card/50 backdrop-blur-sm hover:border-brand-500/40 hover:bg-brand-500/5 transition-all duration-300"
                        >
                            <span className="text-3xl mb-3">
                                {skillIcons[skill] || "✦"}
                            </span>
                            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                                {skill}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
