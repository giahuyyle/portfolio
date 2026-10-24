import { useRef } from "react";
import { navLinks, resumeHref } from "../data/navigation";
import ThemePicker, { AccentPicker, type ThemePickerProps } from "./ThemePicker";

type NavbarProps = ThemePickerProps & {
    accent: string;
    pathname: string;
    onAccentChange: (color: string) => void;
};

export default function Navbar({ pathname, accent, onAccentChange, ...themeProps }: NavbarProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const closeButton = useRef<HTMLButtonElement>(null);
    const directory = pathname.replace(/^\/+|\/+$/g, "");
    const links = navLinks.map((label) => {
        const href = label === "Resume" ? resumeHref : `/${label.toLowerCase()}`;
        return <a href={href} key={label} aria-current={pathname === href || (label === "Projects" && pathname.startsWith("/projects/")) ? "page" : undefined} target={label === "Resume" ? "_blank" : undefined} rel={label === "Resume" ? "noreferrer" : undefined} onClick={() => dialog.current?.close()}>{label}{label === "Resume" && <span aria-hidden="true"> ↗</span>}</a>;
    });
    return (
        <>
            <header className="site-header">
                <nav className="navbar" aria-label="Primary navigation">
                    <a className="directory" href="/" aria-label={`Home, current directory ~/${directory ? directory + "/" : ""}`}>
                        <span>~/{directory && `${directory}/`}</span>
                        <span className="cursor" aria-hidden="true" />
                    </a>
                    <div className="nav-links">{links}</div>
                    <button ref={trigger} className="more-button" type="button" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); closeButton.current?.focus(); }}>More <span aria-hidden="true">⊞</span>
                    </button>
                </nav>
            </header>
            <dialog ref={dialog} className="settings" aria-labelledby="settings-title" onClose={() => {
                if (document.activeElement === document.body || dialog.current?.contains(document.activeElement)) {
                    trigger.current?.focus({ preventScroll: true });
                }
            }} onClick={(event) => {
                if (event.target !== event.currentTarget) return;
                const rect = event.currentTarget.getBoundingClientRect();
                if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
            }}>
                <div className="settings-head">
                    <h2 id="settings-title">Make yourself at home.</h2>
                    <button ref={closeButton} className="icon-button" type="button" aria-label="Close settings" onClick={() => dialog.current?.close()}>×</button>
                </div>
                <p className="muted">Same portfolio. Your favorite flavor.</p>
                <h3>Theme</h3>
                <ThemePicker {...themeProps} />
                <h3>Accent</h3>
                <AccentPicker accent={accent} onAccentChange={onAccentChange} />
                <nav className="settings-mobile" aria-label="Mobile navigation">{links}</nav>
            </dialog>
        </>
    );
}
