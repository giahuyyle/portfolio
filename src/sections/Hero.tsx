import { useState } from "react";
import ExperiencePreview from "../components/ExperiencePreview";
import { experienceItems, type ExperienceItem } from "../data/experience";
import { socialLinks, type SocialIconName } from "../data/navigation";

function SocialIcon({ icon }: { icon: SocialIconName }) {
    if (icon === "github") {
        return (
            <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.99c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.33.68.96.68 1.94v2.76c0 .27.18.58.69.48A10.18 10.18 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
        );
    }

    if (icon === "linkedin") {
        return (
            <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.33V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.31 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.53V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
            </svg>
        );
    }

    return (
        <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-10 6L2 7" />
        </svg>
    );
}

function Hero() {
    const [activeExperienceId, setActiveExperienceId] = useState<
        string | null
    >(null);

    const activeExperience = experienceItems.find(
        (item) => item.id === activeExperienceId,
    );
    const educationItems = experienceItems.filter(
        (item) => item.id === "ualberta",
    );
    const workItems = experienceItems.filter((item) => item.id !== "ualberta");

    const renderExperienceButton = (
        item: ExperienceItem,
        showDivider = false,
    ) => (
        <button
            className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full py-1 pr-1 text-left font-medium transition ${
                activeExperienceId === item.id
                    ? "text-(--hero-accent)"
                    : "hover:text-(--hero-accent)"
            }`}
            key={item.company}
            onClick={() =>
                setActiveExperienceId((current) =>
                    current === item.id ? null : item.id,
                )
            }
            type="button"
            aria-expanded={activeExperienceId === item.id}
        >
            {showDivider && (
                <span className="hidden text-(--hero-accent) sm:inline">
                    /
                </span>
            )}
            <span className="grid size-8 place-items-center rounded-full bg-(--hero-text) text-[10px] font-semibold text-white">
                {item.logoLabel}
            </span>
            <span className="whitespace-nowrap text-(--hero-text)">
                {item.company}
            </span>
        </button>
    );

    return (
        <section className="flex px-6 pt-28 pb-14 font-mono" id="about">
            <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl font-bold leading-none tracking-tight text-(--hero-text) sm:text-5xl">
                                Hey! I&apos;m{" "}
                                <span className="text-(--hero-accent)">
                                    Huy Le
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base font-medium leading-8 tracking-tight text-(--hero-muted) sm:text-lg">
                                I&apos;m a full-stack developer building
                                polished web experiences with{" "}
                                <a
                                    className="hero-link"
                                    href="https://react.dev/"
                                >
                                    React
                                </a>
                                ,{" "}
                                <a
                                    className="hero-link"
                                    href="https://vite.dev/"
                                >
                                    Vite
                                </a>
                                ,{" "}
                                <a
                                    className="hero-link"
                                    href="https://tailwindcss.com/"
                                >
                                    Tailwind CSS
                                </a>{" "}
                                and modern TypeScript. I care about fast
                                interfaces, clean systems, and details that make
                                software feel sharp.
                            </p>
                        </div>

                        <nav
                            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-(--hero-text)"
                            aria-label="Social links"
                        >
                            {socialLinks.map((link, index) => (
                                <span
                                    className="flex items-center gap-x-5"
                                    key={link.label}
                                >
                                    <a
                                        className="flex items-center gap-2 transition hover:text-(--hero-accent)"
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <SocialIcon icon={link.icon} />
                                        {link.label}
                                    </a>
                                    {index < socialLinks.length - 1 && (
                                        <span className="text-(--hero-soft)">
                                            |
                                        </span>
                                    )}
                                </span>
                            ))}

                            <span className="text-(--hero-soft)">|</span>
                            <a
                                className="transition hover:text-(--hero-accent)"
                                href="/about"
                            >
                                More about me -&gt;
                            </a>
                        </nav>
                    </div>

                    <figure className="justify-self-center lg:justify-self-end">
                        <div className="overflow-hidden rounded-xl border border-white/70 bg-white/40 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                            <img
                                className="aspect-[4/5] w-60 rounded-lg object-cover sm:w-64 lg:w-72"
                                src="/image/hero.jpeg"
                                alt="Huy Le"
                            />
                        </div>
                    </figure>
                </div>

                <div className="mt-12 space-y-4 text-sm font-medium text-(--hero-text)">
                    <div className="grid gap-y-3 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--hero-soft)">
                            Education
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            {educationItems.map((item) =>
                                renderExperienceButton(item),
                            )}
                        </div>
                    </div>

                    <div className="grid gap-y-3 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--hero-soft)">
                            Work
                        </p>
                        <div className="flex flex-nowrap items-center gap-x-6 overflow-x-auto pb-2">
                            {workItems.map((item, index) =>
                                renderExperienceButton(item, index > 0),
                            )}
                        </div>
                    </div>
                </div>

                {activeExperience && (
                    <ExperiencePreview
                        company={activeExperience.company}
                        detail={activeExperience.detail}
                        preview={activeExperience.preview}
                    />
                )}
            </div>
        </section>
    );
}

export default Hero;
