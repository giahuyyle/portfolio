import { universityEducation } from "../data/education";

export default function Education() {
    return (
        <div className="education-line">
            <span className="small-label">Education</span>
            <img src={universityEducation.logoSrc} alt="" width="36" height="36" />
            <div className="od-field">
                <b>{universityEducation.institution}</b>
                <span>{universityEducation.program}</span>
            </div>
        </div>
    );
}
