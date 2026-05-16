import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import moviebox from "@/public/MovieBoxTrailer.png";
import bryn from "@/public/bryn-morfydd.png";
import fuelmate from "@/public/fuelmate-narrow.png";
import victoryConversions from "@/public/conversions.png"; 

export const links = [
    {
        name: "Home",
        hash: "#home",
    },
    {
        name: "About",
        hash: "#about",
    },
    {
        name: "Experience",
        hash: "#experience",
    },
    {
        name: "Skills",
        hash: "#skills",
    },
    {
        name: "Projects",
        hash: "#projects",
    },

    {
        name: "Contact",
        hash: "#contact",
    },
] as const;

export const experiencesData = [
    {
        title: "Graduated from coding school",
        location: "WBS Coding School",
        description: "Completed an intensive 6-month full-stack web development programme, building a strong foundation in front-end development, back-end development, databases, REST APIs, Git workflows and project-based software delivery.",
        icon: React.createElement(LuGraduationCap),
        date: "Sept 2023",
    },
    {
        title: "Full Stack Developer",
        location: "Rix Digital - J.R Rix & Sons",
        description:"Working as a full-stack developer across a diverse range of production websites and internal digital projects for multiple Rix Group brands. </br></br>I work with a varied tech stack including Webflow, Node.js/Koa, React, Remix, SvelteKit, Nunjucks, Alpine.js,and JavaScript/TypeScript. </br></br>My role includes building responsive user interfaces, reusable components, backend routes, secure form workflows, API integration planning, analytics tracking, SEO improvements, performance optimisation, accessibility improvements and ongoing support for live services. </br></br>I collaborate with marketing, IT and business stakeholders to turn requirements into maintainable digital products.",
        icon: React.createElement(CgWorkAlt),
        date: "Dec 2023 - Present",
    },
] as const;

export const projectsData = [
    {
        title: "Victory Conversions",
        role: "Full Stack Developer",
        description:
            "A public-sector and commercial vehicle conversion website rebuilt for reusable service templates, accessible content and performance-optimised pages.",
        highlights: [
            "Delivered reusable templates for service and sector pages",
            "Improved accessibility, SEO and cross-device performance",
            "Built clear contact journeys to support stakeholder-led lead generation",
        ],
        tags: [
            { name: "Nunjucks", icon: "/skillicons/nj.png" },
            { name: "Koa", icon: "/skillicons/koa.png" },
            { name: "Tailwind", icon: "/skillicons/tailwind.png" },
            { name: "Alpine.js", icon: "/skillicons/alpine.png" },
            { name: "JavaScript", icon: "/skillicons/js.png" },
            { name: "Cookiebot", icon: "/skillicons/cookiebot.png" },
            { name: "GA & GTM ", icon: "/skillicons/gtm.png" },
        ],
        imageUrl: victoryConversions,
        src: "",
        live: "https://www.victoryconversions.com/",
        preview: "",
    },
    {
        title: "Bryn Morfydd Lodge Park",
        role: "Full-stack developer",
        description:
            "A luxury lodge park website with a custom park management integration to support dynamic property and availability updates.",
        highlights: [
            "Built CMS-connected content workflows for lodge, park and service updates",
            "Enhanced usability and presentation for a premium tourism audience",
            "Delivered a maintainable solution for stakeholder-driven updates",
        ],
        tags: [
            { name: "Nunjucks", icon: "/skillicons/nj.png" },
            { name: "Koa", icon: "/skillicons/koa.png" },
            { name: "Tailwind", icon: "/skillicons/tailwind.png" },
            { name: "Alpine.js", icon: "/skillicons/alpine.png" },
            { name: "JavaScript", icon: "/skillicons/js.png" },
            { name: "Cookiebot", icon: "/skillicons/cookiebot.png" },
            { name: "GA & GTM ", icon: "/skillicons/gtm.png" },
        ],
        imageUrl: bryn,
        src: "",
        live: "https://brynmorfydd.com/",
        preview: "",
    },
    {
        title: "Fuelmate",
        role: "Full Stack Developer",
        description:
            "A business fuel card platform designed for lead generation, responsive conversion flows and integrated customer engagement tools.",
        highlights: [
            "Implemented dynamic card filtering and CMS-driven pricing",
            "Integrated live chat, forms and TrustPilot widgets for better customer engagement",
            "Maintained consistent branding with performance-aware interactions",
        ],
        tags: [
            { name: "Webflow", icon: "/skillicons/webflow-square-small.png" },
            { name: "Javascript", icon: "/skillicons/js.png" },
            { name: "CSS", icon: "/skillicons/css.png" },
            { name: "Cookiebot", icon: "/skillicons/cookiebot.png" },
            {
                name: "Trustpilot Widget",
                icon: "/skillicons/Trustpilot_logo.png",
            },
            { name: "JivoChat", icon: "/skillicons/jivo.png" },
            { name: "GA & GTM ", icon: "/skillicons/gtm.png" },
        ],

        imageUrl: fuelmate,
        src: "",
        live: "https://www.fuelmate.co.uk/",
        preview: "",
    }
    
] as const;

export const skillsData = [
    { name: "HTML", icon: "/skillicons/html.png" },
    { name: "CSS", icon: "/skillicons/css.png" },
    { name: "JavaScript", icon: "/skillicons/js.png" },
    { name: "TypeScript", icon: "/skillicons/ts.png" },
    { name: "React", icon: "/skillicons/react.png" },
    { name: "Next.js", icon: "/skillicons/nextjs.png" },
    { name: "Node.js", icon: "/skillicons/nodejs.png" },
    { name: "Express", icon: "/skillicons/expressjs.png" },
    { name: "Koa", icon: "/skillicons/koa.png" }, 
    { name: "Nunjucks", icon: "/skillicons/nj.png" }, 
    { name: "Alpine.js", icon: "/skillicons/alpine.png" }, 
    { name: "Webflow", icon: "/skillicons/webflow-square-small.png" },
    { name: "Tailwind", icon: "/skillicons/tailwind.png" },
    { name: "Bootstrap", icon: "/skillicons/bootstrap.png" },
    { name: "MongoDB", icon: "/skillicons/mongodb.png" },
    { name: "PostgreSQL", icon: "/skillicons/postgresql.png" },
    { name: "Supabase", icon: "/skillicons/supabase.webp" }, 
    { name: "REST APIs", icon: "/skillicons/restapi.png" }, 
    { name: "Zod", icon: "/skillicons/zod.webp" }, 
    { name: "Playwright", icon: "/skillicons/playwright.webp" }, 
    { name: "Jest", icon: "/skillicons/jest.png" },
    { name: "Git", icon: "/skillicons/git.png" },
    { name: "GitHub", icon: "/skillicons/github.png" }, 
    { name: "Postman", icon: "/skillicons/postman.png" },
    { name: "Docker", icon: "/skillicons/docker.png" }, 
    { name: "Figma", icon: "/skillicons/figma.png" },
    { name: "Cloudflare Turnstile", icon: "/skillicons/cloudflare.png" }, 
    { name: "Postmark", icon: "/skillicons/postmark.png" }, 
    { name: "Google Tag Manager", icon: "/skillicons/gtm.png" }, 
    { name: "Cookiebot", icon: "/skillicons/cookiebot.png" }, 
    { name: "Accessibility", icon: "/skillicons/accessibility.jpg" }, 
] as const;
