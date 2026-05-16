import { featuredProjects } from "../data/projects";

function FeaturedProjects() {
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
                        href="#projects"
                    >
                        View all -&gt;
                    </a>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {featuredProjects.map((project) => (
                        <article
                            className="project-card overflow-hidden rounded-xl border border-slate-900/10 bg-white/35 shadow-2xl shadow-slate-900/10"
                            key={`${project.owner}/${project.repo}`}
                        >
                            <div className="project-preview bg-[#aeb9c4] p-8 sm:p-10">
                                <div className="terminal-card">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="size-3 rounded-full bg-[#ff4638]" />
                                            <span className="size-3 rounded-full bg-[#ffd022]" />
                                            <span className="size-3 rounded-full bg-[#38d268]" />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-white/90">
                                            <span>{project.stars}</span>
                                            <span aria-hidden="true">★</span>
                                        </div>
                                    </div>

                                    <p className="mt-7 text-lg text-[#f47ac2]">
                                        {project.owner}{" "}
                                        <span className="text-white/70">/</span>{" "}
                                        <span className="text-[#4ee06f]">
                                            {project.repo}
                                        </span>
                                    </p>

                                    <p className="mt-6 max-w-md text-base leading-7 text-white/90">
                                        {project.description}
                                    </p>

                                    <div className="mt-12 flex items-end justify-between gap-4 text-sm text-white/50">
                                        <div className="flex -space-x-2">
                                            {project.tags
                                                .slice(0, 4)
                                                .map((tag) => (
                                                    <span
                                                        className="grid size-9 place-items-center rounded-full border-2 border-[#272a36] bg-(--hero-accent) text-xs font-semibold text-white"
                                                        key={tag}
                                                    >
                                                        {tag
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                ))}
                                        </div>
                                        <span>{project.contributors}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">
                                <h3 className="project-title text-2xl font-bold text-(--hero-text)">
                                    {project.title}
                                </h3>
                                <p className="mt-5 text-base font-medium leading-8 text-(--hero-muted)">
                                    {project.description}
                                </p>
                                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-(--hero-muted)">
                                    <span>
                                        Updated{" "}
                                        <span className="text-(--hero-accent)">
                                            {project.lastPushed}
                                        </span>
                                    </span>
                                    {project.language ? (
                                        <span>{project.language}</span>
                                    ) : null}
                                    <span>{project.forks} forks</span>
                                    <span>{project.openIssues} open</span>
                                </div>
                                <div className="mt-7 flex flex-wrap items-center gap-3">
                                    <TagIcon />
                                    {project.tags.map((tag) => (
                                        <span
                                            className="rounded-md bg-slate-900/10 px-3 py-1.5 text-sm font-semibold text-(--hero-accent)"
                                            key={tag}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    className="mt-7 inline-flex text-sm font-bold text-(--hero-accent) underline decoration-dashed underline-offset-6 transition hover:text-(--hero-text)"
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View repository -&gt;
                                </a>
                            </div>
                        </article>
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

function TagIcon() {
    return (
        <svg
            className="size-5 text-(--hero-muted)"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M20 13.2 12.2 21 3 11.8V3h8.8L20 11.2a1.4 1.4 0 0 1 0 2ZM7.5 7.5h.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

export default FeaturedProjects;
