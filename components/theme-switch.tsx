"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { motion } from "framer-motion";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <motion.button
            className="fixed lg:top-7 lg:right-20 max-lg:top-24 max-lg:right-10 bg-white lg:w-[3.2rem] lg:h-[3.2rem] max-lg:w-[2.8rem] max-lg:h-[2.8rem] bg-opacity-90 backdrop-blur-[0.5rem] border-[0.1rem] border-slate-500 border-opacity-40 shadow-md shadow-slate-500 rounded-full flex items-center justify-center hover:scale-[1.5] active:scale-105 transition-all dark:bg-black/10"
            onClick={toggleTheme}
            animate={{ rotate: 360 }}
            transition={{
                repeat: 100,
                repeatType: "loop",
                duration: 10,
            }}
        >
            {theme === "light" ? (
                <BsMoon className="text-blue-700 font-extrabold text-2xl dark:text-blue-300" />
            ) : (
                <BsSun className="text-yellow-600 font-extrabold text-2xl dark:text-yellow-300" />
            )}
        </motion.button>
    );
};

export default ThemeSwitch;
