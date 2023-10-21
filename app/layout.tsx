import Header from "@/components/header";
import "./globals.css";
import { Nunito } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";

const nunito = Nunito({ subsets: ["latin"] });

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
                className={`${nunito.className} bg-slate-100 text-slate-800 relative h-fit pt-28 sm:pt-36 w-full `}
            >
                <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] "></div>
                <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] "></div>
                <ActiveSectionContextProvider>
                    <Header />
                    {children} <Footer />
                </ActiveSectionContextProvider>
            </body>
        </html>
    );
}
