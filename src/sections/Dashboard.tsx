import ThemePicker, { type ThemePickerProps } from "../components/ThemePicker";
import { socialLinks } from "../data/navigation";

export default function Dashboard(props: ThemePickerProps) {
    return (
        <section className="wrap dashboard" aria-label="Make yourself at home">
            <article className="dashboard-card">
                <div className="dashboard-heading">
                    <h2>Theme</h2>
                    <span className="accent" aria-hidden="true">◐</span>
                </div>
                <p className="muted">Pick your favorite flavor.</p>
                <ThemePicker {...props} />
                <div className="theme-foot">
                    <span className="peach-dot" />Catppuccin, always.</div>
            </article>
            <article className="dashboard-card">
                <div className="dashboard-heading">
                    <h2>Let&apos;s Connect</h2>
                    <span className="accent" aria-hidden="true">↗</span>
                </div>
                <p className="muted">Open to interesting projects, collaborations, and conversations.</p>
                <a className="pill-button" href={socialLinks[2].href}>Say hello <span aria-hidden="true">→</span>
                </a>
            </article>
            <article className="dashboard-card">
                <div className="dashboard-heading">
                    <h2>Based In</h2>
                    <span className="accent" aria-hidden="true">⌖</span>
                </div>
                <div className="location-row od-field">
                    <b>Edmonton, AB</b>
                    <span className="small muted">Canada / Mountain Time</span>
                </div>
                <div className="mini-map">
                    <img src="/image/edmonton-map.png" alt="" />
                    <span className="map-marker">Edmonton</span>
                </div>
            </article>
        </section>
    );
}
