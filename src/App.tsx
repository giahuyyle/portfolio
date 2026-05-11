import { useEffect, useMemo, useState, type CSSProperties } from "react";
import BackgroundPulses from "./components/BackgroundPulses";
import Navbar from "./components/Navbar";
import { moreLinks, navLinks } from "./data/navigation";
import { swatches, themes, type ThemeName } from "./data/theme";
import About from "./pages/About";
import Dashboard from "./sections/Dashboard";
import FeaturedProjects from "./sections/FeaturedProjects";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";

function BackButton() {
    return (
        <div className="pointer-events-none fixed inset-x-0 top-20 z-30 px-6 font-mono">
            <div className="mx-auto w-full max-w-6xl">
                <a
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm font-medium tracking-[0.04em] text-(--hero-text) shadow-lg shadow-slate-900/5 backdrop-blur-xl transition hover:border-(--hero-accent) hover:text-(--hero-accent)"
                    href="/"
                    aria-label="Back to home"
                >
                    <span aria-hidden="true">{"<-"}</span>
                    Back
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

    useEffect(() => {
        const handleRouteChange = () => setPathname(window.location.pathname);

        window.addEventListener("popstate", handleRouteChange);

        return () => window.removeEventListener("popstate", handleRouteChange);
    }, []);

    const route = pathname.replace(/\/$/, "") || "/";
    const isHome = route === "/";

    return (
        <main
            className={`min-h-screen text-(--hero-text) ${
                gridEnabled ? "hero-grid" : "hero-flat"
            } ${gridEnabled ? "pulse-shell" : ""}`}
            style={themeStyle}
        >
            {gridEnabled && <BackgroundPulses />}

            <Navbar
                accent={accent}
                activeTheme={themeName}
                gridEnabled={gridEnabled}
                moreLinks={moreLinks}
                navLinks={navLinks}
                swatches={swatches}
                themeNames={Object.keys(themes)}
                onAccentChange={setAccent}
                onGridChange={setGridEnabled}
                onThemeChange={handleThemeChange}
            />

            {!isHome && <BackButton />}

            {isHome ? (
                <>
                    <Hero />

                    <FeaturedProjects />

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

            <Footer />
        </main>
    );
}

export default App;
