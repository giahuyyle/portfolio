export default function Blogs() {
    return (
        <section className="wrap page-section">
            <a className="back-link" href="/">&larr; Home</a>
            <div className="page-heading">
                <div>
                    <p className="section-path">~/blogs/</p>
                    <h1 tabIndex={-1}>Notes &amp; <span className="accent">thoughts</span></h1>
                    <p className="muted page-lead">A space for things I build, things I learn, and ideas along the way.</p>
                </div>
                <span className="count-badge">0 posts</span>
            </div>
            <div className="blog-empty">
                <span className="small-label">A blank page</span>
                <h2>No posts yet.</h2>
                <p className="muted">Check back for notes on code, projects, and what I learn along the way.</p>
                <a className="text-link" href="/projects">Explore my projects &rarr;</a>
            </div>
        </section>
    );
}
