import ProjectCard from "../components/ProjectCard";
import { featuredProjects } from "../data/projects";
import type { NavigateTo } from "../utils/routing";

type ProjectsProps = {
    navigateTo: NavigateTo;
};

function Projects({ navigateTo }: ProjectsProps) {
    return (
        <section className="projects-page px-6 pt-32 pb-24 font-mono">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-5xl font-semibold tracking-tight text-(--hero-text)">
                            All Projects
                        </h1>
                    </div>
                    <p className="max-w-xl text-base font-medium leading-7 text-(--hero-muted)">
                        A curated project list backed by GitHub metadata and
                        local write-ups.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={`${project.owner}/${project.repo}`}
                            navigateTo={navigateTo}
                            project={project}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
