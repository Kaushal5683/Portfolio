"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
import { Menu, X } from "lucide-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavbarProps { children: React.ReactNode; className?: string }
interface NavBodyProps { children: React.ReactNode; className?: string; visible?: boolean }
interface NavItemsProps { items: { name: string; link: string }[]; className?: string; onItemClick?: () => void }
interface MobileNavProps { children: React.ReactNode; className?: string; visible?: boolean }
interface MobileNavHeaderProps { children: React.ReactNode; className?: string }
interface MobileNavMenuProps { children: React.ReactNode; className?: string; isOpen: boolean; onClose: () => void }

// ─── Navbar (scroll detector + visible state propagator) ─────────────────────
export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setVisible(latest > 80);
    });

    return (
        <motion.div
            ref={ref}
            className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
                    : child
            )}
        </motion.div>
    );
};

// ─── NavBody (desktop pill that shrinks on scroll) ───────────────────────────
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(16px)" : "none",
                boxShadow: visible
                    ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)"
                    : "none",
                width: visible ? "56%" : "100%",
                y: visible ? 10 : 0,
                backgroundColor: visible ? "rgba(6,6,20,0.85)" : "transparent",
                borderRadius: visible ? "9999px" : "0px",
                paddingLeft: visible ? "20px" : "24px",
                paddingRight: visible ? "20px" : "24px",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 50 }}
            style={{ minWidth: "680px" }}
            className={cn(
                "relative z-[60] mx-auto hidden max-w-6xl flex-row items-center justify-between self-start py-3 lg:flex",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

// ─── NavItems (desktop links with hover highlight) ───────────────────────────
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex",
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    key={idx}
                    href={item.link}
                    onClick={onItemClick}
                    onMouseEnter={() => setHovered(idx)}
                    className="relative px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="nav-hover"
                            className="absolute inset-0 h-full w-full rounded-full bg-white/8"
                        />
                    )}
                    <span className="relative z-20">{item.name}</span>
                </Link>
            ))}
        </motion.div>
    );
};

// ─── MobileNav (mobile pill that shrinks on scroll) ──────────────────────────
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(16px)" : "none",
                boxShadow: visible
                    ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)"
                    : "none",
                width: visible ? "92%" : "100%",
                y: visible ? 10 : 0,
                backgroundColor: visible ? "rgba(6,6,20,0.85)" : "transparent",
                borderRadius: visible ? "9999px" : "0px",
                paddingLeft: visible ? "16px" : "16px",
                paddingRight: visible ? "16px" : "16px",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 50 }}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between py-3 lg:hidden",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

// ─── MobileNavHeader ─────────────────────────────────────────────────────────
export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
        {children}
    </div>
);

// ─── MobileNavMenu (dropdown) ─────────────────────────────────────────────────
export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={cn(
                    "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-2 rounded-2xl border border-white/10 bg-bg-primary/95 backdrop-blur-xl px-5 py-6 shadow-2xl",
                    className
                )}
                onClick={onClose}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

// ─── MobileNavToggle ─────────────────────────────────────────────────────────
export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) =>
    isOpen
        ? <X className="text-text-primary cursor-pointer" onClick={onClick} size={22} />
        : <Menu className="text-text-primary cursor-pointer" onClick={onClick} size={22} />;

// ─── NavbarButton ─────────────────────────────────────────────────────────────
export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
    const base = "px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 inline-flex items-center gap-2";
    const variants = {
        primary: "bg-white text-black hover:bg-white/90 shadow-md hover:-translate-y-0.5",
        secondary: "bg-transparent text-text-primary border border-white/15 hover:border-white/30 hover:bg-white/5",
        gradient: "bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-[0_0_24px_rgba(98,65,232,0.45)] hover:shadow-[0_0_36px_rgba(98,65,232,0.65)] hover:-translate-y-0.5",
    };

    return (
        <Tag href={href || "#"} className={cn(base, variants[variant], className)} {...props}>
            {children}
        </Tag>
    );
};
