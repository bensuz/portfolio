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
                I used to work in the Aerospace and Defense industry for about
                four years, handling contracts and licensing. It was
                interesting… but honestly, not my thing. I always found myself
                more drawn to tech! Playing around with websites, figuring out
                how things work, and just building tools for efficiency at work.{" "}
            </p>{" "}
            <p className="mb-4">
                So I took the leap and joined{" "}
                <span className="font-bold">WBS Coding School - </span>
                <span className="font-semibold text-[1.06rem]">
                    Full Stack Web and App Development Bootcamp
                </span>{" "}
                helped me get my foundation. My core stack is{" "}
                <span className="font-semibold text-[1.06rem]">
                    React, Express.js, Node.js, and MongoDB.
                </span>{" "}
            </p>
            <p className="mb-4">
                Now, I’m part of a small team at Rix Digital, where we manage
                over 20 websites for more than 10 different subsidiary
                companies, and build new ones too. It’s a mix of design,
                development, problem-solving, and learning something new pretty
                much every week. And I love that!
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
                Let's collaborate if you are working on something exciting!
            </p>
        </motion.section>
    );
};

export default About;
