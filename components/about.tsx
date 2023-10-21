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
            className=" max-w-[50rem] text-justify leading-9 sm:mb-0 scroll-mt-28 text-[1.05rem]"
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
                <span className="font-bold">WBS Coding School - </span>
                <span className="font-semibold text-[1.06rem]">
                    Full Stack Web and App Development Bootcamp
                </span>{" "}
                accelerated my transition into coding. My core stack is{" "}
                <span className="font-semibold text-[1.06rem]">
                    React, Express.js, Node.js, and MongoDB.
                </span>{" "}
            </p>
            <p className="mb-4">
                My goal is to contribute to{" "}
                <span className="font-semibold text-[1.04rem]">
                    innovative teams
                </span>
                , creating web solutions that bridge technology with human needs
                that not only{" "}
                <span className="font-bold">efficiently solve problems</span>{" "}
                but also make{" "}
                <span className="font-semibold text-[1.04rem]">
                    a lasting positive impact{" "}
                </span>{" "}
                on users .{" "}
            </p>
            <p className="mb-4">
                Let's collaborate to make the next big idea a reality!
            </p>
        </motion.section>
    );
};

export default About;
