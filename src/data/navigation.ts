export const resumeHref = "/resume/Huy-Le-Resume.pdf";

export const navLinks = ["About", "Projects", "Resume"];

export const socialLinks = [
    { label: "GitHub", href: "https://github.com/giahuyyle", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/huylegia", icon: "linkedin" },
    { label: "Email", href: "mailto:huyyyylegia@gmail.com", icon: "mail" },
] as const;

export type SocialIconName = (typeof socialLinks)[number]["icon"];
