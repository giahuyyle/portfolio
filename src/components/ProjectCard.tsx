import type { FeaturedProject } from "../data/projects";
import { getProjectPath } from "../utils/routing";

export function ProjectTerminal({ project, detail = false }: { project: FeaturedProject; detail?: boolean; }) {
    return (
        <div className={`terminal ${detail ? "detail-terminal" : ""}`}>
            <div className="terminal-top">
                <div className="window-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                </div>
                <span>{detail ? "README.md" : "~/projects/"}</span>
                <span aria-hidden="true">↗</span>
            </div>
            <p className="repo">
                <span>{project.owner}</span> / <strong>{project.repo}</strong>
            </p>
            {!detail && <p className="terminal-description">{project.description}</p>}
            <div className="terminal-bottom">
                <span className="prompt" aria-hidden="true">$</span>
                <span>{detail ? `git clone ${project.href}.git` : project.language ?? project.tags[0]}<span className="terminal-caret" aria-hidden="true">_</span>
                </span>{!detail && <span className="build-label">{project.contributorLabel}</span>}</div>
        </div>
    );
}

export function ProjectTags({ tags }: { tags: string[]; }) {
    return <div className="tags od-cluster">{tags.map((tag) =>
        <span className="tag" key={tag}>{tag}</span>)}</div>;
}

export default function ProjectCard({ project, titleTag: Title = "h3" }: { project: FeaturedProject; titleTag?: "h2" | "h3"; }) {
    const path = getProjectPath(project.repo);
    return (
        <article className="project-card">
            <a id={`project-${project.repo}`} className="terminal-link" href={path} aria-label={`Explore ${project.title}`}>
                <ProjectTerminal project={project} />
            </a>
            <div className="card-info">
                <div className="card-title-row">
                    <Title>
                        <a id={`project-title-${project.repo}`} href={path}>{project.title}</a>
                    </Title>
                    <a className="repo-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.title} repository on GitHub`}>↗</a>
                </div>
                <ProjectTags tags={project.tags} />
                <a id={`project-details-${project.repo}`} className="detail-link" href={path}>View project <span aria-hidden="true">→</span>
                </a>
            </div>
        </article>
    );
}
