"use client";

import { useEffect, useRef, useState } from "react";
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
    role,
    highlights,
    tags,
    imageUrl,
    src,
    live,
    preview,
}: ProjectsProbs) {
    const ref = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(min-width: 640px)");
        const handleChange = () => setIsDesktop(query.matches);
        handleChange();
        query.addEventListener("change", handleChange);
        return () => query.removeEventListener("change", handleChange);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.10 1"],
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    const hasSourceCode = !!src;
    const hasLive = !!live;
    const hasPreview = !!preview;
    const wrapperStyle = isDesktop
        ? { scale: scaleProgress, opacity: opacityProgess }
        : undefined;

    return (
        <motion.div
            ref={ref}
            style={wrapperStyle}
            className="group/card mb-5 sm:mb-8 last:mb-0"
        >
            <section className="relative w-full max-w-[58rem] mx-auto bg-slate-200/40 border border-gray-500/5 rounded-lg overflow-hidden shadow-sm shadow-slate-700 transition hover:bg-purple-100/50 dark:text-white dark:bg-white/10 dark:hover:bg-gray-700">
                <div className="pt-6 pb-6 px-5 sm:pt-10 sm:px-10 w-full flex flex-col justify-start items-start gap-5 md:max-w-[48%] sm:group-even/card:ml-[27rem] sm:group-even/card:w-full sm:group-even/card:px-0">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-800 dark:text-white/80">
                        {description}
                    </p>
                    {highlights?.length ? (
                        <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                            {highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="mt-2 min-h-[8px] max-h-[8px] min-w-[4px] max-w-[4px] rounded-full bg-[#7756b3]" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    <ul className="flex flex-wrap mt-4 gap-2">
                        {tags.map((tag, index) => (
                            <li
                                key={index}
                                className="dark:shadow-outline"
                                title={tag.name}
                            >
                                <Image
                                    src={tag.icon}
                                    alt={`a photo of ${tag.name} logo`}
                                    quality={95}
                                    priority={true}
                                    width={100}
                                    height={100}
                                    className="rounded-full h-[2.5rem] w-[2.5rem] dark:bg-white dark:p-1 mb-1 "
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap items-center justify-start lg:gap-3 mt-4">
                        {hasSourceCode && (
                            <Link
                                href={src}
                                target="_blank"
                                className="mt-2 group/button bg-[#7756b3] dark:bg-[#412f63] dark:shadow-md dark:shadow-slate-600 dark:hover:bg-[#2e2443] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                            >
                                Source Code
                                <BsArrowRight className="opacity-70 group-hover/button:translate-x-1 transition" />
                            </Link>

                        )}

                        {hasLive && (
                            <Link
                                href={live}
                                target="_blank"
                                className="mt-2 group/button bg-[#7756b3] dark:bg-[#412f63] dark:shadow-md dark:shadow-slate-600 dark:hover:bg-[#2e2443] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
                            >
                                See Live
                                <BsArrowRight className="opacity-70 group-hover/button:translate-x-1 transition" />
                            </Link>
                        )}
                        {hasPreview && (
                            <Link
                                href={preview}
                                target="_blank"
                                className="mt-2 group/button bg-[#7756b3] dark:bg-[#412f63] dark:shadow-md dark:shadow-slate-600 dark:hover:bg-[#2e2443] text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
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
                    className="absolute top-4 lg:-right-16 md:-right-20 sm:-right-24 right-0 lg:w-[28.25rem]  sm:w-[25.25rem] w-[90%] max-w-[28.25rem] rounded-t-lg shadow-2xl transition-transform duration-200 ease-out transform-gpu max-md:hidden group-hover/card:-rotate-3 group-hover/card:translate-x-2 group-hover/card:-translate-y-2 group-even/card:right-[initial] group-even/card:-left-16 group-even/card:group-hover/card:rotate-3 group-even/card:group-hover/card:-translate-x-2 group-even/card:group-hover/card:translate-y-2"
                />
                <Image
                    src={imageUrl}
                    alt={title}
                    quality={95}
                    className="w-full h-56 rounded-t-lg object-cover object-left-top md:hidden"
                />
            </section>
        </motion.div>
    );
}

export default Project;
