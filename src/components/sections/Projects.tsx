import Link from "next/link";
import ProjectCard from "@/components/sections/ProjectCard";
import type { ProjectItem } from "@/components/sections/ProjectCard";
import Slider from "@/components/ui/Slider";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects(props: { projects: ProjectItem[] }) {
  const projects = props.projects;

  if (projects.length === 0) return null;

  const items = projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="Projects" barClass="bg-sec-projects" />

      <Slider items={items} dotClass="bg-sec-projects" label="Projects" />

      <div className="mt-8 text-center">
        <Link
          href="/projects"
          className="inline-block rounded-full border border-sec-projects px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-sec-projects hover:text-white"
        >
          View all projects →
        </Link>
      </div>
    </section>
  );
}