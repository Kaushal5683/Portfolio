"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Shows a thin top-bar progress indicator ONLY during client-side route
 * navigation that takes longer than SHOW_THRESHOLD_MS.
 *
 * On first page load (hard navigation / SSG hydration) the bar is NEVER
 * shown — we only track changes from the initial path.
 */
const SHOW_THRESHOLD_MS = 400;

export default function PageProgress() {
    const pathname = usePathname();
    const [width, setWidth] = useState(0);
    const [visible, setVisible] = useState(false);
    const [completing, setCompleting] = useState(false);

    const showTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    // Track whether we've seen the first path — don't show on initial mount
    const isFirstMount = useRef(true);
    const prevPath     = useRef(pathname);

    const reset = () => {
        if (showTimer.current)    clearTimeout(showTimer.current);
        if (progressTimer.current) clearInterval(progressTimer.current);
        showTimer.current = null;
        progressTimer.current = null;
    };

    const complete = () => {
        reset();
        setWidth(100);
        setCompleting(true);
        setTimeout(() => {
            setVisible(false);
            setCompleting(false);
            setWidth(0);
        }, 400);
    };

    useEffect(() => {
        // First mount — just record the path, never show the bar
        if (isFirstMount.current) {
            isFirstMount.current = false;
            prevPath.current = pathname;
            return;
        }

        // Same path (strict-mode double-fire guard)
        if (pathname === prevPath.current) return;
        prevPath.current = pathname;

        // Client-side navigation started — show bar only if slow
        reset();
        setWidth(0);
        setVisible(false);

        showTimer.current = setTimeout(() => {
            setVisible(true);
            setWidth(25);

            progressTimer.current = setInterval(() => {
                setWidth(w => {
                    if (w >= 85) {
                        clearInterval(progressTimer.current!);
                        return 85;
                    }
                    return w + Math.random() * 10;
                });
            }, 350);
        }, SHOW_THRESHOLD_MS);

        return () => complete();
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!visible && width === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-brand-500 via-accent to-brand-400 shadow-[0_0_8px_rgba(98,65,232,0.8)]"
                style={{
                    width: `${width}%`,
                    transition: completing
                        ? "width 0.3s ease-out, opacity 0.1s ease 0.35s"
                        : "width 0.4s ease",
                    opacity: visible ? 1 : 0,
                }}
            />
        </div>
    );
}
