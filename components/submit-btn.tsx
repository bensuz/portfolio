import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import {
    // @ts-expect-error
    experimental_useFormState as useFormState,
    // @ts-expect-error
    experimental_useFormStatus as useFormStatus,
} from "react-dom";

export default function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="mt-10 group/button bg-[#7756b3] dark:bg-[#412f63] dark:shadow-md dark:shadow-slate-600 dark:hover:bg-[#2e2443] text-white text-md px-6 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#604a8d] active:scale-105 transition"
            disabled={pending}
        >
            {pending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
                <>
                    Submit{" "}
                    <FaPaperPlane className="text-sm opacity-90 transition-all group-hover/button:translate-x-1 " />{" "}
                </>
            )}
        </button>
    );
}
