"use client";
import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import Image from "next/image";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import "./skills.css";

const Skills = () => {
    const { ref } = useSectionInView("Skills", 0.6);

    const fadeInAnimationVariants = {
        initial: { opacity: 0, y: 100 },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.05 * index },
        }),
    };

    return (
        <section ref={ref} id="skills" className="scroll-mt-32">
            <SectionHeading>My Skills</SectionHeading>
            <ul className="flex flex-wrap max-w-[50rem] scroll-mt-28 items-center justify-center gap-8 ">
                {skillsData.map((skill, index) => (
                    <motion.li
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.5 }}
                        custom={index}
                        key={index}
                        className="w-[3.5rem] h-[3.5rem] flex flex-col items-center justify-start flex-wrap gap-2 "
                    >
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front ">
                                    <Image
                                        src={skill.icon}
                                        alt={`a photo of ${skill.name} logo`}
                                        quality={95}
                                        priority={true}
                                        width={100}
                                        height={100}
                                        className="rounded-2xl border-[0.1rem] border-gray-200 h-16 w-16 object-cover shadow-md shadow-slate-700 p-2"
                                    />
                                </div>
                                <div className="flip-card-back">
                                    <div className="rounded-2xl text-slate-600 text-[0.6rem] font-semibold p-4 flex items-center justify-center flex-wrap border-[0.1rem] border-gray-200 h-14 w-14 object-cover shadow-md shadow-slate-700 cursor-default">
                                        {skill.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <p className="text-sm  flex flex-wrap text-center text-slate-500">
                            {skill.name}
                        </p> */}
                    </motion.li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;
