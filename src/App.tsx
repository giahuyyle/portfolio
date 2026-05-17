import { flushSync } from "react-dom";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type CSSProperties,
} from "react";
import BackgroundPulses from "./components/BackgroundPulses";
import Navbar from "./components/Navbar";
import { moreLinks, navLinks } from "./data/navigation";
import { featuredProjects } from "./data/projects";
import { swatches, themes, type ThemeName } from "./data/theme";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Dashboard from "./sections/Dashboard";
import FeaturedProjects from "./sections/FeaturedProjects";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import {
    normalizeRoute,
    runRouteTransition,
    type NavigateOptions,
} from "./utils/routing";

function BackButton({
    href,
    label,
    onNavigate,
}: {
    href: string;
    label: string;
    onNavigate: (path: string) => void;
}) {
    return (
        <div className="pointer-events-none fixed inset-x-0 top-20 z-30 px-6 font-mono">
            <div className="mx-auto w-full max-w-6xl">
                <a
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm font-medium tracking-[0.04em] text-(--hero-text) shadow-lg shadow-slate-900/5 backdrop-blur-xl transition hover:border-(--hero-accent) hover:text-(--hero-accent)"
                    href={href}
                    onClick={(event) => {
                        event.preventDefault();
                        onNavigate(href);
                    }}
                    aria-label={label}
                >
                    <span aria-hidden="true">{"<-"}</span>
                    {label}
                </a>
            </div>
        </div>
    );
}

function App() {
    const [themeName, setThemeName] = useState<ThemeName>("Latte");
    const [accent, setAccent] = useState(themes.Latte.accent);
    const [gridEnabled, setGridEnabled] = useState(true);
    const [pathname, setPathname] = useState(window.location.pathname);

    const theme = themes[themeName];
    const themeStyle = useMemo(
        () =>
            ({
                "--hero-bg": theme.bg,
                "--hero-text": theme.text,
                "--hero-muted": theme.muted,
                "--hero-soft": theme.soft,
                "--hero-accent": accent,
                "--hero-panel": theme.panel,
                "--hero-grid": theme.grid,
            }) as CSSProperties,
        [accent, theme],
    );

    const handleThemeChange = (name: string) => {
        const nextTheme = name as ThemeName;

        setThemeName(nextTheme);
        setAccent(themes[nextTheme].accent);
    };

    const commitRoute = useCallback(
        (path: string, options: NavigateOptions = {}) => {
            const nextRoute = normalizeRoute(path);
            const currentRoute = normalizeRoute(window.location.pathname);

            if (nextRoute === currentRoute) {
                return;
            }

            const state = options.state ?? { from: currentRoute };

            if (options.replace) {
                window.history.replaceState(state, "", nextRoute);
            } else {
                window.history.pushState(state, "", nextRoute);
            }

            flushSync(() => setPathname(window.location.pathname));

            if (options.scroll !== false) {
                window.scrollTo({ top: 0 });
            }
        },
        [],
    );

    const navigateTo = useCallback(
        (path: string, options?: NavigateOptions) => {
            runRouteTransition(() => commitRoute(path, options));
        },
        [commitRoute],
    );

    const closeProject = useCallback(() => {
        const routeState = window.history.state as
            | { from?: string }
            | null
            | undefined;

        if (routeState?.from) {
            window.history.back();
            return;
        }

        navigateTo("/projects", { replace: true });
    }, [navigateTo]);

    useEffect(() => {
        const handleRouteChange = () => {
            runRouteTransition(() => {
                flushSync(() => setPathname(window.location.pathname));
                window.scrollTo({ top: 0 });
            });
        };

        window.addEventListener("popstate", handleRouteChange);

        return () => window.removeEventListener("popstate", handleRouteChange);
    }, []);

    const route = pathname.replace(/\/$/, "") || "/";
    const isHome = route === "/";
    const projectRouteMatch = route.match(/^\/projects\/([^/]+)$/);
    const selectedProject = projectRouteMatch
        ? featuredProjects.find(
              (project) =>
                  project.repo === decodeURIComponent(projectRouteMatch[1]),
          )
        : undefined;
    const isProjectDetail = Boolean(projectRouteMatch);
    const isProjectsRoute = route === "/projects" || isProjectDetail;
    const showGrid = gridEnabled && !isProjectsRoute;

    return (
        <main
            className={`min-h-screen text-(--hero-text) ${
                showGrid ? "hero-grid" : "hero-flat"
            } ${showGrid ? "pulse-shell" : ""} ${
                isProjectsRoute ? "projects-route-surface" : ""
            }`}
            style={themeStyle}
        >
            {showGrid && <BackgroundPulses />}

            <Navbar
                accent={accent}
                activeTheme={themeName}
                gridEnabled={gridEnabled}
                moreLinks={moreLinks}
                navLinks={navLinks}
                pathname={pathname}
                swatches={swatches}
                themeNames={Object.keys(themes)}
                onAccentChange={setAccent}
                onGridChange={setGridEnabled}
                onNavigate={navigateTo}
                onThemeChange={handleThemeChange}
            />

            {!isHome && !isProjectDetail && (
                <BackButton
                    href="/"
                    label="Back"
                    onNavigate={(path) => navigateTo(path)}
                />
            )}

            <div className="route-shell" key={route}>
                {isHome ? (
                    <>
                        <Hero />

                        <FeaturedProjects navigateTo={navigateTo} />

                        <Dashboard
                            accent={accent}
                            activeTheme={themeName}
                            gridEnabled={gridEnabled}
                            swatches={swatches}
                            themeNames={Object.keys(themes)}
                            onAccentChange={setAccent}
                            onGridChange={setGridEnabled}
                            onThemeChange={handleThemeChange}
                        />
                    </>
                ) : route === "/about" ? (
                    <About />
                ) : route === "/projects" ? (
                    <Projects navigateTo={navigateTo} />
                ) : isProjectDetail ? (
                    <ProjectDetail
                        closeProject={closeProject}
                        navigateTo={navigateTo}
                        project={selectedProject}
                    />
                ) : (
                    <section className="px-6 pt-32 pb-20 font-mono">
                        <div className="mx-auto w-full max-w-6xl">
                            <h1 className="text-5xl font-semibold capitalize tracking-tight text-(--hero-text)">
                                {route.slice(1).replaceAll("-", " ")}
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-(--hero-muted)">
                                This page is a placeholder for now.
                            </p>
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default App;
