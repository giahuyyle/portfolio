import { accentNames, swatches, themes, type ThemeName } from "../data/theme";

export type ThemePickerProps = {
    activeTheme: ThemeName;
    onThemeChange: (theme: ThemeName) => void;
};

export default function ThemePicker({ activeTheme, onThemeChange }: ThemePickerProps) {
    return (
        <div className="theme-options" role="group" aria-label="Theme">
            {(Object.keys(themes) as ThemeName[]).map((name) => (
                <button type="button" key={name} aria-pressed={activeTheme === name} onClick={() => onThemeChange(name)}>{name}</button>
            ))}
        </div>
    );
}

export function AccentPicker({ accent, onAccentChange }: { accent: string; onAccentChange: (color: string) => void; }) {
    return (
        <div className="swatches" role="group" aria-label="Accent color">
            {swatches.map((color, index) => (
                <button className="swatch" key={color} type="button" style={{ backgroundColor: color }} aria-label={`${accentNames[index]} accent`} aria-pressed={accent === color} onClick={() => onAccentChange(color)} />
            ))}
        </div>
    );
}
