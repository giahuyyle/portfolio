import { useEffect, useState, type CSSProperties } from "react";

type Pulse = {
    id: number;
    x: number;
    y: number;
    size: number;
};

const gridSize = 38;

function getRandomGridLine(start: number, length: number) {
    const firstLine = Math.ceil(start / gridSize);
    const lastLine = Math.floor((start + length) / gridSize);
    const line = firstLine + Math.floor(Math.random() * (lastLine - firstLine));

    return line * gridSize - start;
}

function createPulse(): Pulse {
    return {
        id: Date.now() + Math.random(),
        size: 12,
        x: getRandomGridLine(window.scrollX, window.innerWidth),
        y: getRandomGridLine(window.scrollY, window.innerHeight),
    };
}

function BackgroundPulses() {
    const [pulses, setPulses] = useState<Pulse[]>([]);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reducedMotion) {
            return;
        }

        const timeouts: number[] = [];

        const addPulse = () => {
            const pulse = createPulse();

            setPulses((current) => [...current.slice(-3), pulse]);

            const timeout = window.setTimeout(() => {
                setPulses((current) =>
                    current.filter((item) => item.id !== pulse.id),
                );
            }, 2200);

            timeouts.push(timeout);
        };

        addPulse();

        const interval = window.setInterval(addPulse, 2000);

        return () => {
            window.clearInterval(interval);
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
        };
    }, []);

    return (
        <div className="background-pulses" aria-hidden="true">
            {pulses.map((pulse) => (
                <span
                    className="background-pulse"
                    key={pulse.id}
                    style={
                        {
                            "--pulse-size": `${pulse.size}px`,
                            "--pulse-x": `${pulse.x}px`,
                            "--pulse-y": `${pulse.y}px`,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    );
}

export default BackgroundPulses;
