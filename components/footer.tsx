import React from "react";

const Footer = () => {
    return (
        <footer className="mb-10 px-4 text-center text-slate-600">
            <small className="mb-2 text-xs block">
                {" "}
                &copy; 2023 Elif Bensu Zorlu. All rights reserved.
            </small>
            <p className="text-sm font-semibold">
                <span className="text-sm font-semibold">
                    About this website:
                </span>{" "}
                Built with{" "}
                <span className="font-medium text-sm">
                    React & Next.js (App Router & Server Actions), Typescript,
                    Tailwind CSS, Framer Motion, React Email & resend, Vercel
                    hosting
                </span>
            </p>
        </footer>
    );
};

export default Footer;
