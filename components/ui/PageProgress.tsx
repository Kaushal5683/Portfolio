"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Shows a thin top-bar progress indicator ONLY if route navigation
 * takes longer than SHOW_THRESHOLD_MS. Fast navigations get no loader.
 */
const SHOW_THRESHOLD_MS = 300;

export default function PageProgress() {
    const pathname = usePathname();
    const [width, setWidth] = useState(0);
    const [visible, setVisible] = useState(false);
    const [completing, setCompleting] = useState(false);

    const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const prevPath = useRef(pathname);

    // Reset all state and clear all timers
    const reset = () => {
        if (showTimer.current) clearTimeout(showTimer.current);
        if (progressTimer.current) clearInterval(progressTimer.current);
        showTimer.current = null;
        progressTimer.current = null;
    };

    // Complete the bar (shoot to 100%, then hide)
    const complete = () => {
        reset();
        setWidth(100);
        setCompleting(true);
        setTimeout(() => {
            setVisible(false);
            setCompleting(false);
            setWidth(0);
        }, 400); // matches CSS transition duration
    };

    useEffect(() => {
        // Same path — nothing to do (strict-mode double-fire guard)
        if (pathname === prevPath.current) return;
        prevPath.current = pathname;

        // Start: schedule the bar to appear only if loading is slow
        reset();
        setWidth(0);
        setVisible(false);

        showTimer.current = setTimeout(() => {
            // Still loading after threshold — show the bar
            setVisible(true);
            setWidth(25);

            // Trickle slowly toward 85%
            progressTimer.current = setInterval(() => {
                setWidth(w => {
                    if (w >= 85) {
                        clearInterval(progressTimer.current!);
                        return 85;
                    }
                    return w + Math.random() * 12;
                });
            }, 400);
        }, SHOW_THRESHOLD_MS);

        // Cleanup = page finished loading → complete the bar
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
