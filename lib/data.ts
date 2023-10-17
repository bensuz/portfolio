import React from "react";
// import { CgWorkAlt } from "react-icons/cg";
// import { FaReact } from "react-icons/fa";
// import { LuGraduationCap } from "react-icons/lu";
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

    // {
    //     name: "Experience",
    //     hash: "#experience",
    // },
    {
        name: "Contact",
        hash: "#contact",
    },
] as const;

// export const experiencesData = [
//     {
//         title: "Graduated bootcamp",
//         location: "Miami, FL",
//         description:
//             "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
//         icon: React.createElement(LuGraduationCap),
//         date: "2019",
//     },
//     {
//         title: "Front-End Developer",
//         location: "Orlando, FL",
//         description:
//             "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
//         icon: React.createElement(CgWorkAlt),
//         date: "2019 - 2021",
//     },
//     {
//         title: "Full-Stack Developer",
//         location: "Houston, TX",
//         description:
//             "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
//         icon: React.createElement(FaReact),
//         date: "2021 - present",
//     },
// ] as const;

export const projectsData = [
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
        src: "https://github.com/PStleger/wellnest",
        live: "https://wellnest-app.onrender.com/",
        preview: "https://www.youtube.com/watch?v=ZKFUGMUu_Hc",
    },
    {
        title: "Cookbook",
        description:
            "A recipe app where users can find variuos recipies from the Food API in details, add their favorite recipes to their lists and create their own recipes with headlessCMS. ",

        tags: [
            { name: "MongoDb", icon: "/skillicons/mongodb.png" },
            { name: "Express", icon: "/skillicons/expressjs.png" },
            { name: "React", icon: "/skillicons/react.png" },
            { name: "Node.js", icon: "/skillicons/nodejs.png" },
            { name: "JavaScript", icon: "/skillicons/js.png" },
            { name: "Tailwind", icon: "/skillicons/tailwind.png" },
            { name: "REST APIs", icon: "/skillicons/restapi.png" },
        ],

        imageUrl: lecker,
        src: "https://github.com/bensuz/Cookbook",
        live: "https://lecker-lecker.netlify.app/",
        preview: "https://www.youtube.com/watch?v=ZKFUGMUu_Hc",
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
