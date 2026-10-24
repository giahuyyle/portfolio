import ProjectCard from "../components/ProjectCard";
import { featuredProjects } from "../data/projects";

export default function FeaturedProjects() {
    return (
        <section className="project-band">
            <div className="wrap">
                <div className="section-heading">
                    <div>
                        <p className="section-path">~/work/</p>
                        <h2>Featured Projects</h2>
                    </div>
                    <a className="text-link" href="/projects">View all <span aria-hidden="true">→</span>
                    </a>
                </div>
                <div className="project-grid">{featuredProjects.filter((project) => ["fpl", "job-pulse"].includes(project.repo)).map((project) =>
                    <ProjectCard key={project.repo} project={project} />)}</div>
            </div>
        </section>
    );
}
