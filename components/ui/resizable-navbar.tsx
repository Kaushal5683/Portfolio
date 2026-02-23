"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
import { Menu, X, ChevronDown } from "lucide-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavSubItem { name: string; link: string; icon?: React.ElementType }
interface NavItem { name: string; link: string; subItems?: NavSubItem[] }
interface NavbarProps { children: React.ReactNode; className?: string }
interface NavBodyProps { children: React.ReactNode; className?: string; visible?: boolean }
interface NavItemsProps { items: NavItem[]; className?: string; onItemClick?: () => void }
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

// ─── NavItems (desktop links with hover highlight + dropdown) ────────────────
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openDropdown = (idx: number) => {
        if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
        setDropdownOpen(idx);
    };
    const scheduleClose = () => {
        closeTimer.current = setTimeout(() => setDropdownOpen(null), 150);
    };

    return (
        <motion.div
            onMouseLeave={() => { setHovered(null); scheduleClose(); }}
            className={cn(
                "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex",
                className
            )}
        >
            {items.map((item, idx) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                return (
                    <div
                        key={idx}
                        className="relative"
                        onMouseEnter={() => { setHovered(idx); if (hasSub) openDropdown(idx); }}
                        onMouseLeave={scheduleClose}
                    >
                        <Link
                            href={item.link}
                            onClick={onItemClick}
                            className="relative flex items-center gap-1 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                        >
                            {hovered === idx && (
                                <motion.div
                                    layoutId="nav-hover"
                                    className="absolute inset-0 h-full w-full rounded-full bg-white/8"
                                />
                            )}
                            <span className="relative z-20">{item.name}</span>
                            {hasSub && (
                                <ChevronDown
                                    size={13}
                                    className={cn(
                                        "relative z-20 transition-transform duration-200",
                                        dropdownOpen === idx && "rotate-180"
                                    )}
                                />
                            )}
                        </Link>

                        {/* Dropdown */}
                        {hasSub && (
                            <AnimatePresence>
                                {dropdownOpen === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        onMouseEnter={() => openDropdown(idx)}
                                        onMouseLeave={scheduleClose}
                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[220px] rounded-xl border border-white/10 bg-bg-primary/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2 z-[70]"
                                    >
                                        {/* Subtle top accent */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-brand-400/60 to-transparent rounded-full" />

                                        {item.subItems!.map((sub, si) => (
                                            <Link
                                                key={si}
                                                href={sub.link}
                                                onClick={() => { setDropdownOpen(null); onItemClick?.(); }}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-150 group"
                                            >
                                                {sub.icon && (
                                                    <sub.icon size={15} className="text-brand-400 group-hover:text-brand-300 transition-colors flex-shrink-0" />
                                                )}
                                                <span>{sub.name}</span>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                );
            })}
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
