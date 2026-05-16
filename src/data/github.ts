import snapshot from "./github.generated.json";

export type GitHubProjectSnapshot = {
    description: string | null;
    forks: number;
    language: string | null;
    openIssues: number;
    owner: string;
    pushedAt: string | null;
    repo: string;
    stars: number;
    topics: string[];
    url: string;
};

export type GitHubSnapshot = {
    syncedAt: string | null;
    build: {
        repository: string;
        sha: string | null;
        shortSha: string;
    };
    projects: Record<string, GitHubProjectSnapshot>;
};

export const githubSnapshot = snapshot as GitHubSnapshot;
