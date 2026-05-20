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
        websiteUrl: "https://www.fpt-software.com/",
        preview: {
            activeFile: "mcp-streaming-server.ts",
            codeLines: [
                "role: Applied AI/ML Software Developer Intern",
                "company: FPT Software",
                "timeline: May 2025 - August 2025",
                "stack: OpenAI, LangChain, ChromaDB, MCP, Docker",
                "shipped: streamable HTTP MCP server (-35% RAG latency)",
                "shipped: LangChain + ChromaDB pipeline (+42% throughput)",
                "shipped: GraphRAG retrieval (+18% precision vs baseline)",
            ],
            fileTree: [
                "mcp-streaming-server.ts",
                "vector-pipeline.py",
                "graphrag-retrieval.md",
            ],
            metrics: ["Applied AI/ML", "RAG systems", "Summer 2025"],
            note: "Built production AI infrastructure for OpenAI-powered chatbots: a streamable HTTP MCP server cutting RAG response latency by 35%, an optimized LangChain + ChromaDB vector pipeline lifting query throughput 42%, and a GraphRAG-based retrieval system improving answer precision 18% over standard RAG.",
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
            activeFile: "admin-dashboard.tsx",
            codeLines: [
                "role: Software Developer Intern",
                "company: CodeDream Education",
                "timeline: June 2024 - August 2024",
                "stack: React, TypeScript, FastAPI, Python, Flask, pytest, PHP",
                "shipped: full-stack admin dashboard (50+ classes, 4+ centers)",
                "shipped: refactored CDOJ judge (-20% submission/grading latency, 400+ students)",
                "shipped: CodeLlama AI-code detection classifier (Flask REST)",
            ],
            fileTree: [
                "admin-dashboard.tsx",
                "cdoj-judge.php",
                "ai-code-detector.py",
            ],
            metrics: ["Full-stack", "EdTech", "Summer 2024"],
            note: "Shipped three systems for a 400+ student programming education platform: a React + FastAPI admin dashboard streamlining operations across 4+ centers, a refactored PHP online judge (CDOJ) with pytest-based test coverage cutting submission and grading latency by 20%, and a fine-tuned CodeLlama classifier detecting AI-generated submissions served behind a Flask REST endpoint.",
            title: "codedream-education",
        },
    },
    {
        id: "dibiz",
        company: "DIBIZ - Digital Business",
        detail: "Software Developer Intern | May 2023 - Sep 2023",
        logoLabel: "DB",
        logoSrc: "/image/dibiz-logo.png",
        websiteUrl: "https://www.dibiz.com/",
        preview: {
            activeFile: "rabbitmq-consumer.py",
            codeLines: [
                "role: Software Developer Intern",
                "company: DIBIZ - Digital Business",
                "timeline: May 2023 - September 2023",
                "stack: Python, RabbitMQ, REST APIs, embeddings",
                "shipped: RabbitMQ batch consumer (-15% processing time, 500K customers/day)",
                "shipped: 10+ RESTful API endpoints",
                "shipped: embedding-based user preference scoring pipeline",
            ],
            fileTree: [
                "rabbitmq-consumer.py",
                "api-endpoints.py",
                "preference-pipeline.py",
            ],
            metrics: ["Backend engineering", "Streaming data", "Summer 2023"],
            note: "Built data infrastructure for a customer engagement platform: redesigned batch consumer logic for a daily RabbitMQ stream serving 500,000 customers (cutting processing time 15%), and shipped 10+ RESTful API endpoints plus an embedding-based user preference scoring pipeline powering personalized promotions for daily active users.",
            title: "dibiz-digital-business",
        },
    },
];
