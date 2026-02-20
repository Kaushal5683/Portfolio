"use client";

import React, { useEffect, useRef } from "react";

interface NeuralBackgroundProps {
    className?: string;
    /** Color of the particles. */
    color?: string;
    /**
     * The opacity of the trails (0.0 to 1.0).
     * Lower = longer trails. Higher = shorter trails.
     */
    trailOpacity?: number;
    /** Number of particles. Default: 600 */
    particleCount?: number;
    /** Speed multiplier. Default: 1 */
    speed?: number;
    /** Background fill color used for trail fade — match your section bg */
    bgColor?: string;
}

export default function FlowFieldBackground({
    className,
    color = "#818cf8",        // brand indigo
    trailOpacity = 0.12,
    particleCount = 600,
    speed = 1,
    bgColor = "13,13,20",     // #0d0d14 = bg-primary
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Halve particles on mobile for performance
        const isMobile = window.innerWidth < 640;
        const count = isMobile ? Math.floor(particleCount * 0.4) : particleCount;
        // Cap DPR: mobile = 1, desktop = 2
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
        // Frame-throttle: mobile targets ~30fps
        const frameInterval = isMobile ? 1000 / 30 : 0;
        let lastFrame = 0;

        let width = container.clientWidth;
        let height = container.clientHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;
        const mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number; y: number;
            vx: number; vy: number;
            age: number; life: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0; this.vy = 0;
                this.age = 0;
                this.life = Math.random() * 200 + 100;
            }

            update() {
                const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
                this.vx += Math.cos(angle) * 0.2 * speed;
                this.vy += Math.sin(angle) * 0.2 * speed;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.vx -= dx * force * 0.05;
                    this.vy -= dy * force * 0.05;
                }

                this.x += this.vx; this.y += this.vy;
                this.vx *= 0.95; this.vy *= 0.95;
                this.age++;
                if (this.age > this.life) this.reset();

                // Wrap around
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0; this.vy = 0;
                this.age = 0;
                this.life = Math.random() * 200 + 100;
            }

            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = color;
                const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
                context.globalAlpha = alpha;
                context.fillRect(this.x, this.y, 1.5, 1.5);
            }
        }

        const init = () => {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            particles = Array.from({ length: count }, () => new Particle());
        };

        const animate = (timestamp: number) => {
            animationFrameId = requestAnimationFrame(animate);
            // Frame throttle on mobile
            if (isMobile && timestamp - lastFrame < frameInterval) return;
            lastFrame = timestamp;
            ctx.fillStyle = `rgba(${bgColor},${trailOpacity})`;
            ctx.fillRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(ctx); });
            ctx.globalAlpha = 1;
        };

        const handleResize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

        // Pause when tab hidden — saves battery
        const handleVisibility = () => {
            if (document.hidden) cancelAnimationFrame(animationFrameId);
            else animationFrameId = requestAnimationFrame(animate);
        };

        let idleCbId: number;
        const start = () => { init(); animationFrameId = requestAnimationFrame(animate); };

        // Defer until idle to avoid blocking LCP / FID
        if ("requestIdleCallback" in window) {
            idleCbId = requestIdleCallback(start, { timeout: 1500 });
        } else {
            setTimeout(start, 100);
        }

        // Use window for mouse tracking so pointer-events-none doesn't block it
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            if ("cancelIdleCallback" in window) cancelIdleCallback(idleCbId);
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [color, trailOpacity, particleCount, speed, bgColor]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none${className ? ` ${className}` : ""}`}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
