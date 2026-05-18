export const defaultAccent = "#5b6ee1";

export const themes = {
    Latte: {
        bg: "#eff1f5",
        text: "#3a3e5c",
        muted: "#6c6f85",
        soft: "#8c8fa1",
        accent: defaultAccent,
        panel: "rgba(230, 233, 239, 0.88)",
        grid: "rgba(91, 110, 225, 0.16)",
    },
    Frappe: {
        bg: "#303446",
        text: "#c6d0f5",
        muted: "#a5adce",
        soft: "#838ba7",
        accent: defaultAccent,
        panel: "rgba(41, 44, 60, 0.88)",
        grid: "rgba(91, 110, 225, 0.18)",
    },
    Macchiato: {
        bg: "#24273a",
        text: "#cad3f5",
        muted: "#a5adcb",
        soft: "#8087a2",
        accent: defaultAccent,
        panel: "rgba(30, 32, 48, 0.88)",
        grid: "rgba(91, 110, 225, 0.18)",
    },
    Mocha: {
        bg: "#1e1e2e",
        text: "#cdd6f4",
        muted: "#a6adc8",
        soft: "#7f849c",
        accent: defaultAccent,
        panel: "rgba(24, 24, 37, 0.88)",
        grid: "rgba(91, 110, 225, 0.18)",
    },
};

export const swatches = [
    defaultAccent,
    "#e68d79",
    "#dc858d",
    "#dd77d6",
    "#9257e8",
    "#d84861",
    "#e86371",
    "#ff7e45",
    "#e4a348",
    "#61ac58",
    "#4ea5ad",
    "#43ade0",
    "#4fa5b7",
    "#4677e8",
    "#8396f4",
];

export type ThemeName = keyof typeof themes;
