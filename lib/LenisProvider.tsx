"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAPScrollProvider
 *
 * Configures GSAP ScrollTrigger for compatibility with the rest of the app.
 *
 * ⚠️  We deliberately do NOT use ScrollTrigger.normalizeScroll() here.
 *     normalizeScroll() proxies native scroll events which breaks Framer
 *     Motion's useScroll — it would read scrollY = 0 the entire time in
 *     the production static build, making all parallax/sticky animations
 *     non-functional.
 *
 * What we do instead:
 * - ignoreMobileResize: prevents scroll jumps when the mobile address
 *   bar appears/disappears (safe, no native scroll interference).
 * - ScrollTrigger.refresh() after mount ensures all scroll-based
 *   calculations are correct once the full page has painted.
 */
export default function GSAPScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Prevent layout recalc when mobile viewport height changes
        ScrollTrigger.config({ ignoreMobileResize: true });

        // Recalculate all scroll positions after full page paint.
        // Wrapped in rAF so it runs after the browser has painted.
        const rafId = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            cancelAnimationFrame(rafId);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return <>{children}</>;
}
