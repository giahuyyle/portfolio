import ProjectCard from "../components/ProjectCard";
import { featuredProjects } from "../data/projects";
import type { NavigateTo } from "../utils/routing";

const featuredProjectRepos = new Set(["cover-pilot", "talkflow"]);

type FeaturedProjectsProps = {
    navigateTo: NavigateTo;
};

function FeaturedProjects({ navigateTo }: FeaturedProjectsProps) {
    const homeFeaturedProjects = featuredProjects.filter((project) =>
        featuredProjectRepos.has(project.repo),
    );

    return (
        <section
            className="featured-projects-band px-6 pt-12 pb-20 font-mono"
            id="projects"
        >
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-10 flex items-center justify-between gap-6">
                    <h2 className="flex items-center gap-4 text-4xl font-bold tracking-tight text-(--hero-text)">
                        <StarOutlineIcon />
                        Featured Projects
                    </h2>
                    <a
                        className="hidden text-sm font-medium text-(--hero-accent) underline decoration-dashed underline-offset-6 transition hover:text-(--hero-text) sm:inline-flex"
                        href="/projects"
                        onClick={(event) => {
                            event.preventDefault();
                            navigateTo("/projects");
                        }}
                    >
                        View all -&gt;
                    </a>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {homeFeaturedProjects.map((project) => (
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

function StarOutlineIcon() {
    return (
        <svg
            className="size-8 text-(--hero-accent)"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="m12 3 2.7 5.48 6.05.88-4.38 4.27 1.04 6.02L12 16.8l-5.41 2.85 1.04-6.02-4.38-4.27 6.05-.88L12 3Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

export default FeaturedProjects;
