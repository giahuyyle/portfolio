export type ExperienceItem = {
    id: string;
    company: string;
    role: string;
    dates: string;
    location: string;
    achievements: string[];
    logoLabel: string;
    logoSrc?: string;
    websiteUrl?: string;
};

export const experienceItems: ExperienceItem[] = [
    {
        id: "stust",
        company: "Southern Taiwan University of Science and Technology (TEEP)",
        role: "Embedded Software Research Assistant",
        dates: "Jul 2026 - Present",
        location: "Tainan, Taiwan",
        logoLabel: "STUST",
        achievements: [
            "Designed a CAN-based instruction protocol using SAE J1939 conventions to configure an STM32 pattern generator, and developed Python tooling to encode and transmit command frames through the TSMaster interface.",
            "Built a signal-configuration UI that converts engineer-selected values into encoded command payloads, applying signal scaling, byte ordering, and range validation for 179 unique SPNs to configure the device without modifying firmware.",
        ],
    },
    {
        id: "fpt-software",
        company: "FPT Software",
        role: "Applied AI/ML Software Developer Intern",
        dates: "May 2025 - Aug 2025",
        location: "Hanoi, Vietnam",
        logoLabel: "FPT",
        logoSrc: "/image/FPT_Software_Logo.png",
        websiteUrl: "https://www.fpt-software.com/",
        achievements: [
            "Built production AI infrastructure for OpenAI-powered chatbots: a streamable HTTP MCP server cutting RAG response latency by 35%, an optimized LangChain + ChromaDB vector pipeline lifting query throughput 42%, and a GraphRAG-based retrieval system improving answer precision 18% over standard RAG.",
        ],
    },
    {
        id: "codedream",
        company: "CodeDream Education",
        role: "Software Developer Intern",
        dates: "Jun 2024 - Aug 2024",
        location: "Hanoi, Vietnam",
        logoLabel: "CD",
        logoSrc: "/image/codedream-logo.png",
        websiteUrl: "https://codedream.edu.vn/",
        achievements: [
            "Shipped three systems for a 400+ student programming education platform: a React + FastAPI admin dashboard streamlining operations across 4+ centers, a refactored PHP online judge (CDOJ) with pytest-based test coverage cutting submission and grading latency by 20%, and a fine-tuned CodeLlama classifier detecting AI-generated submissions served behind a Flask REST endpoint.",
        ],
    },
    {
        id: "dibiz",
        company: "DIBIZ - Digital Business",
        role: "Software Developer Intern",
        dates: "May 2023 - Sep 2023",
        location: "Hanoi, Vietnam",
        logoLabel: "DB",
        logoSrc: "/image/dibiz-logo.png",
        websiteUrl: "https://www.dibiz.com/",
        achievements: [
            "Built data infrastructure for a customer engagement platform: redesigned batch consumer logic for a daily RabbitMQ stream serving 500,000 customers (cutting processing time 15%), and shipped 10+ RESTful API endpoints plus an embedding-based user preference scoring pipeline powering personalized promotions for daily active users.",
        ],
    },
];
