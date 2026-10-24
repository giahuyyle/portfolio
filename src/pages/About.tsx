import ExperiencePreview from "../components/ExperiencePreview";
import SocialLinks from "../components/SocialLinks";
import { educationItems } from "../data/education";
import { resumeHref } from "../data/navigation";

export default function About() {
    return (
        <section className="wrap page-section">
            <a className="back-link" href="/">← Home</a>
            <p className="section-path">~/about/</p>
            <h1 tabIndex={-1}>About <span className="accent">Me</span>
            </h1>
            <div className="about-grid">
                <figure className="portrait">
                    <img src="/image/about-me.jpeg" alt="Huy Le" width="1024" height="768" />
                    <figcaption>Huy Le / Edmonton, Alberta</figcaption>
                </figure>
                <div className="about-copy od-stack">
                    <h2>A little more than<br />what&apos;s on my resume.</h2>
                    <p>Hey! I&apos;m Huy Le, a computer science student with a minor in mathematics based in Edmonton, Alberta. I enjoy building polished interfaces, practical tools, and systems that feel fast, readable, and calm to use.</p>
                    <p>Most of my work sits around full-stack web development, applied AI/ML, and product-minded engineering. I like turning rough ideas into clean, useful software.</p>
                    <p>Outside of school and coding, I like football, I follow Chelsea FC, and I enjoy spending time in the gym.</p>
                    <SocialLinks />
                </div>
            </div>
            <div className="about-bottom">
                <div>
                    <p className="section-path">01 / Education</p>
                    <div className="education-history">
                        {educationItems.map((education) => (
                            <div key={education.id}>
                                <h2>{education.institution}</h2>
                                {education.program && <p>{education.program}</p>}
                                <p className="small muted">{education.dates}</p>
                                {education.expectedGraduation && (
                                    <p className="small muted">Expected graduation: {education.expectedGraduation}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="section-path">02 / Outside the editor</p>
                    <div className="interest-list">{["Football", "Chelsea FC", "The gym", "Building useful things"].map((interest) =>
                        <span className="tag" key={interest}>{interest}</span>)}</div>
                    <a className="text-link" href="mailto:huyyyylegia@gmail.com">Let&apos;s connect →</a>
                </div>
            </div>
            <section className="about-experience">
                <div className="section-heading">
                    <div>
                        <p className="section-path">~/experience/</p>
                        <h2>Where I&apos;ve been</h2>
                    </div>
                    <a className="text-link" href={resumeHref} target="_blank" rel="noreferrer">Full resume ↗</a>
                </div>
                <ExperiencePreview />
            </section>
        </section>
    );
}
