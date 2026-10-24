import { experienceItems } from "../data/experience";

export default function ExperiencePreview() {
    return (
        <div className="experience-list">
            {experienceItems.map((item) => (
                <details className="experience-item" key={item.id}>
                    <summary>
                        <span className="company-logo" aria-hidden="true">
                            {item.logoSrc ? (
                                <img src={item.logoSrc} alt="" />
                            ) : (
                                <span className="company-initials">{item.logoLabel}</span>
                            )}
                        </span>
                        <span className="od-field">
                            <b>{item.company}</b>
                            <span className="muted">{item.role}</span>
                            <span className="muted">{item.location}</span>
                        </span>
                        <span className="experience-date">{item.dates}</span>
                        <span className="experience-expand" aria-hidden="true">+</span>
                    </summary>
                    <div className="experience-copy">
                        {item.achievements.map((achievement) => (
                            <p key={achievement}>{achievement}</p>
                        ))}
                        {item.websiteUrl && (
                            <p>
                                <a href={item.websiteUrl} target="_blank" rel="noreferrer">Visit {item.company} ↗</a>
                            </p>
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
}
