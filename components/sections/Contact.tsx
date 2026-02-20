"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolioData";
import {
    Send,
    Phone,
    Linkedin,
    Github,
    Instagram,
    MessageCircle,
    CheckCircle,
    AlertCircle,
    Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = "idle" | "loading" | "success" | "error";

function SocialLink({
    href,
    icon: Icon,
    label,
}: {
    href: string;
    icon: React.ElementType;
    label: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-bg-card/50 text-text-secondary hover:text-text-primary hover:border-brand-500/40 hover:bg-brand-500/10 transition-all duration-300"
        >
            <Icon size={18} className="text-brand-400 group-hover:text-brand-300 transition-colors" />
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}

export default function Contact() {
    const { contactInfo, socialLinks } = portfolioData;
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        setFormState("loading");
        try {
            await emailjs.sendForm(
                contactInfo.emailJsConfig.serviceId,
                contactInfo.emailJsConfig.templateId,
                formRef.current,
                contactInfo.emailJsConfig.publicKey
            );
            setFormState("success");
            formRef.current.reset();
        } catch (err: unknown) {
            setFormState("error");
            setErrorMsg(
                err instanceof Error ? err.message : "Something went wrong. Please try again."
            );
        }
    };

    const inputClass =
        "w-full bg-bg-card/60 border border-white/10 rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-brand-500/60 focus:bg-bg-card transition-all duration-200";

    return (
        <section
            id="contact"
            className="relative py-28 overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(98,65,232,0.2)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
                        Let&apos;s Connect
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
                        {contactInfo.heading}
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        {contactInfo.subheading}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start">
                    {/* Left: Info + socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-6"
                    >
                        {/* Phone */}
                        <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-bg-card/50">
                            <div className="w-11 h-11 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                                <Phone size={18} className="text-brand-300" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-widest mb-0.5">
                                    Phone
                                </p>
                                <a
                                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                                    className="text-text-primary font-semibold hover:text-brand-300 transition-colors"
                                >
                                    {contactInfo.phone}
                                </a>
                            </div>
                        </div>

                        {/* Socials */}
                        <div>
                            <p className="text-xs text-text-muted uppercase tracking-widest mb-3 font-medium">
                                Find me on
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <SocialLink
                                    href={socialLinks.linkedin}
                                    icon={Linkedin}
                                    label="LinkedIn"
                                />
                                <SocialLink
                                    href={socialLinks.github}
                                    icon={Github}
                                    label="GitHub"
                                />
                                <SocialLink
                                    href={socialLinks.instagram}
                                    icon={Instagram}
                                    label="Instagram"
                                />
                                <SocialLink
                                    href={socialLinks.whatsapp}
                                    icon={MessageCircle}
                                    label="WhatsApp"
                                />
                            </div>
                        </div>

                        {/* CTA quote */}
                        <div className="p-5 rounded-2xl border border-brand-500/20 bg-brand-500/5">
                            <p className="text-brand-300 text-sm italic leading-relaxed">
                                &ldquo;Ready to bring your vision to life? Let&apos;s build something
                                amazing together.&rdquo;
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-4 p-8 md:p-10 rounded-3xl border border-white/8 bg-bg-card/50 backdrop-blur-sm"
                        >
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-2" htmlFor="from_name">
                                        Your Name
                                    </label>
                                    <input
                                        id="from_name"
                                        name="from_name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-2" htmlFor="from_email">
                                        Email Address
                                    </label>
                                    <input
                                        id="from_email"
                                        name="from_email"
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-2" htmlFor="subject">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="Project Inquiry"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            {/* Status messages */}
                            {formState === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                                >
                                    <CheckCircle size={18} />
                                    <span className="text-sm font-medium">
                                        Message sent successfully! I&apos;ll be in touch soon.
                                    </span>
                                </motion.div>
                            )}
                            {formState === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
                                >
                                    <AlertCircle size={18} />
                                    <span className="text-sm font-medium">{errorMsg}</span>
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={formState === "loading"}
                                whileHover={formState !== "loading" ? { scale: 1.02 } : {}}
                                whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-brand-500 to-brand-400 text-white hover:shadow-[0_0_30px_rgba(98,65,232,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {formState === "loading" ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
