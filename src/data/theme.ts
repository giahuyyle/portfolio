export const themes = {
    Latte: {
        bg: "#f7f9fc",
        text: "#17233f",
        muted: "#4a5572",
        soft: "#7f8aa5",
        accent: "#243f88",
        panel: "rgba(239, 242, 248, 0.88)",
        grid: "rgba(96, 135, 191, 0.18)",
    },
    Frappe: {
        bg: "#eff3fb",
        text: "#22304f",
        muted: "#59637d",
        soft: "#8b94aa",
        accent: "#3f5fab",
        panel: "rgba(234, 238, 247, 0.9)",
        grid: "rgba(79, 105, 158, 0.18)",
    },
    Macchiato: {
        bg: "#eef1f7",
        text: "#1d2740",
        muted: "#535d76",
        soft: "#8790a7",
        accent: "#5a5fc7",
        panel: "rgba(232, 235, 244, 0.9)",
        grid: "rgba(72, 93, 142, 0.19)",
    },
    Mocha: {
        bg: "#e9edf5",
        text: "#141d33",
        muted: "#4c566f",
        soft: "#7b859c",
        accent: "#182f72",
        panel: "rgba(225, 230, 240, 0.9)",
        grid: "rgba(54, 78, 130, 0.2)",
    },
};

export const swatches = [
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
