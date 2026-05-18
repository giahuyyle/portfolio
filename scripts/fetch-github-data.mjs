import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const configUrl = new URL("../src/data/projectConfig.json", import.meta.url);
const outputUrl = new URL("../src/data/github.generated.json", import.meta.url);
const syncCommitMessage = "chore: sync github data";

function requireString(value, fieldName) {
    if (typeof value !== "string" || value.length === 0) {
        throw new Error(`Missing required project field: ${fieldName}`);
    }

    return value;
}

function getSourceSha() {
    try {
        return execFileSync(
            "git",
            [
                "log",
                "-n",
                "1",
                "--format=%H",
                "--invert-grep",
                `--grep=^${syncCommitMessage}$`,
            ],
            { encoding: "utf8" },
        ).trim();
    } catch {
        return process.env.GITHUB_SHA ?? null;
    }
}

async function readJson(url) {
    return JSON.parse(await readFile(url, "utf8"));
}

async function readPreviousSnapshot() {
    try {
        return await readJson(outputUrl);
    } catch {
        return null;
    }
}

function comparableSnapshot(snapshot) {
    return JSON.stringify({
        build: snapshot.build,
        projects: snapshot.projects,
    });
}

function getHeaders() {
    const headers = {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-github-sync",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    return headers;
}

async function fetchGitHubJson(url, context) {
    const response = await fetch(url, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        let detail = `${response.status} ${response.statusText}`;

        try {
            const body = await response.json();
            if (typeof body.message === "string") {
                detail = `${detail}: ${body.message}`;
            }
        } catch {
            // Keep the HTTP status as the useful failure detail.
        }

        throw new Error(`GitHub API request failed for ${context}: ${detail}`);
    }

    return response.json();
}

async function fetchRepoContributors(owner, repo) {
    const contributors = await fetchGitHubJson(
        `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
        `${owner}/${repo} contributors`,
    );

    if (!Array.isArray(contributors)) {
        return [];
    }

    return contributors
        .filter((contributor) => typeof contributor.login === "string")
        .map((contributor) => ({
            avatarUrl: contributor.avatar_url ?? null,
            contributions: contributor.contributions ?? 0,
            login: contributor.login,
            url:
                contributor.html_url ??
                `https://github.com/${contributor.login}`,
        }));
}

async function fetchRepo(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        let detail = `${response.status} ${response.statusText}`;

        try {
            const body = await response.json();
            if (typeof body.message === "string") {
                detail = `${detail}: ${body.message}`;
            }
        } catch {
            // Keep the HTTP status as the useful failure detail.
        }

        throw new Error(`GitHub API request failed for ${owner}/${repo}: ${detail}`);
    }

    const data = await response.json();
    const contributors = await fetchRepoContributors(owner, repo);

    return {
        contributorCount: contributors.length,
        contributors,
        description: data.description ?? null,
        forks: data.forks_count ?? 0,
        language: data.language ?? null,
        openIssues: data.open_issues_count ?? 0,
        owner,
        pushedAt: data.pushed_at ?? null,
        repo,
        stars: data.stargazers_count ?? 0,
        topics: Array.isArray(data.topics) ? data.topics.sort() : [],
        url: data.html_url ?? `https://github.com/${owner}/${repo}`,
    };
}

const config = await readJson(configUrl);

if (!Array.isArray(config.featuredProjects)) {
    throw new Error("projectConfig.json must include a featuredProjects array.");
}

if (!process.env.GITHUB_TOKEN) {
    console.warn(
        "GITHUB_TOKEN is not set. Using unauthenticated GitHub API requests.",
    );
}

const projectEntries = await Promise.all(
    config.featuredProjects.map(async (project) => {
        const owner = requireString(project.owner, "owner");
        const repo = requireString(project.repo, "repo");

        return [`${owner}/${repo}`, await fetchRepo(owner, repo)];
    }),
);

const sourceSha = getSourceSha();
const previousSnapshot = await readPreviousSnapshot();
const nextSnapshot = {
    syncedAt: new Date().toISOString(),
    build: {
        repository: process.env.GITHUB_REPOSITORY ?? "giahuyyle/portfolio",
        sha: sourceSha,
        shortSha: sourceSha ? sourceSha.slice(0, 7) : "local",
    },
    projects: Object.fromEntries(projectEntries),
};

if (
    previousSnapshot &&
    comparableSnapshot(previousSnapshot) === comparableSnapshot(nextSnapshot)
) {
    nextSnapshot.syncedAt = previousSnapshot.syncedAt;
}

await writeFile(outputUrl, `${JSON.stringify(nextSnapshot, null, 4)}\n`);

console.log(
    `Synced ${projectEntries.length} GitHub repos to src/data/github.generated.json.`,
);
