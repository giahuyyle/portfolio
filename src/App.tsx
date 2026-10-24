import { flushSync } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import Navbar from "./components/Navbar";
import { featuredProjects, type ProjectFilter } from "./data/projects";
import { defaultAccent, getThemeStyle, swatches, themes, type ThemeName } from "./data/theme";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Dashboard from "./sections/Dashboard";
import FeaturedProjects from "./sections/FeaturedProjects";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import { decodeProjectRepo, internalAnchor, normalizeRoute, runRouteTransition, type NavigateOptions, type RouteHistoryState } from "./utils/routing";

import { readPreference as storedValue, writePreference } from "./utils/preferences";

function storedTheme(): ThemeName {
    const name = storedValue("portfolio-theme", "Latte");
    return Object.hasOwn(themes, name) ? name as ThemeName : "Latte";
}
function storedAccent() {
    const accent = storedValue("portfolio-accent", defaultAccent);
    return swatches.includes(accent) ? accent : defaultAccent;
}
function historyState(): RouteHistoryState | undefined {
    const state = window.history.state;
    return state && typeof state.portfolioKey === "string" ? state : undefined;
}

export default function App() {
    const [themeName, setThemeName] = useState<ThemeName>(storedTheme);
    const [accent, setAccent] = useState(storedAccent);
    const [pathname, setPathname] = useState(window.location.pathname);
    const [filter, setFilter] = useState<ProjectFilter>("all");
    const entries = useRef(new Map<string, { y: number; focusId?: string; }>());
    const currentKey = useRef("");
    const route = normalizeRoute(pathname) ?? "/";

    useLayoutEffect(() => {
        const style = getThemeStyle(themeName, accent) as Record<string, string>;
        for (const [key, value] of Object.entries(style)) document.documentElement.style.setProperty(key, value);
        document.documentElement.dataset.theme = themeName;
        writePreference("portfolio-theme", themeName);
        writePreference("portfolio-accent", accent);
    }, [themeName, accent]);

    useEffect(() => {
        const previousRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        const initial = historyState() ?? { portfolioKey: crypto.randomUUID() };
        window.history.replaceState(initial, "");
        currentKey.current = initial.portfolioKey;
        const onPopState = () => {
            const previous = entries.current.get(currentKey.current);
            entries.current.set(currentKey.current, { ...previous, y: window.scrollY });
            const next = historyState() ?? { portfolioKey: crypto.randomUUID() };
            window.history.replaceState(next, "");
            currentKey.current = next.portfolioKey;
            const saved = entries.current.get(next.portfolioKey);
            runRouteTransition(() => {
                flushSync(() => setPathname(window.location.pathname));
                const focus = (saved?.focusId ? document.getElementById(saved.focusId) : null) ?? document.querySelector<HTMLElement>("h1");
                focus?.focus({ preventScroll: true });
                window.scrollTo({ top: saved?.y ?? 0, behavior: "instant" });
            });
        };
        window.addEventListener("popstate", onPopState);
        return () => {
            window.removeEventListener("popstate", onPopState);
            window.history.scrollRestoration = previousRestoration;
        };
    }, []);

    const navigateTo = useCallback((path: string, options: NavigateOptions = {}) => {
        const next = normalizeRoute(path);
        const current = normalizeRoute(window.location.pathname);
        if (!next || next === current) return;
        const active = document.activeElement;
        const anchor = active instanceof HTMLAnchorElement ? active : null;
        entries.current.set(currentKey.current, { y: window.scrollY, focusId: anchor?.id });
        const state: RouteHistoryState = { portfolioKey: crypto.randomUUID(), from: current ?? undefined };
        runRouteTransition(() => {
            if (options.replace) window.history.replaceState(state, "", next);
            else window.history.pushState(state, "", next);
            currentKey.current = state.portfolioKey;
            flushSync(() => setPathname(window.location.pathname));
            document.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
            if (options.scroll !== false) window.scrollTo({ top: 0, behavior: "instant" });
        });
    }, []);

    const handleLink = (event: MouseEvent<HTMLDivElement>) => {
        const anchor = internalAnchor(event);
        if (!anchor) return;
        event.preventDefault();
        anchor.focus({ preventScroll: true });
        const state = historyState();
        if (anchor.dataset.projectReturn && (state?.from === "/projects" || state?.from === "/")) window.history.back();
        else navigateTo(anchor.pathname);
    };

    const match = route.match(/^\/projects\/([^/]+)$/);
    const project = match ? featuredProjects.find((item) => item.repo === decodeProjectRepo(match[1])) : undefined;
    const from = historyState()?.from;
    const returnPath = from === "/" ? "/" : "/projects";
    useEffect(() => {
        document.title = `${route === "/" ? "Home" : route === "/about" ? "About" : route === "/projects" ? "Projects" : project?.title ?? "Page not found"} · Huy Le`;
    }, [route, project]);

    return (
        <div onClick={handleLink}>
            <a className="skip" href="#content">Skip to content</a>
            <Navbar pathname={route} accent={accent} activeTheme={themeName} onAccentChange={setAccent} onThemeChange={setThemeName} />
            <main id="content" tabIndex={-1} key={route}>
                {route === "/" ? <>
                    <Hero />
                    <FeaturedProjects />
                    <Dashboard activeTheme={themeName} onThemeChange={setThemeName} />
                </> : route === "/about" ? <About /> : route === "/projects" ? <Projects filter={filter} onFilterChange={setFilter} /> : match ? <ProjectDetail project={project} returnPath={returnPath} /> : <section className="wrap page-section">
                    <a className="back-link" href="/">← Home</a>
                    <h1 tabIndex={-1}>Page not found</h1>
                    <p className="page-lead muted">This page is not in the current portfolio.</p>
                </section>}
            </main>
            <Footer />
        </div>
    );
}
