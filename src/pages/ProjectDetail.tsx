import { ProjectTags, ProjectTerminal } from "../components/ProjectCard";
import { featuredProjects, type FeaturedProject } from "../data/projects";
import { getProjectPath } from "../utils/routing";

type MarkdownBlock =
    | {
        level: number;
        text: string;
        type: "heading";
    }
    | {
        text: string;
        type: "paragraph";
    }
    | {
        items: string[];
        type: "list";
    };

function stripMatchingTitle(markdown: string, title: string) {
    const lines = markdown.trim().split("\n");
    const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);

    if (firstContentIndex === -1) {
        return "";
    }

    const titleMatch = lines[firstContentIndex].trim().match(/^#\s+(.+)$/);

    if (titleMatch?.[1].trim().toLowerCase() !== title.toLowerCase()) {
        return markdown;
    }

    return lines
        .filter((_, index) => index !== firstContentIndex)
        .join("\n")
        .trim();
}

function parseProjectMarkdown(markdown: string, title: string) {
    const normalizedMarkdown = stripMatchingTitle(markdown, title);
    const lines = normalizedMarkdown.split("\n");
    const blocks: MarkdownBlock[] = [];
    let paragraph: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
        if (paragraph.length === 0) {
            return;
        }

        blocks.push({
            text: paragraph.join(" ").trim(),
            type: "paragraph",
        });
        paragraph = [];
    };

    const flushList = () => {
        if (listItems.length === 0) {
            return;
        }

        blocks.push({
            items: listItems,
            type: "list",
        });
        listItems = [];
    };

    lines.forEach((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            flushParagraph();
            flushList();
            return;
        }

        const headingMatch = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
        const listMatch = trimmedLine.match(/^[-*]\s+(.+)$/);

        if (headingMatch) {
            flushParagraph();
            flushList();
            blocks.push({
                level: headingMatch[1].length,
                text: headingMatch[2],
                type: "heading",
            });
            return;
        }

        if (listMatch) {
            flushParagraph();
            listItems.push(listMatch[1]);
            return;
        }

        flushList();
        paragraph.push(trimmedLine);
    });

    flushParagraph();
    flushList();

    return blocks;
}

function renderInlineMarkdown(text: string) {
    return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith("`") && part.endsWith("`")) {
            return (
                <code

                    key={index}
                >
                    {part.slice(1, -1)}
                </code>
            );
        }

        return part;
    });
}

function ProjectDescription({
    fallback,
    markdown,
    title,
}: {
    fallback: string;
    markdown: string;
    title: string;
}) {
    const blocks = parseProjectMarkdown(markdown || fallback, title);

    if (blocks.length === 0) {
        return (
            <p className="mt-6 text-lg font-medium leading-8 text-(--hero-muted)">
                {fallback}
            </p>
        );
    }

    return (
        <div className="detail-copy">
            {blocks.map((block, index) => {
                if (block.type === "heading") {
                    const HeadingTag = block.level <= 2 ? "h2" : "h3";

                    return (
                        <HeadingTag

                            key={`${block.type}-${index}`}
                        >
                            {renderInlineMarkdown(block.text)}
                        </HeadingTag>
                    );
                }

                if (block.type === "list") {
                    return (
                        <ul
                            className="list-disc space-y-2 pl-6"
                            key={`${block.type}-${index}`}
                        >
                            {block.items.map((item) => (
                                <li key={item}>{renderInlineMarkdown(item)}</li>
                            ))}
                        </ul>
                    );
                }

                return (
                    <p key={`${block.type}-${index}`}>
                        {renderInlineMarkdown(block.text)}
                    </p>
                );
            })}
        </div>
    );
}

export default function ProjectDetail({ project, returnPath }: { project: FeaturedProject | undefined; returnPath: string; }) {
    if (!project) {
        return <section className="wrap page-section">
            <a className="back-link" href="/projects">← All projects</a>
            <h1 tabIndex={-1}>Project not found</h1>
            <p className="page-lead muted">That project is not in the current portfolio.</p>
        </section>;
    }
    const next = featuredProjects[(featuredProjects.indexOf(project) + 1) % featuredProjects.length];
    return (
        <section className="wrap page-section">
            <a className="back-link" href={returnPath} data-project-return="true">← {returnPath === "/" ? "Home" : "All projects"}</a>
            <header className="detail-header">
                <p className="section-path">~/projects/{project.repo}/</p>
                <h1 tabIndex={-1}>{project.title}</h1>
                <p className="detail-lead muted">{project.description}</p>
                <div className="detail-meta">
                    <span>{project.contributorLabel}</span>
                    <a className="inline-link" href={project.href} target="_blank" rel="noreferrer">Source on GitHub ↗</a>
                </div>
            </header>
            <div className="detail-layout">
                <div>
                    <ProjectTerminal project={project} detail />
                    <ProjectDescription fallback={project.description} markdown={project.detailDescription ?? ""} title={project.title} />
                </div>
                <aside className="project-sidebar" aria-label="Project details">
                    <p className="small-label">Project details</p>
                    <div className="sidebar-field od-field">
                        <b>Built with</b>
                        <ProjectTags tags={project.tags} />
                    </div>
                    <div className="sidebar-field od-field">
                        <b>Contribution</b>
                        <span>{project.contributorLabel}</span>
                    </div>
                    <div className="sidebar-field od-field">
                        <b>Repository</b>
                        <span>Updated {project.lastPushed}</span>
                        <span>{project.stars} stars / {project.forks} forks</span>
                        <span>{project.openIssues} open issues</span>
                    </div>
                    <div className="sidebar-field od-field">
                        <b>Links</b>
                        <a className="text-link" href={project.href} target="_blank" rel="noreferrer">Repository ↗</a>
                    </div>
                    <a className="pill-button" href="mailto:huyyyylegia@gmail.com">Ask me about it →</a>
                </aside>
            </div>
            <div className="detail-next">
                <p className="small muted">More things I&apos;ve built</p>
                <a href={getProjectPath(next.repo)}>{next.title} →</a>
            </div>
        </section>
    );
}
