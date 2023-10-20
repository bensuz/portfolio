"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import "./project.css";

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

    const hasSourceCode = !!src;
    const hasLive = !!live;
    const hasPreview = !!preview;
    return (
        <motion.div
            ref={ref}
            style={{ scale: scaleProgress, opacity: opacityProgess }}
            className="group/card mb-3 sm:mb-8 last:mb-0"
        >
            {" "}
            <section className="relative  bg-slate-200/40 max-w-[58rem] border border-gray-500/5 rounded-lg overflow-hidden sm:pr-8 sm:h-[24rem] shadow-md shadow-slate-500 hover:bg-purple-100/50 group-even/card:pl-8 ">
                <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 max-sm:min-w-full max-md:border max-md:mr-8 sm:max-w-[50%] max-sm:max-w-[50%] flex flex-col justify-start items-start h-full sm:mt-auto sm:group-even/card:ml-[27rem] sm:group-even/card:w-full sm:group-even/card:px-0">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-800">
                        {description}
                    </p>
                    <ul className="flex flex-wrap mt-4 gap-2">
                        {tags.map((tag, index) => (
                            <li key={index} className="">
                                <Image
                                    src={tag.icon}
                                    alt={`a photo of ${tag.name} logo`}
                                    quality={95}
                                    priority={true}
                                    width={100}
                                    height={100}
                                    className="rounded-full h-[2.2rem] w-[2.2rem]  "
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap items-center justify-start lg:gap-3 mt-4">
                        {hasSourceCode ? (
                            <Link
                                href={src}
                                target="_blank"
                                className="mt-2 group/button bg-[#7756b3] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                            >
                                Source Code
                                <BsArrowRight className="opacity-70 group-hover/button:translate-x-1 transition" />
                            </Link>
                        ) : (
                            <p className="text-[#7756b3] font-medium">
                                Ongoing project, stay tuned for updates.
                            </p>
                        )}
                        {hasLive && (
                            <Link
                                href={live}
                                target="_blank"
                                className="mt-2 group/button bg-[#7756b3] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                            >
                                See Live
                                <BsArrowRight className="opacity-70 group-hover/button:translate-x-1 transition" />
                            </Link>
                        )}
                        {hasPreview && (
                            <Link
                                href={preview}
                                target="_blank"
                                className="mt-2 group/button bg-[#7756b3] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                            >
                                Preview
                                <BsArrowRight className="opacity-70 group-hover/button:translate-x-1 transition" />
                            </Link>
                        )}
                    </div>
                </div>
                <Image
                    src={imageUrl}
                    alt={title}
                    quality={95}
                    className="absolute top-4 lg:-right-16 md:-right-20 sm:-right-24 max-sm:-right-64 lg:w-[28.25rem] sm:w-[25.25rem] max-sm:h-[36.25rem] max-sm:w-auto rounded-t-lg shadow-2xl transition group-hover/card/card:scale-[1.04] group-hover/card:-translate-x-3 group-hover/card:translate-y-3 group-hover/card:-rotate-2 group-even/card:right-[initial] group-even/card:-left-16 group-even/card:group-hover/card:translate-x-3  group-even/card:group-hover/card:-translate-y-3  group-even/card:group-hover/card:rotate-2 max-sm:hidden"
                />
                <Image
                    src={imageUrl}
                    alt={title}
                    quality={95}
                    className=" sm:hidden"
                />
            </section>
        </motion.div>
    );
}

export default Project;
