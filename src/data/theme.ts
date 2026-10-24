import type { CSSProperties } from "react";

export const defaultAccent = "#e68d79";

export const themes = {
    Latte: { bg: "#eff1f5", text: "#3a3e5c", muted: "#5d6074", soft: "#6c6f85", panel: "#e6e9ef", surface: "#f6f7fa", border: "#d5d8e3" },
    Frappe: { bg: "#303446", text: "#c6d0f5", muted: "#b2badb", soft: "#a5adce", panel: "#292c3c", surface: "#35394c", border: "#4b5068" },
    Macchiato: { bg: "#24273a", text: "#cad3f5", muted: "#b0badb", soft: "#a5adcb", panel: "#1e2030", surface: "#2d3046", border: "#434863" },
    Mocha: { bg: "#1e1e2e", text: "#cdd6f4", muted: "#b2bbd7", soft: "#a6adc8", panel: "#181825", surface: "#29293c", border: "#414159" },
};

export const swatches = [defaultAccent, "#dc858d", "#dd77d6", "#9257e8", "#d84861", "#e86371", "#ff7e45", "#e4a348", "#61ac58", "#4ea5ad", "#43ade0", "#4fa5b7", "#4677e8", "#8396f4"];
export const accentNames = ["Peach", "Rose", "Pink", "Mauve", "Red", "Coral", "Orange", "Gold", "Green", "Teal", "Sky", "Sapphire", "Blue", "Lavender"];
export type ThemeName = keyof typeof themes;

function channels(hex: string) {
    return [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
}

function luminance(hex: string) {
    const linear = channels(hex).map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function contrastRatio(first: string, second: string) {
    const a = luminance(first);
    const b = luminance(second);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// Preserve each hue while adjusting lightness until it works on every text surface.
export function readableColor(color: string, backgrounds: string[], lightTheme: boolean) {
    const original = channels(color);
    const target = lightTheme ? 0 : 255;
    for (let step = 0; step <= 100; step++) {
        const candidate = "#" + original.map((channel) => Math.round(channel + (target - channel) * step / 100).toString(16).padStart(2, "0")).join("");
        if (backgrounds.every((background) => contrastRatio(candidate, background) >= 4.5)) {
            return candidate;
        }
    }
    return lightTheme ? "#000000" : "#ffffff";
}

export function getThemeStyle(name: ThemeName, accent: string): CSSProperties {
    const theme = themes[name];
    const backgrounds = [theme.bg, theme.panel, theme.surface];
    return {
        ...Object.fromEntries(Object.entries(theme).map(([key, value]) => [`--hero-${key}`, value])),
        "--hero-muted": readableColor(theme.muted, backgrounds, name === "Latte"),
        "--hero-soft": readableColor(theme.soft, backgrounds, name === "Latte"),
        "--hero-accent": accent,
        "--hero-accent-text": readableColor(accent, backgrounds, name === "Latte"),
        "--hero-glass": `${theme.surface}ed`,
        "--hero-grid": theme.border,
    } as CSSProperties;
}
