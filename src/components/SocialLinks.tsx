import { socialLinks } from "../data/navigation";

export default function SocialLinks() {
    return (
        <nav className="socials od-cluster" aria-label="Social links">
            {socialLinks.map(({ label, href }) => (
                <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"}>{label}<span aria-hidden="true">{label === "Email" ? " @" : " ↗"}</span>
                </a>
            ))}
        </nav>
    );
}
