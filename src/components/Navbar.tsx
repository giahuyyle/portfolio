import { useEffect, useRef, useState } from "react";

type NavbarProps = {
    accent: string;
    activeTheme: string;
    gridEnabled: boolean;
    moreLinks: string[];
    navLinks: string[];
    swatches: string[];
    themeNames: string[];
    onAccentChange: (accent: string) => void;
    onGridChange: (enabled: boolean) => void;
    onThemeChange: (theme: string) => void;
};

function getPathForLink(link: string) {
    return `/${link.toLowerCase().replaceAll(" ", "-")}`;
}

function getCurrentDirectory() {
    const pathDirectory = window.location.pathname.replace(/^\/|\/$/g, "");

    return pathDirectory ? `~/${pathDirectory}/` : "~/";
}

function Navbar({
    accent,
    activeTheme,
    gridEnabled,
    moreLinks,
    navLinks,
    swatches,
    themeNames,
    onAccentChange,
    onGridChange,
    onThemeChange,
}: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentDirectory, setCurrentDirectory] =
        useState(getCurrentDirectory);
    const menuOpenerRef = useRef<HTMLElement | null>(null);

    const openMenu = () => {
        menuOpenerRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const updateDirectory = () => setCurrentDirectory(getCurrentDirectory());

        window.addEventListener("popstate", updateDirectory);

        return () => {
            window.removeEventListener("popstate", updateDirectory);
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            menuOpenerRef.current?.focus();
        }
    }, [menuOpen]);

    return (
        <>
            <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-5 pt-4 font-mono">
                <nav
                    className="liquid-navbar pointer-events-auto mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 text-[15px] font-medium tracking-wider text-(--hero-text)"
                    aria-label="Primary navigation"
                >
                    <a
                        className="flex items-center gap-2 transition hover:text-(--hero-accent)"
                        href="/"
                        aria-label={`Current directory: ${currentDirectory}`}
                    >
                        <span>{currentDirectory}</span>
                        <span className="terminal-cursor h-5 w-2.5 bg-(--hero-accent)" />
                    </a>

                    <div className="hidden items-center gap-12 md:flex">
                        {navLinks.map((link) => (
                            <a
                                className="transition hover:text-(--hero-accent)"
                                href={getPathForLink(link)}
                                key={link}
                            >
                                {link}
                            </a>
                        ))}
                        <button
                            className="cursor-pointer transition hover:text-(--hero-accent)"
                            onClick={openMenu}
                            type="button"
                        >
                            More...
                        </button>
                    </div>

                    <button
                        className="cursor-pointer text-sm font-medium tracking-wider md:hidden"
                        onClick={openMenu}
                        type="button"
                    >
                        More...
                    </button>
                </nav>
            </header>

            <aside
                className={`liquid-drawer fixed right-0 top-0 z-50 h-screen w-[min(292px,calc(100vw-28px))] overflow-y-auto border-l border-[rgba(23,35,63,0.12)] bg-(--hero-panel) font-mono transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-hidden={!menuOpen}
                inert={!menuOpen}
            >
                <div className="flex items-center justify-between border-b border-[rgba(23,35,63,0.12)] px-5 py-5">
                    <h2 className="text-xl font-bold text-(--hero-accent)">
                        Navigation
                    </h2>
                    <button
                        className="cursor-pointer text-3xl leading-none text-(--hero-muted) transition hover:text-(--hero-accent)"
                        onClick={closeMenu}
                        type="button"
                        aria-label="Close navigation"
                    >
                        x
                    </button>
                </div>

                <div className="border-b border-[rgba(23,35,63,0.12)] px-5 py-5">
                    <p className="mb-4 text-sm font-semibold text-(--hero-muted)">
                        Theme
                    </p>

                    <div className="grid grid-cols-3 rounded-md border border-[rgba(23,35,63,0.12)] p-1 text-xs font-medium text-(--hero-muted)">
                        {themeNames.map((name) => (
                            <button
                                className={`rounded px-2 py-2 transition ${
                                    activeTheme === name
                                        ? "bg-white/70 text-(--hero-text) shadow-sm"
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

                    <div className="mt-4 grid grid-cols-7 gap-2">
                        {swatches.map((color) => (
                            <button
                                className="size-7 rounded-md border-2 transition"
                                key={color}
                                onClick={() => onAccentChange(color)}
                                style={{
                                    backgroundColor: color,
                                    borderColor:
                                        accent === color ? "#ffffff" : color,
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

                    <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-medium text-(--hero-muted)">
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
                </div>

                <div className="px-6 py-5">
                    <div className="space-y-7 text-base font-medium tracking-[0.04em] text-(--hero-text)">
                        {navLinks.map((link) => (
                            <a
                                className="block transition hover:text-(--hero-accent)"
                                href={getPathForLink(link)}
                                key={link}
                                onClick={closeMenu}
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 border-t border-[rgba(23,35,63,0.14)] pt-4">
                        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-(--hero-soft)">
                            More
                        </p>
                        <div className="space-y-7 text-base font-medium tracking-[0.04em] text-(--hero-text)">
                            {moreLinks.map((link) => (
                                <a
                                    className="block transition hover:text-(--hero-accent)"
                                    href={getPathForLink(link)}
                                    key={link}
                                    onClick={closeMenu}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {menuOpen && (
                <button
                    className="fixed inset-0 z-40 cursor-default bg-slate-950/10 backdrop-blur-[2px]"
                    onClick={closeMenu}
                    type="button"
                    aria-label="Close navigation overlay"
                />
            )}
        </>
    );
}

export default Navbar;
