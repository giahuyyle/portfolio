import ProjectCard from "../components/ProjectCard";
import type { FeaturedProject } from "../data/projects";
import type { NavigateTo } from "../utils/routing";

type ProjectDetailProps = {
    closeProject: () => void;
    navigateTo: NavigateTo;
    project: FeaturedProject | undefined;
};

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
                    className="rounded bg-slate-900/10 px-1.5 py-0.5 text-base text-(--hero-text)"
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
        <div className="mt-6 space-y-6 text-lg font-medium leading-8 text-(--hero-muted)">
            {blocks.map((block, index) => {
                if (block.type === "heading") {
                    const HeadingTag = block.level <= 2 ? "h2" : "h3";

                    return (
                        <HeadingTag
                            className="pt-2 text-2xl font-semibold leading-tight tracking-tight text-(--hero-text)"
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
                    <ProjectDescription
                        fallback={project.description}
                        markdown={project.detailDescription ?? ""}
                        title={project.title}
                    />
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
