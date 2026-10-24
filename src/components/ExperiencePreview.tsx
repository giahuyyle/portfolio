import { experienceItems } from "../data/experience";

export function Education() {
    const education = experienceItems[0];
    return (
        <div className="education-line">
            <span className="small-label">Education</span>
            <img src={education.logoSrc} alt="" width="36" height="36" />
            <div className="od-field">
                <b>{education.company}</b>
                <span>B.Sc. Computing Science + Mathematics</span>
            </div>
        </div>
    );
}

export default function ExperiencePreview() {
    return (
        <div className="experience-list">
            {experienceItems.filter((item) => item.id !== "ualberta").map((item) => {
                const [role, dates] = item.detail.split(" | ");
                return (
                    <details className="experience-item" key={item.id}>
                        <summary>
                            <span className="company-logo">
                                <img src={item.logoSrc} alt="" />
                            </span>
                            <span className="od-field">
                                <b>{item.company}</b>
                                <span className="muted">{role}</span>
                            </span>
                            <span className="experience-date">{dates}</span>
                            <span className="experience-expand" aria-hidden="true">+</span>
                        </summary>
                        <div className="experience-copy">
                            <p>{item.preview.note}</p>
                            <p>
                                <a href={item.websiteUrl} target="_blank" rel="noreferrer">Visit {item.company} ↗</a>
                            </p>
                        </div>
                    </details>
                );
            })}
        </div>
    );
}
