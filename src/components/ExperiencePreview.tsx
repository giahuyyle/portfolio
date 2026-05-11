import type { ExperiencePreviewData } from "../data/experience";

type ExperiencePreviewProps = {
    company: string;
    detail: string;
    preview: ExperiencePreviewData;
};

function ExperiencePreview({
    company,
    detail,
    preview,
}: ExperiencePreviewProps) {
    return (
        <section
            className="experience-preview mt-10 overflow-hidden rounded-xl border border-white/60 bg-white/50 shadow-2xl shadow-slate-900/10 backdrop-blur-xl"
            aria-label={`${company} preview`}
        >
            <div className="flex items-center justify-between border-b border-slate-900/10 bg-white/55 px-4 py-3 text-xs font-medium text-(--hero-soft)">
                <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#ff5f57]" />
                    <span className="size-3 rounded-full bg-[#ffbd2e]" />
                    <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <span>{preview.title}</span>
                <span>{company}</span>
            </div>

            <div className="grid min-h-[360px] grid-cols-1 bg-[#f8fafc]/70 lg:grid-cols-[190px_minmax(0,1fr)_270px]">
                <aside className="border-b border-slate-900/10 bg-white/45 p-4 text-xs font-medium text-(--hero-muted) lg:border-b-0 lg:border-r">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.18em] text-(--hero-soft)">
                        Portfolio-new
                    </p>
                    <div className="space-y-3">
                        {preview.fileTree.map((file) => (
                            <div
                                className={`rounded px-2 py-1 ${
                                    file === preview.activeFile
                                        ? "bg-(--hero-accent) text-white"
                                        : "text-(--hero-muted)"
                                }`}
                                key={file}
                            >
                                {file}
                            </div>
                        ))}
                    </div>
                </aside>

                <div className="bg-white/35">
                    <div className="flex items-center gap-2 border-b border-slate-900/10 bg-white/50 px-4 py-2 text-xs font-medium text-(--hero-muted)">
                        <span className="rounded bg-(--hero-accent) px-2 py-1 text-white">
                            TSX
                        </span>
                        <span>{preview.activeFile}</span>
                    </div>

                    <div className="space-y-2 p-5 text-sm leading-7 text-(--hero-muted)">
                        {preview.codeLines.map((line, index) => (
                            <pre
                                className="overflow-hidden whitespace-pre-wrap rounded bg-white/45 px-3 py-1"
                                key={`${line}-${index}`}
                            >
                                <span className="mr-4 text-(--hero-soft)">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                {line}
                            </pre>
                        ))}
                    </div>
                </div>

                <aside className="border-t border-slate-900/10 bg-white/45 p-4 lg:border-l lg:border-t-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--hero-soft)">
                        Context
                    </p>
                    <h3 className="mt-4 text-xl font-bold text-(--hero-text)">
                        {company}
                    </h3>
                    <p className="mt-1 text-sm font-medium leading-6 text-(--hero-accent)">
                        {detail}
                    </p>
                    <p className="mt-5 text-sm font-medium leading-7 text-(--hero-muted)">
                        {preview.note}
                    </p>

                    <div className="mt-6 space-y-3">
                        {preview.metrics.map((metric) => (
                            <div
                                className="rounded-lg border border-slate-900/10 bg-white/55 px-3 py-2 text-xs font-medium text-(--hero-text)"
                                key={metric}
                            >
                                {metric}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default ExperiencePreview;
