export type EducationItem = {
    id: string;
    institution: string;
    program?: string;
    dates: string;
    expectedGraduation?: string;
    logoSrc?: string;
};

export const universityEducation: EducationItem = {
    id: "ualberta",
    institution: "University of Alberta",
    program: "B.Sc. in Computer Science, Minor in Mathematics",
    dates: "September 2023 - Present",
    expectedGraduation: "December 2027",
    logoSrc: "/image/ualberta-logo.png",
};

export const educationItems: EducationItem[] = [
    universityEducation,
    {
        id: "hanoi-amsterdam",
        institution: "Hanoi-Amsterdam High School for the Gifted",
        dates: "2020 - 2023",
    },
];
