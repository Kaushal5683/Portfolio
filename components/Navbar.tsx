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
import { portfolioData } from "@/lib/portfolioData";

const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Testimonials", link: "/#testimonials" },
    { name: "Contact", link: "/contact" },
];

export default function AppNavbar() {
    const { personalInfo } = portfolioData;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Navbar>
            {/* ── Desktop ─────────────────────────────────────── */}
            <NavBody>
                {/* Logo */}
                <a href="/" className="relative z-20 flex items-center gap-2 shrink-0">
                    <span className="text-sm font-black tracking-tight">
                        <span className="text-text-primary">
                            {personalInfo.name.split(" ")[0]}
                        </span>{" "}
                        <span className="text-brand-400">
                            {personalInfo.name.split(" ")[1]}
                        </span>
                    </span>
                </a>

                {/* Nav links */}
                <NavItems items={navLinks} />

                {/* CTA */}
                <div className="relative z-20 shrink-0">
                    <NavbarButton href="/contact" variant="gradient">
                        Hire Me
                    </NavbarButton>
                </div>
            </NavBody>

            {/* ── Mobile ──────────────────────────────────────── */}
            <MobileNav>
                <MobileNavHeader>
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <span className="text-sm font-black tracking-tight">
                            <span className="text-text-primary">
                                {personalInfo.name.split(" ")[0]}
                            </span>{" "}
                            <span className="text-brand-400">
                                {personalInfo.name.split(" ")[1]}
                            </span>
                        </span>
                    </a>

                    <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.link}
                            onClick={() => setMobileOpen(false)}
                            className="w-full py-2 text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <NavbarButton href="/contact" variant="gradient" className="mt-2 w-full justify-center">
                        Hire Me
                    </NavbarButton>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
