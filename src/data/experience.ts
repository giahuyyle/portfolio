export type ExperiencePreviewData = {
    activeFile: string;
    codeLines: string[];
    fileTree: string[];
    metrics: string[];
    note: string;
    title: string;
};

export type ExperienceItem = {
    company: string;
    detail: string;
    id: string;
    logoLabel: string;
    logoSrc?: string;
    preview: ExperiencePreviewData;
    websiteUrl: string;
};

export const experienceItems: ExperienceItem[] = [
    {
        id: "ualberta",
        company: "University of Alberta",
        detail: "B.Sc. Computing Science + Mathematics | Sep 2023 - Present",
        logoLabel: "UA",
        logoSrc: "/image/ualberta-logo.png",
        websiteUrl: "https://www.ualberta.ca/",
        preview: {
            activeFile: "degree.md",
            codeLines: [
                "program: Bachelor of Science",
                "majors: Computing Science, Mathematics",
                "timeline: September 2023 - Present",
                "focus: algorithms, systems, software engineering, AI",
            ],
            fileTree: ["degree.md", "courses.ts", "campus-notes.md"],
            metrics: [
                "Computing Science",
                "Mathematics",
                "Sep 2023 - Present",
            ],
            note: "Academic work centered on the theory and practice behind reliable software: data structures, systems thinking, mathematical reasoning, and applied computing.",
            title: "university-of-alberta",
        },
    },
    {
        id: "fpt-software",
        company: "FPT Software",
        detail: "Applied AI/ML Software Developer Intern | May 2025 - Aug 2025",
        logoLabel: "FPT",
        logoSrc: "/image/FPT_Software_Logo.png",
        websiteUrl: "https://fptsoftware.com/",
        preview: {
            activeFile: "ai-ml-internship.ts",
            codeLines: [
                "role: Applied AI/ML Software Developer Intern",
                "company: FPT Software",
                "timeline: May 2025 - August 2025",
                "scope: applied AI, ML tooling, production software",
            ],
            fileTree: ["ai-ml-internship.ts", "models.py", "pipeline.md"],
            metrics: ["Applied AI/ML", "Software tooling", "Summer 2025"],
            note: "Internship focused on applying AI and machine learning practices inside software workflows, with attention to usable developer-facing systems.",
            title: "fpt-software",
        },
    },
    {
        id: "codedream",
        company: "CodeDream Education",
        detail: "Software Developer Intern | Jun 2024 - Aug 2024",
        logoLabel: "CD",
        logoSrc: "/image/codedream-logo.png",
        websiteUrl: "https://codedream.edu.vn/",
        preview: {
            activeFile: "education-platform.tsx",
            codeLines: [
                "role: Software Developer Intern",
                "company: CodeDream Education",
                "timeline: June 2024 - August 2024",
                "scope: education software, product features, UI delivery",
            ],
            fileTree: [
                "education-platform.tsx",
                "lesson-flow.ts",
                "student-ui.md",
            ],
            metrics: ["Education tech", "Frontend features", "Summer 2024"],
            note: "Worked on software for learning experiences, balancing clear user flows with maintainable implementation details.",
            title: "codedream-education",
        },
    },
    {
        id: "dibiz",
        company: "DIBIZ",
        detail: "Software Developer Intern | May 2023 - Sep 2023",
        logoLabel: "DB",
        logoSrc: "/image/dibiz-logo.png",
        websiteUrl: "https://dibiz.vn/en/",
        preview: {
            activeFile: "internship.ts",
            codeLines: [
                "role: Software Developer Intern",
                "company: DIBIZ",
                "timeline: May 2023 - September 2023",
                "scope: software development, product support, implementation",
            ],
            fileTree: ["internship.ts", "features.md", "handoff-notes.md"],
            metrics: ["Software development", "Product support", "2023"],
            note: "Early software internship experience focused on contributing to application work, implementation tasks, and practical development habits.",
            title: "dibiz",
        },
    },
];
