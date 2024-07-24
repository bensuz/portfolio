import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import moviebox from "@/public/MovieBoxTrailer.png";
import wellnest from "@/public/wellnestpage.png";
import fuelmate from "@/public/fuelmate-narrow.png";

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
        title: "Graduated from bootcamp",
        location: "WBS Coding School",
        description:
            "I graduated from bootcamp after 6 months of study, with a strong foundation in both front-end and back-end development.",
        icon: React.createElement(LuGraduationCap),
        date: "Sept 2023",
    },
    {
        title: "Junior Full Stack Developer",
        location: "Rix Digital - J.R Rix & Sons",
        description:
            "I'm working as a full stack developer at Rix Digital. Responsible for developing various Webflow, React/Node, Remix projects for the internal and external steakholders as well as maintaining/updating the existing websites.",
        icon: React.createElement(CgWorkAlt),
        date: "Dec 2023 - Present",
    },
] as const;

export const projectsData = [
    {
        title: "Fuelmate",
        description:
            "Full-featured website providing dynamic fuel card solutions for businesses. Features an advanced CMS, custom-built card filtering tools, live Jivo chat, JotForm integration, TrustPilot widgets and user-friendly animations. ",

        tags: [
            { name: "Webflow", icon: "/skillicons/webflow-square-small.png" },
            { name: "Javascript", icon: "/skillicons/js.png" },
            { name: "CSS", icon: "/skillicons/css.png" },
            { name: "Cookiebot", icon: "/skillicons/cookiebot.png" },
            {
                name: "Trustpilot Widget",
                icon: "/skillicons/trustpilot_logo.png",
            },
            { name: "JivoChat", icon: "/skillicons/jivo.png" },
            { name: "GA & GTM ", icon: "/skillicons/gtm.png" },
        ],

        imageUrl: fuelmate,
        src: "",
        live: "https://www.fuelmate.co.uk/",
        preview: "",
    },
    {
        title: "MovieBox",
        description:
            "MovieBox is a full CRUD web application that allows users to discover popular movies and watch trailers, search and filter the movies by keywords, and manage their favorite movies by creating a list.",
        tags: [
            { name: "PostgreSQL", icon: "/skillicons/postgresql.png" },
            { name: "Express", icon: "/skillicons/expressjs.png" },
            { name: "React", icon: "/skillicons/react.png" },
            { name: "Node.js", icon: "/skillicons/nodejs.png" },
            { name: "JavaScript", icon: "/skillicons/js.png" },
            { name: "Tailwind", icon: "/skillicons/tailwind.png" },
            { name: "REST APIs", icon: "/skillicons/restapi.png" },
        ],
        imageUrl: moviebox,
        src: "https://github.com/bensuz/MovieBox",
        live: "https://moviebox-0lid.onrender.com/",
        preview: "https://www.youtube.com/watch?v=ZKFUGMUu_Hc",
    },
    {
        title: "WellNest",
        description:
            "WellNest is a wellness website that users can practice guided meditation, track their mood and emotions by selecting colors and drawing pictures and keep private and public journals.",

        tags: [
            { name: "MongoDb", icon: "/skillicons/mongodb.png" },
            { name: "Express", icon: "/skillicons/expressjs.png" },
            { name: "React", icon: "/skillicons/react.png" },
            { name: "Node.js", icon: "/skillicons/nodejs.png" },
            { name: "JavaScript", icon: "/skillicons/js.png" },
            { name: "Tailwind", icon: "/skillicons/tailwind.png" },
            { name: "REST APIs", icon: "/skillicons/restapi.png" },
        ],
        imageUrl: wellnest,
        src: "",
        live: "",
        preview: "",
    },
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
    { name: "Webflow", icon: "/skillicons/webflow-square-small.png" },
    { name: "Tailwind", icon: "/skillicons/tailwind.png" },
    { name: "Bootstrap", icon: "/skillicons/bootstrap.png" },
    { name: "MongoDB", icon: "/skillicons/mongodb.png" },
    { name: "PostgreSQL", icon: "/skillicons/postgresql.png" },
    { name: "Framer Motion", icon: "/skillicons/framer.png" },
    { name: "Git", icon: "/skillicons/git.png" },
    { name: "Github", icon: "/skillicons/github.png" },
    { name: "Postman", icon: "/skillicons/postman.png" },
    { name: "Figma", icon: "/skillicons/figma.png" },
    { name: "Jest", icon: "/skillicons/jest.png" },
] as const;
