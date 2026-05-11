import { useEffect, useState } from "react";
import { socialLinks, type SocialIconName } from "../data/navigation";

const footerStats = {
    views: "1,303,174 views",
    build: "448b603",
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

function FooterIcon({ name }: { name: SocialIconName }) {
    if (name === "github") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M9 19.1C4 20.6 4 16.7 2 16.2m14 5.8v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.7 6.8-7.3A5.7 5.7 0 0 0 20.2 4c.2-.4.7-2-.2-4 0 0-1.3-.4-4.2 1.6a14.4 14.4 0 0 0-7.6 0C5.3-.4 4 0 4 0c-.9 2-.4 3.6-.2 4A5.7 5.7 0 0 0 2.2 8.2c0 5.6 3.5 6.9 6.8 7.3a3.4 3.4 0 0 0-1 2.6V22"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
        );
    }

    if (name === "linkedin") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a5 5 0 0 1 2-3Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    d="M2 9h4v12H2zM4 5.5v.01"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M4 6h16v12H4z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="m4 7 8 6 8-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M12 7v5l3 2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function BranchIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M7 3v11m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10-10a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 6v2a4 4 0 0 1-4 4H7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function Footer() {
    const [mountainTime, setMountainTime] = useState(formatMountainTime);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setMountainTime(formatMountainTime());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <footer className="px-6 pt-0 pb-8 font-mono">
            <div className="mx-auto w-full max-w-6xl">
                <div className="flex justify-end">
                    <div className="footer-webring px-5 py-2 text-sm font-medium text-(--hero-muted)">
                        Webrings:
                        <a
                            className="ml-2 text-(--hero-accent) transition hover:text-(--hero-text)"
                            href="#"
                        >
                            cpt
                        </a>
                        <span className="ml-2 text-(--hero-accent)/70">
                            &lt; &gt;
                        </span>
                    </div>
                </div>

                <div className="footer-bar flex flex-col gap-4 px-5 py-5 text-sm font-medium text-(--hero-muted) md:flex-row md:items-center md:justify-between md:px-7">
                    <div className="flex flex-wrap items-center gap-3">
                        <span>&copy; 2026 Huy Le</span>
                        <span className="text-(--hero-soft)">-</span>
                        <span className="inline-flex items-center gap-2">
                            <span
                                className="service-indicator"
                                aria-hidden="true"
                            />
                            All Services Nominal
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <span className="inline-flex items-center gap-2">
                            <ClockIcon />
                            <span className="text-(--hero-accent)">
                                MT {mountainTime}
                            </span>
                        </span>
                        <span className="text-(--hero-soft)">-</span>
                        <span>{footerStats.views}</span>
                        <span className="text-(--hero-soft)">-</span>
                        <span className="inline-flex items-center gap-2">
                            <BranchIcon />
                            {footerStats.build}
                        </span>
                        <span className="hidden text-(--hero-soft) sm:inline">
                            -
                        </span>
                        <span className="flex items-center gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    className="footer-social"
                                    href={link.href}
                                    key={link.label}
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
                                    aria-label={link.label}
                                >
                                    <FooterIcon name={link.icon} />
                                </a>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
