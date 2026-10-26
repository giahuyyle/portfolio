import type { MouseEvent } from "react";

export type NavigateOptions = { replace?: boolean; scroll?: boolean; };
export type NavigateTo = (path: string, options?: NavigateOptions) => void;
export type RouteHistoryState = { portfolioKey: string; from?: string; };

export function normalizeRoute(path: string) {
    try {
        const url = new URL(path, window.location.origin);
        if (url.origin !== window.location.origin) return null;
        return url.pathname.replace(/\/+$/, "") || "/";
    } catch {
        return null;
    }
}

export function decodeProjectRepo(value: string) {
    try { return decodeURIComponent(value); } catch { return undefined; }
}

export function getProjectPath(repo: string) {
    return `/projects/${encodeURIComponent(repo)}`;
}

export function internalAnchor(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
    const anchor = event.target instanceof Element ? event.target.closest("a") : null;
    if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self") || anchor.rel.includes("external")) return null;
    const url = new URL(anchor.href);
    if (url.origin !== window.location.origin || url.hash || url.search || !["http:", "https:"].includes(url.protocol)) return null;
    const path = normalizeRoute(url.pathname);
    if (!path || !(path === "/" || path === "/about" || path === "/blogs" || path === "/projects" || path.startsWith("/projects/"))) return null;
    return anchor;
}

export function runRouteTransition(callback: () => void) {
    const doc = document as Document & { startViewTransition?: (callback: () => void) => unknown; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !doc.startViewTransition) {
        callback();
    } else {
        doc.startViewTransition(callback);
    }
}
