/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
const About = () => {
    // const { ref } = useSectionInView("About");
    return (
        <motion.section
            // ref={ref}
            className="mb-28 max-w-[35rem] text-center leading-8 sm:mb-40 scroll-mt-28"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id="about"
        >
            <SectionHeading>About me</SectionHeading>
            <p className="mb-4 ">
                After graduating with a degree in Business Administration, I
                spent four years as a Contracts and Licensing Specialist in the
                Aerospace and Defense industry. However, my curiosity about
                coding kindled a passion within me.{" "}
            </p>{" "}
            <p className="mb-4">
                Enrolling in the{" "}
                <span className="font-medium">
                    WBS Coding School - Full Stack Web and App Development
                    Bootcamp
                </span>{" "}
                accelerated my transition into coding. My core stack is{" "}
                <span className="font-medium">
                    React, Express.js, Node.js, and MongoDB.
                </span>{" "}
            </p>
            <p className="mb-4">
                My goal is to contribute to innovative teams, creating web
                solutions that bridge technology with human needs that not only
                efficiently solve problems but also make{" "}
                <span className="font-medium">a lasting positive impact </span>{" "}
                on users .{" "}
            </p>
            <p className="mb-4">
                Let's collaborate to make the next big idea a reality!
            </p>
        </motion.section>
    );
};

export default About;
