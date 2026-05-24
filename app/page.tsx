import { Hero } from "@/components/sections/hero";
import { Strategy } from "@/components/sections/strategy";
import { Projects } from "@/components/sections/projects";
import { Timeline } from "@/components/sections/timeline";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Strategy />
      <Projects />
      <Timeline />
      <Education />
      <Contact />
    </>
  );
}
