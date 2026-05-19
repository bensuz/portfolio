import React from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitBtn() {
    return (
        <button
            type="submit"
            className="mt-10 group/button bg-[#7756b3] dark:bg-[#412f63] dark:shadow-sm dark:shadow-slate-700 dark:hover:bg-[#2e2443] text-white text-md px-6 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
        >
            Submit {" "}
            <FaPaperPlane className="text-sm opacity-90 transition-all group-hover/button:translate-x-1 " />
        </button>
    );
}
