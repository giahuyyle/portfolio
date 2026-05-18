import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import type { FeaturedProject } from "../data/projects";
import {
    getProjectPath,
    getProjectTransitionName,
    type NavigateTo,
} from "../utils/routing";

type ProjectCardProps = {
    project: FeaturedProject;
    navigateTo?: NavigateTo;
    variant?: "default" | "hero";
};

function isActivationKey(event: KeyboardEvent<HTMLElement>) {
    return event.key === "Enter" || event.key === " ";
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

function getContributorInitial(login: string) {
    return login.charAt(0).toUpperCase();
}

function ProjectCard({
    project,
    navigateTo,
    variant = "default",
}: ProjectCardProps) {
    const projectPath = getProjectPath(project.repo);
    const interactive = variant !== "hero";
    const transitionStyle = {
        viewTransitionName: getProjectTransitionName(project.repo),
    } as CSSProperties;

    const openProject = () => {
        if (interactive) {
            navigateTo?.(projectPath);
        }
    };

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (!interactive) {
            return;
        }

        if (event.target instanceof Element && event.target.closest("a")) {
            return;
        }

        openProject();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (!interactive || !isActivationKey(event)) {
            return;
        }

        event.preventDefault();
        openProject();
    };

    const handleDetailClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!navigateTo) {
            return;
        }

        event.preventDefault();
        navigateTo(projectPath);
    };

    return (
        <article
            className={`project-card overflow-hidden rounded-xl border border-slate-900/10 bg-white/35 shadow-2xl shadow-slate-900/10 ${
                variant === "hero" ? "project-card-static" : ""
            }`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={interactive ? "link" : undefined}
            tabIndex={interactive ? 0 : undefined}
            style={transitionStyle}
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
                        <span className="text-[#4ee06f]">{project.repo}</span>
                    </p>

                    <p className="mt-6 max-w-md text-base leading-7 text-white/90">
                        {project.description}
                    </p>

                    <div className="mt-12 flex items-end justify-between gap-4 text-sm text-white/50">
                        <div className="flex -space-x-2">
                            {project.contributorProfiles.map((contributor) => (
                                <a
                                    className="grid size-9 place-items-center overflow-hidden rounded-full border-2 border-[#272a36] bg-(--hero-accent) text-xs font-semibold text-white transition hover:translate-y-[-1px]"
                                    href={contributor.url}
                                    key={contributor.login}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${contributor.login} on GitHub`}
                                >
                                    {contributor.avatarUrl ? (
                                        <img
                                            className="size-full object-cover"
                                            src={contributor.avatarUrl}
                                            alt=""
                                        />
                                    ) : (
                                        getContributorInitial(contributor.login)
                                    )}
                                </a>
                            ))}
                        </div>
                        <span>{project.contributorLabel}</span>
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
                    {project.language ? <span>{project.language}</span> : null}
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
                <div className="mt-7 flex flex-wrap gap-4">
                    {interactive ? (
                        <a
                            className="inline-flex text-sm font-bold text-(--hero-accent) underline decoration-dashed underline-offset-6 transition hover:text-(--hero-text)"
                            href={projectPath}
                            onClick={handleDetailClick}
                        >
                            View details -&gt;
                        </a>
                    ) : null}
                    <a
                        className="inline-flex text-sm font-bold text-(--hero-muted) underline decoration-dashed underline-offset-6 transition hover:text-(--hero-accent)"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Repository -&gt;
                    </a>
                </div>
            </div>
        </article>
    );
}

export default ProjectCard;
