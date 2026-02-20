"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { portfolioData, featuredProjects } from "@/lib/portfolioData";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const PATH_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";

function ProjectCard({
    title,
    description,
    client,
    imgUrl,
    demoUrl,
    index,
}: {
    title: string;
    description: string;
    client?: string;
    imgUrl?: string;
    demoUrl?: string;
    index: number;
}) {
    const colors = [
        "from-brand-600/20 to-brand-500/5",
        "from-accent/20 to-accent/5",
        "from-brand-400/20 to-brand-300/5",
    ];
    const borderColors = [
        "border-brand-500/30",
        "border-accent/30",
        "border-brand-400/30",
    ];
    const tagColors = [
        "bg-brand-500/20 text-brand-300 border-brand-500/30",
        "bg-accent/20 text-accent border-accent/30",
        "bg-brand-400/20 text-brand-300 border-brand-400/30",
    ];

    return (
        <div
            className={`relative w-full rounded-3xl overflow-hidden border ${borderColors[index % 3]} bg-bg-card backdrop-blur-sm`}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % 3]} z-0`} />

            <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[300px] md:min-h-[440px]">
                {/* Image side */}
                <div className="md:w-[55%] bg-bg-primary/60 overflow-hidden flex-shrink-0">
                    {imgUrl ? (
                        <div className="relative w-full h-[170px] sm:h-[220px] md:h-full">
                            <Image
                                src={`${PATH_PREFIX}/images/${imgUrl}`}
                                alt={client || title}
                                fill
                                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 55vw"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-[170px] sm:h-[220px] md:h-full flex items-center justify-center text-text-muted">
                            <span className="text-6xl">🖥️</span>
                        </div>
                    )}
                </div>

                {/* Content side */}
                <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-10">
                    {/* Tag */}
                    <div className="mb-2 md:mb-4">
                        <span
                            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[index % 3]}`}
                        >
                            Client Project
                        </span>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        {client && (
                            <p className="text-xs text-text-muted uppercase tracking-widest mb-1.5 font-medium">
                                {client}
                            </p>
                        )}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-2 md:mb-4 leading-tight">
                            {title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                            {description}
                        </p>
                    </div>

                    {/* CTA */}
                    {demoUrl && (
                        <div className="mt-4 md:mt-8">
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-brand-300 transition-colors group"
                            >
                                <span>Visit Live Site</span>
                                <ExternalLink
                                    size={14}
                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ZoomCard({
    project,
    index,
    containerRef,
}: {
    project: (typeof featuredProjects)[0];
    index: number;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const total = featuredProjects.length;
    const start = index / total;
    const end = (index + 1) / total;

    // Card 0 is visible immediately (no entrance animation).
    // Cards 1+ animate in from below as the user scrolls.
    const isFirst = index === 0;

    const scale = useTransform(
        scrollYProgress,
        [start, end],
        isFirst ? [1, 1] : [0.88, 1]
    );
    const opacity = useTransform(
        scrollYProgress,
        isFirst
            ? [end - 0.08, end]
            : [start, start + 0.06, end - 0.08, end],
        isFirst
            ? [1, 0.25]
            : [0, 1, 1, 0.25]
    );
    const y = useTransform(
        scrollYProgress,
        [start, end],
        isFirst ? [0, 0] : [80, 0]
    );

    return (
        <motion.div
            style={{ scale, opacity, y }}
            className="sticky top-[155px] sm:top-[175px] md:top-[270px] mb-4 md:mb-6"
        >
            <div
                style={{
                    zIndex: index + 1,
                    transformOrigin: "top center",
                }}
            >
                <ProjectCard
                    index={index}
                    title={project.title}
                    description={project.description}
                    client={project.client}
                    imgUrl={project.imgUrl}
                    demoUrl={project.demoUrl}
                />
            </div>
        </motion.div>
    );
}

export default function ZoomParallaxProjects() {
    const { sectionDescriptions } = portfolioData;
    const containerRef = useRef<HTMLDivElement>(null);
    const [headerSticky, setHeaderSticky] = useState(true);

    // Release the sticky header once the last card is actively entering view
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const releaseAt = (featuredProjects.length - 1) / featuredProjects.length;
        setHeaderSticky(v < releaseAt);
    });

    return (
        <section
            id="projects"
            className="relative"
        >
            {/* Spacer — pushes header down on initial arrival so it feels contextual */}
            <div className="h-4" />

            {/* Section header — sticks below navbar while cards scroll, releases after last card */}
            <div className={`${headerSticky ? "sticky top-16" : "relative"} z-20 py-4 md:py-7 text-center px-4`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                    <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase mb-1.5">
                        Featured Work
                    </p>
                    <h2 className="text-2xl md:text-4xl font-black text-text-primary mb-1.5 md:mb-2">
                        Client Projects
                    </h2>
                    {/* Hide long description on mobile to save vertical space */}
                    <p className="hidden md:block text-text-secondary text-sm max-w-2xl mx-auto leading-relaxed">
                        {sectionDescriptions.projects}
                    </p>
                </motion.div>
            </div>

            {/* Zoom parallax scroll area — cards stick below the sticky header (64px navbar + ~168px header) */}
            <div
                ref={containerRef}
                className="relative px-4 max-w-5xl mx-auto pt-6 pb-6"
                style={{ height: `${featuredProjects.length * 90}vh` }}
            >
                {featuredProjects.map((project, i) => (
                    <ZoomCard
                        key={project.client || i}
                        project={project}
                        index={i}
                        containerRef={containerRef}
                    />
                ))}
            </div>
        </section>
    );
}
