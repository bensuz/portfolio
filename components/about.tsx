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
                regulated processes. This provided a strong foundation in{" "}
                <span className="font-semibold text-[1.06rem]">
                    accuracy, documentation, stakeholder communication and
                    confidentiality
                </span>
                , and it shaped my approach to secure delivery in highly
                regulated environments.
            </p>

            <p className="mb-4">
                I transitioned into software development after completing the
                <span className="font-bold"> WBS Coding School</span>{" "}
                <span className="font-semibold text-[1.06rem]">
                    Full Stack Web and App Development Bootcamp
                </span>
                , where I built a practical foundation in frontend, backend,
                databases, REST APIs and project-based delivery.
            </p>

            <p className="mb-4">
                I currently work as a <span className="font-semibold text-[1.06rem]">
                    Full Stack Developer at Rix Digital
                </span>
                , supporting production websites and internal digital projects
                across multiple subsidiary companies. My responsibilities include
                responsive interfaces, reusable components, backend routes,
                secure form workflows, API integration planning, accessibility
                improvements, performance optimisation and live-service support.
            </p>

            <p className="mb-4">
                I combine technical delivery with strong stakeholder collaboration,
                documentation and compliance focus. My work is centred on
                building secure, accessible and maintainable digital services that
                meet real business needs.
            </p>

            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/40">
                <h3 className="mb-3 text-lg font-semibold">Government-ready strengths</h3>
                <ul className="list-disc list-inside space-y-2 text-[1rem] leading-7 text-slate-700 dark:text-slate-200">
                    <li>Delivering secure form workflows and compliant digital services</li>
                    <li>Improving accessibility, performance and maintainability for live systems</li>
                    <li>Collaborating with stakeholders on requirements, governance and documentation</li>
                    <li>Applying disciplined development practices in regulated and production environments</li>
                </ul>
            </div>

            <p className="mb-4">
                I also use AI-assisted development tools responsibly to support
                code exploration, debugging, refactoring, documentation and review,
                while retaining ownership of technical decisions, quality and
                delivery.
            </p>
        </motion.section>
    );
};

export default About;