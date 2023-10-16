import About from "@/components/about";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center px-4 pt-20 gap-64">
            <Intro />
            {/* <SectionDivider /> */}
            <About />
            <Skills />
            <Projects />
        </main>
    );
}
