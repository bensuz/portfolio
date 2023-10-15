"use client";

import Image from "next/image";
import React from "react";
import profile from "../public/Su.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";

const Intro = () => {
    return (
        <section
            id="home"
            className="mb-25 max-w-[50rem] sm:mb-0 text-center scroll-mt-[100rem]"
        >
            <div className="flex items-center justify-center ">
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "tween", duration: 0.2 }}
                    >
                        <Image
                            src={profile}
                            alt="a photo of Bensu"
                            quality="95"
                            priority={true}
                            className="rounded-full border-[0.35rem] border-white h-24 w-24 object-cover shadow-xl"
                        ></Image>
                    </motion.div>
                    <motion.span
                        className="text-4xl absolute bottom-0 right-0"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 125,
                            delay: 0.1,
                            duration: 0.7,
                        }}
                    >
                        👋
                    </motion.span>
                </div>
            </div>
            <motion.h1
                className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Hey, I'm Bensu.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="pb-10"
            >
                Full-stack developer by day and a violin enthusiast by night, I
                craft beautiful code and weaving melodies with equal passion,
                because for me, both are art forms.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
            >
                <Link
                    href="#contact"
                    title="contact"
                    className="group bg-[#7756b3] text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] hover:text-white active:scale-105 transition"
                >
                    Contact me here
                    <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
                </Link>
                <a
                    href="/CV.pdf"
                    download
                    title="CV"
                    className="group bg-[#7756b3] text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d]  active:scale-105 transition"
                >
                    Download CV{" "}
                    <HiDownload className="opacity-70 group-hover:translate-x-1 transition" />
                </a>
                <a
                    href="https://www.linkedin.com/in/elif-bensu-zorlu/"
                    className="bg-[#7756b3] p-4 text-white hover:text-white hover:bg-[#604a8d]  flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                    target="_blank"
                >
                    <BsLinkedin className="text-xl" />
                </a>
                <a
                    href="https://github.com/bensuz"
                    className="bg-[#7756b3] p-[0.9rem] text-white hover:text-white hover:bg-[#604a8d]   flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                    target="_blank"
                >
                    <FaGithubSquare className="text-2xl" />
                </a>
            </motion.div>
        </section>
    );
};

export default Intro;
