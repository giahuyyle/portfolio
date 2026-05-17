import ProjectCard from "../components/ProjectCard";
import type { FeaturedProject } from "../data/projects";
import type { NavigateTo } from "../utils/routing";

type ProjectDetailProps = {
    closeProject: () => void;
    navigateTo: NavigateTo;
    project: FeaturedProject | undefined;
};

function ProjectDetail({
    closeProject,
    navigateTo,
    project,
}: ProjectDetailProps) {
    if (!project) {
        return (
            <section className="project-detail-page px-6 pt-32 pb-24 font-mono">
                <div className="mx-auto w-full max-w-4xl">
                    <h1 className="text-5xl font-semibold tracking-tight text-(--hero-text)">
                        Project not found
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-(--hero-muted)">
                        That project is not in the current featured list.
                    </p>
                    <button
                        className="mt-8 inline-flex cursor-pointer rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm font-bold text-(--hero-text) shadow-lg shadow-slate-900/5 backdrop-blur-xl transition hover:border-(--hero-accent) hover:text-(--hero-accent)"
                        onClick={() => navigateTo("/projects")}
                        type="button"
                    >
                        Back to projects
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="project-detail-page px-6 pt-32 pb-24 font-mono">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-8 flex justify-end">
                    <button
                        className="inline-flex cursor-pointer rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm font-bold text-(--hero-text) shadow-lg shadow-slate-900/5 backdrop-blur-xl transition hover:border-(--hero-accent) hover:text-(--hero-accent)"
                        onClick={closeProject}
                        type="button"
                    >
                        Close
                    </button>
                </div>

                <div className="mx-auto max-w-3xl">
                    <ProjectCard project={project} variant="hero" />
                </div>

                <div className="project-detail-copy mx-auto mt-10 max-w-3xl rounded-xl border border-slate-900/10 bg-white/30 p-7 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-9">
                    <h1 className="text-4xl font-semibold tracking-tight text-(--hero-text)">
                        {project.title}
                    </h1>
                    <p className="mt-6 text-lg font-medium leading-8 text-(--hero-muted)">
                        {project.detailDescription ?? project.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                            <span
                                className="rounded-md bg-slate-900/10 px-3 py-1.5 text-sm font-semibold text-(--hero-accent)"
                                key={tag}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjectDetail;
