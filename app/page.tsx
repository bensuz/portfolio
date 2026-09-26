import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import Glance from "@/components/home/glance";
import Hero from "@/components/home/hero";
import Stack from "@/components/home/stack";
import Work from "@/components/home/work";
import SceneCanvas from "@/components/scene/scene-canvas";

// Regenerate daily so the live experience counter stays accurate.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <SceneCanvas />
      <main id="main" className="home">
        <Hero />
        <Glance />
        <Work />
        <Stack />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
