import { socialLinks, type SocialIconName } from "../data/navigation";

function AboutIcon({ icon }: { icon: SocialIconName }) {
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

function About() {
    return (
        <section className="px-6 pt-32 pb-20 font-mono">
            <div className="mx-auto w-full max-w-6xl">
                <h1 className="text-5xl font-semibold tracking-tight text-(--hero-text) sm:text-6xl">
                    About Me
                </h1>

                <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(280px,0.85fr)_1.7fr] lg:items-start">
                    <figure className="overflow-hidden rounded-lg border border-slate-900/10 bg-white/35 shadow-2xl shadow-slate-900/10">
                        <img
                            className="aspect-[4/4.45] w-full object-cover"
                            src="/image/about-me.jpeg"
                            alt="Huy Le"
                        />
                    </figure>

                    <div className="space-y-5 text-base font-medium leading-8 text-(--hero-muted) lg:max-h-[calc((min((100vw-3rem),72rem)-2.5rem)*0.85/2.55*4.45/4)] lg:overflow-hidden xl:text-lg xl:leading-9">
                        <p>
                            Hey! I&apos;m Huy Le, a computing science and
                            mathematics student based in Edmonton, Alberta. I
                            enjoy building polished interfaces, practical tools,
                            and systems that feel fast, readable, and calm to
                            use.
                        </p>

                        <p>
                            Most of my work sits around full-stack web
                            development, applied AI/ML, and product-minded
                            engineering. I like turning rough ideas into clean,
                            useful software.
                        </p>

                        <p>
                            Outside of school and coding, I like football, I
                            follow Chelsea FC, and I enjoy spending time in the
                            gym.
                        </p>

                        <nav
                            className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-2 text-base text-(--hero-text)"
                            aria-label="About page social links"
                        >
                            {socialLinks.map((link, index) => (
                                <span
                                    className="flex items-center gap-x-4"
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
                                        <AboutIcon icon={link.icon} />
                                        {link.label}
                                    </a>
                                    {index < socialLinks.length - 1 && (
                                        <span className="text-(--hero-soft)">
                                            *
                                        </span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    </div>
                </div>

                <section className="mt-16 rounded-xl border border-slate-900/10 bg-white/25 p-6 text-(--hero-muted) shadow-xl shadow-slate-900/5 backdrop-blur-xl">
                    <h2 className="text-2xl font-semibold text-(--hero-text)">
                        More Soon
                    </h2>
                    <p className="mt-4 max-w-3xl text-base font-medium leading-8">
                        Placeholder space for a longer intro, favorite tools,
                        photos, books, notes, or anything else that should make
                        this page feel more personal later.
                    </p>
                </section>
            </div>
        </section>
    );
}

export default About;
