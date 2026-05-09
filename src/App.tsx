function App() {
    return (
        <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
            <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                        React + Vite + Tailwind
                    </p>
                    <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        Portfolio starter is ready.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                        Edit{" "}
                        <code className="rounded bg-zinc-800 px-2 py-1 text-cyan-200">
                            src/App.tsx
                        </code>{" "}
                        and start building your portfolio with Tailwind utility
                        classes.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                    <a
                        className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200"
                        href="https://vite.dev/guide/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Vite docs
                    </a>
                    <a
                        className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
                        href="https://tailwindcss.com/docs"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Tailwind docs
                    </a>
                </div>
            </section>
        </main>
    );
}

export default App;
