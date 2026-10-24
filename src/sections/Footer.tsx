import { socialLinks } from "../data/navigation";

export default function Footer() {
    return (
        <footer className="site-footer wrap">
            <div className="footer-inner">
                <p>© {new Date().getFullYear()} Huy Le <span className="footer-divider">/</span>
                    <span className="footer-state">
                        <i aria-hidden="true" />Building &amp; learning</span>
                </p>
                <div className="footer-right">
                    <span>Edmonton, AB</span>{socialLinks.map(({ label, href }) =>
                        <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"}>{label}</a>)}</div>
            </div>
        </footer>
    );
}
