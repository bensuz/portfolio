import About from "@/components/about";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import Contact from "@/components/contact";

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center px-4 pl-8 pt-20 gap-32 sm:gap-64 w-full">
            <Intro />
            {/* <SectionDivider /> */}
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}
