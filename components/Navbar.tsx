"use client";

import { useState } from "react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarButton,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { Briefcase, Award, ChevronDown } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

const navLinks = [
    { name: "Home", link: "/" },
    {
        name: "About", link: "/about",
        subItems: [
            { name: "Experience & Education", link: "/about#experience", icon: Briefcase },
            { name: "Certificates", link: "/about#certificates", icon: Award },
        ],
    },
    { name: "Projects", link: "/projects" },
    { name: "Testimonials", link: "/#testimonials" },
    { name: "Contact", link: "/contact" },
];

export default function AppNavbar() {
    const { personalInfo } = portfolioData;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState(false);

    return (
        <Navbar>
            {/* ── Desktop ─────────────────────────────────────── */}
            <NavBody>
                {/* Logo */}
                <Link href="/" className="relative z-20 flex items-center gap-2 shrink-0">
                    <span className="text-sm font-black tracking-tight">
                        <span className="text-text-primary">
                            {personalInfo.name.split(" ")[0]}
                        </span>{" "}
                        <span className="text-brand-400">
                            {personalInfo.name.split(" ")[1]}
                        </span>
                    </span>
                </Link>

                {/* Nav links */}
                <NavItems items={navLinks} />

                {/* CTA */}
                <div className="relative z-20 shrink-0">
                    <NavbarButton as={Link} href="/contact" variant="gradient">
                        Hire Me
                    </NavbarButton>
                </div>
            </NavBody>

            {/* ── Mobile ──────────────────────────────────────── */}
            <MobileNav>
                <MobileNavHeader>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-sm font-black tracking-tight">
                            <span className="text-text-primary">
                                {personalInfo.name.split(" ")[0]}
                            </span>{" "}
                            <span className="text-brand-400">
                                {personalInfo.name.split(" ")[1]}
                            </span>
                        </span>
                    </Link>

                    <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                >
                    {navLinks.map((link) => (
                        <div key={link.name} className="w-full">
                            {link.subItems ? (
                                <>
                                    {/* Parent with toggle */}
                                    <div className="flex items-center justify-between w-full">
                                        <Link
                                            href={link.link}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex-1 py-2 text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setMobileSubOpen((v) => !v); }}
                                            className="p-2 text-text-muted hover:text-text-primary transition-colors"
                                            aria-label="Toggle submenu"
                                        >
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 ${mobileSubOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                    </div>

                                    {/* Sub-items */}
                                    {mobileSubOpen && (
                                        <div className="pl-4 flex flex-col gap-1 pb-1">
                                            {link.subItems.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.link}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center gap-2.5 py-1.5 text-sm text-text-muted hover:text-brand-300 transition-colors"
                                                >
                                                    {sub.icon && <sub.icon size={14} className="text-brand-400" />}
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={link.link}
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full py-2 text-base font-medium text-text-secondary hover:text-text-primary transition-colors block"
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <NavbarButton as={Link} href="/contact" variant="gradient" className="mt-2 w-full justify-center">
                        Hire Me
                    </NavbarButton>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
