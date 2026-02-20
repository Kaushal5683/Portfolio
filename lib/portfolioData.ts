// Portfolio data types
export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    phone: string;
    email: string;
    motto: string;
    footerTagline: string;
    footerMotto: string;
    rotatingTitles: string[];
    description: string[];
}

export interface SocialLinks {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
}

export interface Skills {
    technical: string[];
    soft: string[];
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
}

export interface Project {
    title: string;
    description: string;
    demoUrl?: string;
    githubUrl?: string;
    imgUrl?: string;
    clientProject?: boolean;
    client?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    position: string;
    image: string;
    rating: number;
    projectType: string;
    text: string;
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
}

export interface Education {
    id: number;
    degree: string;
    institution: string;
    period: string;
    description: string;
    achievements: string[];
    current?: boolean;
}

export interface Certificate {
    title: string;
    completionDate: string;
    institute: string;
    imgUrl: string;
}

export interface ContactInfo {
    heading: string;
    subheading: string;
    phone: string;
    emailJsConfig: {
        serviceId: string;
        templateId: string;
        publicKey: string;
    };
}

export interface SectionDescriptions {
    projects: string;
    certificates: string;
    experienceEducation: string;
    testimonials: string;
    technicalSkills: string;
}

export interface PortfolioData {
    personalInfo: PersonalInfo;
    socialLinks: SocialLinks;
    skills: Skills;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    certificates: Certificate[];
    testimonials: Testimonial[];
    contactInfo: ContactInfo;
    sectionDescriptions: SectionDescriptions;
}

// Import statically for SSG
import rawData from "@/public/portfolio-data.json";

export const portfolioData = rawData as PortfolioData;

export const featuredProjects = portfolioData.projects.filter(
    (p) => p.clientProject === true
);

export const cn = (...classes: (string | undefined | false | null)[]) =>
    classes.filter(Boolean).join(" ");
