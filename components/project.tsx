"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

type ProjectsProbs = (typeof projectsData)[number];

function Project({
    title,
    description,
    tags,
    imageUrl,
    src,
    live,
    preview,
}: ProjectsProbs) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale: scaleProgress, opacity: opacityProgess }}
            className="group mb-3 sm:mb-8 last:mb-0"
        >
            {" "}
            <section className="relative  bg-slate-300/60 max-w-[58rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 sm:h-[24rem]  hover:bg-slate-400/50 group-even:pl-8 ">
                <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col items-start h-full sm:mt-auto sm:group-even:ml-[27rem] sm:group-even:w-full sm:group-even:px-0">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-800">
                        {description}
                    </p>
                    <ul className="flex flex-wrap mt-4 gap-2">
                        {tags.map((tag, index) => (
                            <li
                                key={index}
                                className="bg-slate-600/60 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-start gap-3">
                        <Link
                            href={src}
                            target="_blank"
                            className="mt-10 group bg-[#7756b3] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                        >
                            Source Code
                            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link
                            href={live}
                            target="_blank"
                            className="mt-10 group bg-[#7756b3] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                        >
                            See Live
                            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link
                            href={preview}
                            target="_blank"
                            className="mt-10 group bg-[#7756b3] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                        >
                            Preview
                            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
                        </Link>
                    </div>
                </div>
                <Image
                    src={imageUrl}
                    alt={title}
                    quality={95}
                    className="absolute top-4 -right-16 w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:right-[initial] group-even:-left-16 group-even:group-hover:translate-x-3  group-even:group-hover:-translate-y-3  group-even:group-hover:rotate-2"
                />
            </section>
        </motion.div>
    );
}

export default Project;
