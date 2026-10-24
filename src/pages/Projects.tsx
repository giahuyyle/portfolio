import ProjectCard from "../components/ProjectCard";
import { featuredProjects, type ProjectFilter } from "../data/projects";

export default function Projects({ filter, onFilterChange }: { filter: ProjectFilter; onFilterChange: (filter: ProjectFilter) => void; }) {
    const visible = featuredProjects.filter((project) => filter === "all" || project.category === filter);
    const filters = [{ value: "all", label: "All projects" }, { value: "web", label: "Web & apps" }, { value: "data", label: "Data & AI" }] as const;
    return (
        <section className="wrap page-section">
            <a className="back-link" href="/">← Home</a>
            <div className="page-heading">
                <div>
                    <p className="section-path">~/projects/</p>
                    <h1 tabIndex={-1}>All <span className="accent">Projects</span>
                    </h1>
                    <p className="muted page-lead">Personal builds, useful tools, and things I&apos;m curious about.</p>
                </div>
                <span className="count-badge">{featuredProjects.length} repositories</span>
            </div>
            <div className="project-filter" role="group" aria-label="Filter projects">{filters.map(({ value, label }) =>
                <button type="button" key={value} aria-pressed={value === filter} onClick={() => onFilterChange(value)}>{label}{value === "all" && <span>{featuredProjects.length}</span>}</button>)}</div>
            <div className="project-grid all-projects">{visible.map((project) =>
                <ProjectCard key={project.repo} project={project} titleTag="h2" />)}</div>
            <p className="project-count small muted" role="status">Showing {visible.length} project{visible.length === 1 ? "" : "s"}</p>
        </section>
    );
}
