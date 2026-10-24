export function readPreference(key: string, fallback: string) {
    try {
        return window.localStorage.getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
}

export function writePreference(key: string, value: string) {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        // In-memory preferences still work when browser storage is unavailable.
    }
}
