/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

const About = () => {
    const { ref } = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="max-w-[50rem] scroll-mt-28 text-justify text-[1.05rem] leading-9 sm:mb-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id="about"
        >
            <SectionHeading>About me</SectionHeading>

            <p className="mb-4">
                I began my career in the Aerospace and Defence industry, where I
                spent around four years working with contracts, licensing and
                regulated processes. This gave me a strong foundation in{" "}
                <span className="font-semibold text-[1.06rem]">
                    accuracy, documentation, stakeholder communication,
                    confidentiality
                </span>{" "}
                and working responsibly in environments where security and
                compliance matter.
            </p>

            <p className="mb-4">
                I later transitioned into software development after completing
                the <span className="font-bold">WBS Coding School</span>{" "}
                <span className="font-semibold text-[1.06rem]">
                    Full Stack Web and App Development Bootcamp
                </span>
                , where I built a foundation in{" "}
                <span className="font-semibold text-[1.06rem]">
                    frontend development, backend development, databases, REST
                    APIs and project-based delivery.
                </span>
            </p>

            <p className="mb-4">
                I now work as a{" "}
                <span className="font-semibold text-[1.06rem]">
                    Full Stack Developer at Rix Digital
                </span>
                , supporting production websites and internal digital projects
                across multiple subsidiary companies. I work with a diverse
                technology stack including{" "}
                <span className="font-semibold text-[1.06rem]">
                    Webflow, Node.js, Koa, React, Remix, SvelteKit, Nunjucks,
                    Alpine.js, Tailwind CSS and JavaScript/TypeScript.
                </span>{" "}
                My work includes responsive interfaces, reusable components,
                backend routes, secure form workflows, API integration planning,
                accessibility, performance improvements and support for live
                services.
            </p>

            <p className="mb-4">
                I enjoy working across the full development lifecycle, from
                understanding user and stakeholder needs through to building,
                testing, improving and supporting digital products. I’m
                especially interested in{" "}
                <span className="font-semibold text-[1.06rem]">
                    secure, accessible and maintainable digital services
                </span>{" "}
                that solve real problems and protect user data.
            </p>

            <p className="mb-4">
                I’m also experienced in using{" "}
                <span className="font-semibold text-[1.06rem]">
                    AI-assisted development tools such as Codex and Claude
                </span>{" "}
                to support software delivery responsibly with custom agents and skills. I use them for code
                exploration, debugging, refactoring, test planning,
                documentation, UI iteration and structured code reviews, while
                keeping ownership of technical decisions, security, accuracy and
                final implementation.
            </p>
        </motion.section>
    );
};

export default About;