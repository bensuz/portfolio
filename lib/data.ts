import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import moviebox from "@/public/MovieBoxTrailer.png";
import wellnest from "@/public/wellnestpage.png";
import lecker from "@/public/Leckerpage.png";

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
        name: "Skills",
        hash: "#skills",
    },
    {
        name: "Projects",
        hash: "#projects",
    },

    {
        name: "Experience",
        hash: "#experience",
    },
    {
        name: "Contact",
        hash: "#contact",
    },
] as const;

export const experiencesData = [
    {
        title: "Graduated bootcamp",
        location: "Miami, FL",
        description:
            "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
        icon: React.createElement(LuGraduationCap),
        date: "2019",
    },
    {
        title: "Front-End Developer",
        location: "Orlando, FL",
        description:
            "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
        icon: React.createElement(CgWorkAlt),
        date: "2019 - 2021",
    },
    {
        title: "Full-Stack Developer",
        location: "Houston, TX",
        description:
            "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
        icon: React.createElement(FaReact),
        date: "2021 - present",
    },
] as const;

export const projectsData = [
    {
        title: "MovieBox",
        description:
            "MovieBox is a full CRUD web application that allows users to discover popular movies and watch trailers, search and filter the movies by keywords, and manage their favorite movies by creating a list.",
        tags: [
            "PostgreSQL",
            "Express.js",
            "React",
            "Node.js",
            "Javascript",
            "Tailwind",
            "REST APIs",
            "Context API",
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
            "MongoDb",
            "Express.js",
            "React",
            "Node.js",
            "Javascript",
            "Tailwind",
            "Context API",
        ],
        imageUrl: wellnest,
        src: "https://github.com/PStleger/wellnest",
        live: "https://wellnest-app.onrender.com/",
        preview: "https://www.youtube.com/watch?v=ZKFUGMUu_Hc",
    },
    {
        title: "Cookbook",
        description:
            "A recipe app where users can find variuos recipies from the Food API in details, add their favorite recipes to their lists and create their own recipes with headlessCMS. ",
        tags: [
            "MongoDb",
            "Express.js",
            "React",
            "Node.js",
            "Javascript",
            "Tailwind",
            "Contentful",
            "REST API",
        ],
        imageUrl: lecker,
        src: "https://github.com/bensuz/Cookbook",
        live: "https://lecker-lecker.netlify.app/",
        preview: "https://www.youtube.com/watch?v=ZKFUGMUu_Hc",
    },
] as const;

export const skillsData = [
    { name: "HTML", icon: "" },
    { name: "CSS", icon: "" },
    { name: "JavaScript", icon: "" },
    { name: "TypeScript", icon: "" },
    { name: "React", icon: "" },
    { name: "Next.js", icon: "" },
    { name: "Node.js", icon: "" },
    { name: "Express", icon: "" },
    { name: "Tailwind", icon: "" },
    { name: "Bootstrap", icon: "" },
    { name: "MongoDB", icon: "" },
    { name: "PostgreSQL", icon: "" },
    { name: "Framer Motion", icon: "" },
    { name: "Git", icon: "" },
    { name: "Github", icon: "" },
    { name: "Postman", icon: "" },
    { name: "Figma", icon: "" },
] as const;
