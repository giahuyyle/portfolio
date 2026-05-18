import { useEffect, useState } from "react";
import { placeholderCommits, placeholderPosts } from "../data/dashboard";
import { socialLinks } from "../data/navigation";
import type { ThemeName } from "../data/theme";

type DashboardProps = {
    accent: string;
    activeTheme: ThemeName;
    gridEnabled: boolean;
    swatches: string[];
    themeNames: string[];
    onAccentChange: (accent: string) => void;
    onGridChange: (enabled: boolean) => void;
    onThemeChange: (theme: string) => void;
};

function formatMountainTime() {
    return new Intl.DateTimeFormat("en-CA", {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Edmonton",
    }).format(new Date());
}

function Dashboard({
    accent,
    activeTheme,
    gridEnabled,
    swatches,
    themeNames,
    onAccentChange,
    onGridChange,
    onThemeChange,
}: DashboardProps) {
    const [mountainTime, setMountainTime] = useState(formatMountainTime);
    const emailHref =
        socialLinks.find((link) => link.href.startsWith("mailto:"))?.href ??
        "mailto:huyyyylegia@gmail.com";

    useEffect(() => {
        const timer = window.setInterval(() => {
            setMountainTime(formatMountainTime());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section className="px-6 pt-20 pb-8 font-mono" id="dashboard">
            <div className="mx-auto grid w-full max-w-6xl gap-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    <article className="dashboard-card">
                        <h2 className="dashboard-title">
                            <PaletteIcon />
                            Theme
                        </h2>

                        <div className="mt-6 grid grid-cols-2 rounded-lg border border-slate-900/10 p-1 text-sm font-medium text-(--hero-muted)">
                            {themeNames.map((name) => (
                                <button
                                    className={`rounded-md px-3 py-2 transition ${
                                        activeTheme === name
                                            ? "bg-(--hero-accent) text-white shadow-sm ring-1 ring-(--hero-accent)"
                                            : "hover:text-(--hero-accent)"
                                    }`}
                                    key={name}
                                    onClick={() => onThemeChange(name)}
                                    type="button"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 grid grid-cols-7 gap-2">
                            {swatches.map((color) => (
                                <button
                                    className="size-8 rounded-lg border-2 transition"
                                    key={color}
                                    onClick={() => onAccentChange(color)}
                                    style={{
                                        backgroundColor: color,
                                        borderColor:
                                            accent === color
                                                ? "#ffffff"
                                                : color,
                                        boxShadow:
                                            accent === color
                                                ? `0 0 0 2px ${color}`
                                                : "none",
                                    }}
                                    type="button"
                                    aria-label={`Use ${color} accent`}
                                />
                            ))}
                        </div>

                        <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm font-medium text-(--hero-muted)">
                            <input
                                checked={gridEnabled}
                                className="size-5 accent-(--hero-accent)"
                                onChange={(event) =>
                                    onGridChange(event.target.checked)
                                }
                                type="checkbox"
                            />
                            Background effect:
                            <span className="text-(--hero-accent)">
                                {gridEnabled ? "on" : "off"}
                            </span>
                        </label>
                    </article>

                    <article className="dashboard-card">
                        <h2 className="dashboard-title">
                            <CalendarIcon />
                            Let&apos;s Connect
                        </h2>
                        <p className="mt-6 text-base font-medium leading-8 text-(--hero-muted)">
                            Always open to interesting projects,
                            collaborations, and conversations.
                        </p>
                        <a
                            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-(--hero-accent) px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:opacity-90"
                            href={emailHref}
                        >
                            <CalendarIcon />
                            Book a Chat
                        </a>
                    </article>

                    <article className="dashboard-card">
                        <h2 className="dashboard-title">
                            <LocationIcon />
                            Currently Based In
                        </h2>
                        <div className="map-placeholder mt-6">
                            <img
                                src="/image/edmonton-map.png"
                                alt="Street map of Edmonton, Alberta"
                            />
                            <span>EDMONTON</span>
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-4 text-sm font-medium text-(--hero-muted)">
                            <span>Edmonton, AB</span>
                            <span className="text-(--hero-accent)">
                                MT {mountainTime}
                            </span>
                        </div>
                    </article>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <article className="dashboard-card">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="dashboard-title">
                                <ActivityIcon />
                                Recent Commits
                            </h2>
                        </div>

                        <div className="mt-6 space-y-3">
                            {placeholderCommits.map((commit) => (
                                <div
                                    className="grid gap-2 text-sm font-medium text-(--hero-muted) sm:grid-cols-[minmax(0,1fr)_auto]"
                                    key={`${commit.project}-${commit.message}`}
                                >
                                    <p className="truncate">
                                        <span className="text-(--hero-text)">
                                            {commit.project}:
                                        </span>{" "}
                                        {commit.message}
                                    </p>
                                    <p>
                                        <span className="text-green-600">
                                            +{commit.additions}
                                        </span>{" "}
                                        /{" "}
                                        <span className="text-rose-600">
                                            -{commit.deletions}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                className="text-sm font-medium text-(--hero-accent) transition hover:text-(--hero-text)"
                                href="https://github.com/giahuyyle"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View on GitHub -&gt;
                            </a>
                            <div className="commit-bar" aria-hidden="true">
                                <span className="bg-cyan-500" />
                                <span className="bg-orange-600" />
                                <span className="bg-blue-600" />
                                <span className="bg-emerald-500" />
                                <span className="bg-purple-600" />
                            </div>
                        </div>
                    </article>

                    <article className="dashboard-card">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="dashboard-title">
                                <PostIcon />
                                Latest Posts
                            </h2>
                            <a
                                className="text-(--hero-accent) transition hover:text-(--hero-text)"
                                href="#posts"
                                aria-label="Open posts"
                            >
                                -&gt;
                            </a>
                        </div>

                        <div className="mt-6 space-y-4">
                            {placeholderPosts.map((post) => (
                                <a
                                    className="grid gap-2 text-sm font-medium text-(--hero-muted) transition hover:text-(--hero-accent) sm:grid-cols-[minmax(0,1fr)_auto]"
                                    href="#posts"
                                    key={post.title}
                                >
                                    <span className="truncate">
                                        {post.title}
                                    </span>
                                    <span>{post.date}</span>
                                </a>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

function ActivityIcon() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M3 12h4l2-7 4 14 2-7h6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M8 2v4m8-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 21s7-5.4 7-12A7 7 0 0 0 5 9c0 6.6 7 12 7 12Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function PaletteIcon() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 1.3-3l-.2-.2a1.8 1.8 0 0 1 1.3-3H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M7.5 10.5h.01M10 7.5h.01M14 7.5h.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            />
        </svg>
    );
}

function PostIcon() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M5 5h14v14H5zM8 9h8M8 12h8M8 15h5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

export default Dashboard;
