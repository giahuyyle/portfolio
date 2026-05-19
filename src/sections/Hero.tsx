import { useEffect, useState } from "react";
import ExperiencePreview from "../components/ExperiencePreview";
import { experienceItems, type ExperienceItem } from "../data/experience";
import {
    resumeHref,
    socialLinks,
    type SocialIconName,
} from "../data/navigation";

type TechLogoName =
    | "aws"
    | "firebase"
    | "google-cloud"
    | "java"
    | "javascript"
    | "python"
    | "react"
    | "typescript";

const heroTechBubbles: {
    className: string;
    label: string;
    logo: TechLogoName;
}[] = [
    {
        className:
            "left-8 top-0 size-20 rotate-[-8deg] text-[#61dafb] sm:size-24",
        label: "React",
        logo: "react",
    },
    {
        className:
            "right-1 top-[6.25rem] size-[4.75rem] rotate-[7deg] text-[#3178c6] sm:size-20",
        label: "TypeScript",
        logo: "typescript",
    },
    {
        className:
            "left-0 top-32 size-[4.5rem] rotate-[9deg] text-[#3776ab] sm:size-20",
        label: "Python",
        logo: "python",
    },
    {
        className:
            "left-[68%] top-6 size-[4.25rem] -translate-x-1/2 rotate-[-6deg] text-[#f7df1e] sm:size-[4.75rem]",
        label: "JavaScript",
        logo: "javascript",
    },
    {
        className:
            "left-16 bottom-12 size-[4.5rem] rotate-[-5deg] text-[#e76f00] sm:size-20",
        label: "Java",
        logo: "java",
    },
    {
        className:
            "right-0 bottom-16 size-[4.5rem] rotate-[10deg] text-[#ffca28] sm:size-20",
        label: "Firebase",
        logo: "firebase",
    },
    {
        className:
            "left-[45%] bottom-0 size-[4.75rem] rotate-[4deg] text-[#4285f4] sm:size-[5.25rem]",
        label: "Google Cloud",
        logo: "google-cloud",
    },
    {
        className:
            "left-[39%] top-[8.5rem] size-[4.5rem] rotate-[-10deg] text-[#ff9900] sm:size-20",
        label: "AWS",
        logo: "aws",
    },
];

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

function TechLogo({ logo }: { logo: TechLogoName }) {
    if (logo === "react") {
        return (
            <svg
                className="size-7"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                aria-hidden="true"
            >
                <ellipse cx="24" cy="24" rx="20" ry="7.5" />
                <ellipse
                    cx="24"
                    cy="24"
                    rx="20"
                    ry="7.5"
                    transform="rotate(60 24 24)"
                />
                <ellipse
                    cx="24"
                    cy="24"
                    rx="20"
                    ry="7.5"
                    transform="rotate(120 24 24)"
                />
                <circle cx="24" cy="24" r="3.6" fill="currentColor" />
            </svg>
        );
    }

    if (logo === "python") {
        return (
            <svg
                className="size-8"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M31.5 6c-10.2 0-9.6 4.4-9.6 4.4v4.6h9.8v1.4H18c-4.7 0-8.8 2.8-10.1 8.2-1.5 6.2-1.6 10.1 0 16.6 1.2 4.8 4 8.2 8.7 8.2h5.6v-7.9c0-5.3 4.6-10 10.1-10h9.6c4.5 0 8.1-3.7 8.1-8.2V10.4S51.2 6 31.5 6Z"
                    fill="#3776ab"
                />
                <path
                    d="M32.5 58c10.2 0 9.6-4.4 9.6-4.4V49h-9.8v-1.4H46c4.7 0 8.8-2.8 10.1-8.2 1.5-6.2 1.6-10.1 0-16.6-1.2-4.8-4-8.2-8.7-8.2h-5.6v7.9c0 5.3-4.6 10-10.1 10h-9.6c-4.5 0-8.1 3.7-8.1 8.2v12.9S12.8 58 32.5 58Z"
                    fill="#ffd43b"
                />
                <circle cx="27.4" cy="12.3" r="2.3" fill="white" />
                <circle cx="36.6" cy="51.7" r="2.3" fill="#17233f" />
            </svg>
        );
    }

    if (logo === "javascript") {
        return (
            <span className="grid size-7 place-items-center rounded-sm bg-[#f7df1e] text-sm font-bold text-[#17233f]">
                JS
            </span>
        );
    }

    if (logo === "typescript") {
        return (
            <span className="grid size-7 place-items-center rounded-sm bg-[#3178c6] text-sm font-bold text-white">
                TS
            </span>
        );
    }

    if (logo === "java") {
        return (
            <svg
                className="size-7"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path
                    d="M18 10c3 2.4-3 4.5 0 7"
                    stroke="#f89820"
                    strokeWidth="3"
                />
                <path
                    d="M25 8c4 3-4 5 0 8"
                    stroke="#f89820"
                    strokeWidth="3"
                />
                <path
                    d="M15 22h18v8a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-8Z"
                    fill="#5382a1"
                    stroke="#17233f"
                    strokeWidth="2"
                />
                <path
                    d="M33 25h3.5a3.5 3.5 0 0 1 0 7H33"
                    stroke="#17233f"
                    strokeWidth="2.4"
                />
                <path d="M12 39h24" stroke="#17233f" strokeWidth="2.4" />
            </svg>
        );
    }

    if (logo === "firebase") {
        return (
            <svg
                className="size-8"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
            >
                <path d="M8 38 14 6l8 15 5-10 13 27H8Z" fill="#ffa000" />
                <path d="m22 21-14 17 19-27 3 16-8-6Z" fill="#ffca28" />
                <path d="m30 27-8-6 18 17-10-11Z" fill="#f57c00" />
            </svg>
        );
    }

    if (logo === "google-cloud") {
        return (
            <svg
                className="size-8"
                viewBox="0 0 64 48"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path
                    d="M21 38h28a10 10 0 0 0 1-20 17 17 0 0 0-31-5"
                    stroke="#4285f4"
                    strokeWidth="7"
                />
                <path
                    d="M18 13A17 17 0 0 0 9 30"
                    stroke="#34a853"
                    strokeWidth="7"
                />
                <path
                    d="M21 38H11a8 8 0 0 1-2-15"
                    stroke="#fbbc05"
                    strokeWidth="7"
                />
                <path
                    d="M50 18a17 17 0 0 0-31-5"
                    stroke="#ea4335"
                    strokeWidth="7"
                />
            </svg>
        );
    }

    return (
        <svg
            className="size-8"
            viewBox="0 0 64 48"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M18 34c7 5 23 5 31-1"
                stroke="#ff9900"
                strokeLinecap="round"
                strokeWidth="4"
            />
            <path
                d="M47 31 52 32.5 48.5 36"
                stroke="#ff9900"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            />
            <text
                x="8"
                y="24"
                fill="#17233f"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="18"
                fontWeight="800"
                letterSpacing="-1"
            >
                AWS
            </text>
        </svg>
    );
}

function Hero() {
    const [activeExperienceId, setActiveExperienceId] = useState<
        string | null
    >(null);
    const [previewExperienceId, setPreviewExperienceId] = useState<
        string | null
    >(null);
    const [isPreviewClosing, setIsPreviewClosing] = useState(false);

    const previewExperience = experienceItems.find(
        (item) => item.id === previewExperienceId,
    );
    const educationItems = experienceItems.filter(
        (item) => item.id === "ualberta",
    );
    const workItems = experienceItems.filter((item) => item.id !== "ualberta");

    useEffect(() => {
        if (!isPreviewClosing) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setPreviewExperienceId(null);
            setIsPreviewClosing(false);
        }, 220);

        return () => window.clearTimeout(timeout);
    }, [isPreviewClosing]);

    const closeExperiencePreview = () => {
        if (!previewExperienceId) {
            return;
        }

        setActiveExperienceId(null);
        setIsPreviewClosing(true);
    };

    const handleExperienceClick = (itemId: string) => {
        if (activeExperienceId === itemId) {
            closeExperiencePreview();
            return;
        }

        setPreviewExperienceId(itemId);
        setActiveExperienceId(itemId);
        setIsPreviewClosing(false);
    };

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
            onClick={() => handleExperienceClick(item.id)}
            type="button"
            aria-expanded={activeExperienceId === item.id}
        >
            {showDivider && (
                <span className="hidden text-(--hero-accent) sm:inline">
                    /
                </span>
            )}
            <span
                className={`grid place-items-center overflow-hidden text-[10px] font-semibold ${
                    item.logoSrc
                        ? "h-11 w-16 rounded-md"
                        : "size-8 rounded-full bg-(--hero-text) text-white"
                }`}
            >
                {item.logoSrc ? (
                    <img
                        className="max-h-10 max-w-15 object-contain drop-shadow-sm"
                        src={item.logoSrc}
                        alt={`${item.company} logo`}
                    />
                ) : (
                    item.logoLabel
                )}
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
                                I&apos;m currently a student at{" "}
                                <a
                                    className="hero-link"
                                    href="https://www.ualberta.ca/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    UofA
                                </a>
                                . I&apos;m most comfortable building full-stack
                                applications with{" "}
                                <a
                                    className="hero-link"
                                    href="https://react.dev/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    React
                                </a>
                                ,{" "}
                                <span className="text-(--hero-text)">
                                    JS/TS
                                </span>
                                , and{" "}
                                <a
                                    className="hero-link"
                                    href="https://www.python.org/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Python
                                </a>
                                , especially Django, FastAPI, and Flask. I&apos;ve
                                also built web, app, and mobile projects with
                                Java. Right now, I&apos;m working on
                                AI-integrated software that applies AI/ML to
                                automate daily tasks that would otherwise take
                                too much time.
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
                                        target={
                                            link.href.startsWith("mailto:")
                                                ? undefined
                                                : "_blank"
                                        }
                                        rel={
                                            link.href.startsWith("mailto:")
                                                ? undefined
                                                : "noreferrer"
                                        }
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
                            <a
                                className="rounded-full border border-(--hero-accent)/35 bg-(--hero-accent)/10 px-4 py-2 font-semibold text-(--hero-accent) transition hover:border-(--hero-accent) hover:bg-(--hero-accent) hover:text-white"
                                href={resumeHref}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View my resume -&gt;
                            </a>
                        </nav>
                    </div>

                    <figure
                        className="justify-self-center lg:justify-self-end"
                        aria-label="Technology stack"
                    >
                        <div className="tech-cloud relative h-90 w-[min(25rem,calc(100vw-3rem))]">
                            {heroTechBubbles.map((tech) => (
                                <span
                                    className={`tech-bubble absolute flex items-center justify-center rounded-2xl border border-white/55 bg-white/45 shadow-xl shadow-slate-900/10 backdrop-blur-xl ${tech.className}`}
                                    key={tech.label}
                                    aria-label={tech.label}
                                    title={tech.label}
                                >
                                    <TechLogo logo={tech.logo} />
                                    <span className="sr-only">
                                        {tech.label}
                                    </span>
                                </span>
                            ))}
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

                {previewExperience && (
                    <ExperiencePreview
                        company={previewExperience.company}
                        detail={previewExperience.detail}
                        isClosing={isPreviewClosing}
                        onClose={closeExperiencePreview}
                        preview={previewExperience.preview}
                        websiteUrl={previewExperience.websiteUrl}
                    />
                )}
            </div>
        </section>
    );
}

export default Hero;
