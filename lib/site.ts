export const siteConfig = {
  name: "Piyush Shrivastava",
  role: "AI Product Manager",
  shortBio:
    "Building AI-enabled SaaS products. Agile delivery, MVP definition, and stakeholder management across 7+ industries.",
  description:
    "Product-focused Business Analyst with 3+ years of experience delivering SaaS and enterprise solutions across 7+ industries including hospitality, retail, manufacturing, entertainment, education, food service, and paints & coatings. Experienced in building products from 0-1 through AI-enabled product delivery, Agile SDLC execution, MVP definition, stakeholder management, and workflow automation.",
  keywords: [
    "Piyush Shrivastava",
    "AI Product Manager",
    "Product Manager",
    "Business Analyst",
    "SaaS",
    "Agile",
    "GenAI",
  ],
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://piyushshrivastava-04.github.io",
  email: "piyush2.shrivastava2017@gmail.com",
  location: "Noida, U.P., India",
  resume: "/piyush-shrivastava-resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/piyush-shrivastava-5aba09243",
    github: "https://github.com/piyushshrivastava-04",
  },
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Strategy", href: "#strategy" },
    { label: "Experience", href: "#timeline" },
    { label: "Contact", href: "#contact" },
  ] as const,
  expertise: {
    heading: "Product & AI Expertise",
    groups: [
      {
        title: "AI Product & Strategy",
        items: [
          "AI Product Strategy",
          "GTM Strategy",
          "Ethical AI Governance",
          "User-Centric AI & UI/UX Design",
          "Data-Driven Roadmapping",
          "0-1 Product Development",
          "AI-Assisted SDLC",
          "AI Research & Workflow Automation",
          "Vibe Coding",
        ],
      },
      {
        title: "Product Management & Delivery",
        items: [
          "Product Management",
          "Agile & Scrum",
          "AI-Enabled Product Delivery",
          "MVP Definition",
          "SDLC",
          "BRD / FRD Documentation",
          "Backlog Prioritization",
          "Sprint Planning",
          "Release Management",
          "UAT Coordination",
          "Product Roadmapping",
          "Process Flows",
          "Stakeholder Management",
          "Cross-Functional Leadership",
          "RICE Framework",
          "VOTE Framework",
          "RACI Matrix",
          "Wireframing",
        ],
      },
      {
        title: "Tools, Platforms & Analytics",
        items: [
          "Jira",
          "Figma",
          "Lucidchart",
          "Monday.com",
          "Salesforce",
          "Agentforce",
          "SAP",
          "Excel",
          "SQL",
          "Power BI",
          "Tableau",
          "GenAI Tools",
        ],
      },
    ],
  } as const,
  education: [
    {
      degree: "Masters of Business Administration",
      field: "Information Technology & Marketing",
      institution: "Dr. A. P. J. Abdul Kalam Technical University",
    },
    {
      degree: "Bachelors of Business Administration",
      field: "Business Administration & Management",
      institution: "Guru Gobind Singh Indraprastha University",
    },
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
