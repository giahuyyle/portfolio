export type NavigateOptions = {
    replace?: boolean;
    scroll?: boolean;
    state?: Record<string, string | undefined>;
};

export type NavigateTo = (path: string, options?: NavigateOptions) => void;

type ViewTransitionDocument = Document & {
    startViewTransition?: (callback: () => void) => void;
};

export function normalizeRoute(path: string) {
    const url = new URL(path, window.location.origin);

    return url.pathname.replace(/\/$/, "") || "/";
}

export function getProjectPath(repo: string) {
    return `/projects/${repo}`;
}

export function getProjectTransitionName(repo: string) {
    return `project-${repo.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;
}

export function runRouteTransition(callback: () => void) {
    const motionReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (motionReduced || !transitionDocument.startViewTransition) {
        callback();
        return;
    }

    transitionDocument.startViewTransition(callback);
}
