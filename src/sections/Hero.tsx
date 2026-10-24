import ExperiencePreview, { Education } from "../components/ExperiencePreview";
import SocialLinks from "../components/SocialLinks";
import { resumeHref } from "../data/navigation";

export default function Hero() {
    return (
        <section className="wrap hero">
            <p className="small-label">
                <span className="peach-dot" /> Full-stack development / Applied AI</p>
            <h1 tabIndex={-1}>Hey! I&apos;m <span className="accent">Huy Le</span>
                <span className="hero-period">.</span>
            </h1>
            <p className="hero-copy">I&apos;m a computing science and mathematics student at <a className="inline-link" href="https://www.ualberta.ca/" target="_blank" rel="noreferrer">UAlberta</a>, based in Edmonton, AB. I build full-stack applications with React, JS/TS, and Python, and enjoy working on applied AI and the systems behind it.</p>
            <div className="hero-actions">
                <SocialLinks />
                <a className="pill-button" href={resumeHref} target="_blank" rel="noreferrer">View my resume <span aria-hidden="true">↗</span>
                </a>
            </div>
            <Education />
            <div className="work-heading">
                <p className="small-label">Experience</p>
                <span className="small-note">A few places I&apos;ve built things</span>
            </div>
            <ExperiencePreview />
        </section>
    );
}
