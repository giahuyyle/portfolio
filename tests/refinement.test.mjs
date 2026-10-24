import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Use the existing TypeScript compiler; no additional test runtime is needed.
async function loadModule(path) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    });
    return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const theme = await loadModule("../src/data/theme.ts");
const routing = await loadModule("../src/utils/routing.ts");

test("all normal-text tokens meet WCAG AA on every theme surface and accent", () => {
    for (const name of Object.keys(theme.themes)) {
        for (const accent of theme.swatches) {
            const style = theme.getThemeStyle(name, accent);
            for (const token of ["text", "muted", "soft", "accent-text"]) {
                for (const surface of ["bg", "panel", "surface"]) {
                    const ratio = theme.contrastRatio(style[`--hero-${token}`], style[`--hero-${surface}`]);
                    assert.ok(ratio >= 4.5, `${name}/${accent}/${token} on ${surface}: ${ratio}`);
                }
            }
        }
    }
});

test("route parsing handles malformed encodings and rejects external URLs", () => {
    const originalWindow = globalThis.window;
    globalThis.window = { location: { origin: "https://portfolio.example" } };
    try {
        assert.equal(routing.normalizeRoute("/projects/fpl/"), "/projects/fpl");
        assert.equal(routing.normalizeRoute("https://other.example/projects/fpl"), null);
        assert.equal(routing.normalizeRoute("http://["), null);
        assert.equal(routing.decodeProjectRepo("%E0%A4%A"), undefined);
        assert.equal(routing.decodeProjectRepo("job%2Dpulse"), "job-pulse");
        assert.equal(routing.getProjectPath("name with spaces"), "/projects/name%20with%20spaces");
    } finally {
        globalThis.window = originalWindow;
    }
});

test("modified and non-primary activations stay native", () => {
    const primary = { button: 0, defaultPrevented: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false };
    for (const key of ["metaKey", "ctrlKey", "shiftKey", "altKey", "defaultPrevented"]) {
        assert.equal(routing.internalAnchor({ ...primary, [key]: true }), null);
    }
    assert.equal(routing.internalAnchor({ ...primary, button: 1 }), null);
    assert.equal(routing.internalAnchor({ ...primary, button: 2 }), null);
});

test("unavailable storage falls back without blocking preference changes", async () => {
    const preferences = await loadModule("../src/utils/preferences.ts");
    const originalWindow = globalThis.window;
    globalThis.window = { get localStorage() { throw new Error("Storage blocked"); } };
    try {
        assert.equal(preferences.readPreference("portfolio-theme", "Latte"), "Latte");
        assert.doesNotThrow(() => preferences.writePreference("portfolio-theme", "Mocha"));
    } finally {
        globalThis.window = originalWindow;
    }
});

test("reduced motion bypasses view transitions", () => {
    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;
    globalThis.window = { matchMedia: () => ({ matches: true }) };
    globalThis.document = { startViewTransition() { assert.fail("Must not animate"); } };
    let committed = false;
    try {
        routing.runRouteTransition(() => { committed = true; });
        assert.equal(committed, true);
    } finally {
        globalThis.window = originalWindow;
        globalThis.document = originalDocument;
    }
});
