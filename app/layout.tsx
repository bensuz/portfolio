import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Bensu | Personal Portfolio",
    description: "Bensu is a full-stack developer.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="!scroll-smooth">
            <body
                className={`${inter.className} bg-slate-100 text-slate-800 relative h-fit pt-28 sm:pt-36 w-screen`}
            >
                <div className="bg-[#fbe2e4] absolute -z-10 top-[-6rem] right-[-11rem] h-[31.25rem] max-w-1/2 rounded-full blur-[10rem] sm:w-1/2"></div>
                <div className="bg-[#dbd7fb] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] max-w-1/2 rounded-full blur-[10rem] sm:w-1/2 md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
                <ActiveSectionContextProvider>
                    <Header />
                    {children} <Footer />
                </ActiveSectionContextProvider>
            </body>
        </html>
    );
}
