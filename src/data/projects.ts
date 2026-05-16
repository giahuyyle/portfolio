import { githubSnapshot, type GitHubProjectSnapshot } from "./github";
import projectConfig from "./projectConfig.json";

type CuratedProject = {
    contributors: string;
    description: string;
    owner: string;
    repo: string;
    tags: string[];
    title: string;
};

export type FeaturedProject = CuratedProject & {
    forks: number;
    href: string;
    language: string | null;
    lastPushed: string;
    openIssues: number;
    stars: number;
};

type ProjectConfig = {
    featuredProjects: CuratedProject[];
};

function projectKey(project: Pick<CuratedProject, "owner" | "repo">) {
    return `${project.owner}/${project.repo}`;
}

function formatPushedAt(value: string | null) {
    if (!value) {
        return "sync pending";
    }

    return new Intl.DateTimeFormat("en-CA", {
        day: "numeric",
        month: "short",
        timeZone: "America/Edmonton",
        year: "numeric",
    }).format(new Date(value));
}

function mergeTags(
    curatedTags: string[],
    githubProject: GitHubProjectSnapshot | undefined,
) {
    const mergedTags = [
        ...curatedTags,
        ...(githubProject?.language ? [githubProject.language] : []),
        ...(githubProject?.topics ?? []),
    ];

    return Array.from(new Set(mergedTags.map((tag) => tag.toLowerCase()))).slice(
        0,
        5,
    );
}

const configuredProjects = (projectConfig as ProjectConfig).featuredProjects;

export const featuredProjects: FeaturedProject[] = configuredProjects.map(
    (project) => {
        const githubProject = githubSnapshot.projects[projectKey(project)];

        return {
            ...project,
            description: project.description || githubProject?.description || "",
            forks: githubProject?.forks ?? 0,
            href:
                githubProject?.url ??
                `https://github.com/${project.owner}/${project.repo}`,
            language: githubProject?.language ?? null,
            lastPushed: formatPushedAt(githubProject?.pushedAt ?? null),
            openIssues: githubProject?.openIssues ?? 0,
            stars: githubProject?.stars ?? 0,
            tags: mergeTags(project.tags, githubProject),
        };
    },
);
