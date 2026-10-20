/**
 * Single source of truth for all portfolio content.
 * Every app window reads from this file — edit here, see everywhere.
 */

export const profile = {
  identity: {
    name: "Vishnu Thangaraj",
    title: "Full Stack Developer | DevOps | AI/ML",
    summary:
      "Passionate MERN stack developer with expertise in DevOps practices and AI/ML engineering. Building scalable, containerised applications with a focus on clean architecture, automated pipelines, and intelligent features.",
    email: "TODO@example.com",
    github: "https://github.com/VishnuThangaraj",
    linkedin: "https://linkedin.com/in/TODO",
    location: "India",
    avatar: null,
    resumePdf: null,
  },

  experience: [
    {
      id: "shnoor",
      company: "SHNOOR International",
      role: "Software Engineer Intern",
      period: "Jul 2026 – Present",
      location: "India",
      bullets: [
        "Built full-stack features using the MERN stack with TypeScript",
        "Implemented CI/CD pipelines with Docker and Jenkins for automated deployments",
        "Developed RESTful APIs and integrated third-party services",
        "Collaborated in Agile sprints using Git-based workflows",
      ],
      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "TypeScript",
        "Docker",
        "Jenkins",
        "Express",
      ],
    },
    {
      id: "iict",
      company: "IICT",
      role: "AI/ML Intern",
      period: "Jun – Jul 2026",
      location: "India",
      bullets: [
        "Developed machine learning models for classification and prediction tasks",
        "Built data preprocessing and analysis pipelines with Python",
        "Evaluated model performance and optimised hyperparameters",
      ],
      tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "NumPy"],
    },
  ],

  projects: [
    {
      id: "ironparadise",
      name: "IronParadise",
      tagline: "Gym ERP System",
      description:
        "Full-featured gym management ERP with AI-powered workout recommendations via Ollama. Handles member management, billing, attendance, and intelligent workout plan generation.",
      bullets: [
        "Member management with role-based access control",
        "AI-powered workout plan generation using Ollama",
        "Automated billing and payment tracking",
        "Attendance tracking with dashboard analytics",
        "Containerised with Docker for consistent deployments",
      ],
      tech: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Ollama",
        "Docker",
        "Tailwind CSS",
      ],
      repo: "https://github.com/VishnuThangaraj/IronParadise",
      icon: "dumbbell",
    },
    {
      id: "fizztype",
      name: "FizzType",
      tagline: "Typing Analytics Platform",
      description:
        "Real-time typing speed and accuracy analytics platform with historical performance tracking and detailed WPM/accuracy visualisations.",
      bullets: [
        "Real-time words-per-minute tracking and display",
        "Accuracy analytics with per-character breakdown",
        "Historical performance graphs and trends",
        "Containerised development environment with Docker",
      ],
      tech: ["React", "Python", "Flask", "Docker", "Chart.js", "CSS"],
      repo: "https://github.com/VishnuThangaraj/FizzType",
      icon: "keyboard",
    },
  ],

  skills: {
    Languages: ["JavaScript", "Python", "TypeScript", "Java", "C", "SQL"],
    Frameworks: [
      "React",
      "Node.js",
      "Express",
      "Next.js",
      "Flask",
      "Tailwind CSS",
    ],
    Databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    "Cloud & DevOps": [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "AWS",
      "GCP",
      "CI/CD",
      "Linux",
      "Nginx",
    ],
    Tools: ["Git", "GitHub", "VS Code", "Bruno", "Postman", "Figma", "Jira"],
    Concepts: [
      "REST APIs",
      "Microservices",
      "Agile/Scrum",
      "TDD",
      "System Design",
      "DSA",
    ],
  },

  education: [
    {
      degree: "Master of Science — Data Science",
      institution: "University",
      cgpa: "9.5",
      period: "2024 – 2026",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "University",
      cgpa: "8.8",
      period: "2021 – 2024",
    },
  ],

  honors: [
    {
      title: "KPRCAS Proficiency Award 2025–26",
      type: "award",
      description: "Academic excellence recognition",
    },
    {
      title: "Udemy Certificates",
      type: "certification",
      description: "Professional development courses",
    },
    {
      title: "SkillUp Certificates",
      type: "certification",
      description: "Technical skill certifications",
    },
  ],
};

/**
 * Terminal commands and their outputs — used by TerminalApp.
 */
export const terminalCommands = {
  whoami: () =>
    `${profile.identity.name} — ${profile.identity.title}`,

  "cat resume.txt": () => {
    const p = profile;
    return [
      `╔══════════════════════════════════════════════╗`,
      `║  ${p.identity.name.toUpperCase().padEnd(42)}║`,
      `║  ${p.identity.title.padEnd(42)}║`,
      `╚══════════════════════════════════════════════╝`,
      ``,
      `${p.identity.summary}`,
      ``,
      `📧 ${p.identity.email}`,
      `🔗 ${p.identity.github}`,
      `📍 ${p.identity.location}`,
    ].join("\n");
  },

  "cat skills.txt": () => {
    return Object.entries(profile.skills)
      .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
      .join("\n");
  },

  "ls projects/": () =>
    profile.projects.map((p) => `📁 ${p.name}/`).join("    "),

  "cat projects/ironparadise/README.md": () => {
    const p = profile.projects[0];
    return [
      `# ${p.name}`,
      `> ${p.tagline}`,
      ``,
      p.description,
      ``,
      `## Features`,
      ...p.bullets.map((b) => `  • ${b}`),
      ``,
      `## Stack`,
      p.tech.join(" · "),
      ``,
      `## Repo`,
      p.repo,
    ].join("\n");
  },

  "cat projects/fizztype/README.md": () => {
    const p = profile.projects[1];
    return [
      `# ${p.name}`,
      `> ${p.tagline}`,
      ``,
      p.description,
      ``,
      `## Features`,
      ...p.bullets.map((b) => `  • ${b}`),
      ``,
      `## Stack`,
      p.tech.join(" · "),
      ``,
      `## Repo`,
      p.repo,
    ].join("\n");
  },

  "cat contact.json": () =>
    JSON.stringify(
      {
        email: profile.identity.email,
        github: profile.identity.github,
        linkedin: profile.identity.linkedin,
        location: profile.identity.location,
      },
      null,
      2
    ),

  "cat education.txt": () =>
    profile.education
      .map(
        (e) =>
          `🎓 ${e.degree}\n   ${e.institution} — CGPA: ${e.cgpa}\n   ${e.period}`
      )
      .join("\n\n"),

  neofetch: () => {
    const skillCount = Object.values(profile.skills).flat().length;
    return [
      `        .-/+oossssoo+/-.        vishnu@portfolio`,
      `    \`:+ssssssssssssssssss+:\`    ─────────────────`,
      `  -+ssssssssssssssssssssssss+-  OS: VishnuOS 1.0`,
      ` .ossssssssssssssssssssssssssso. Shell: React 19`,
      `/sssssssssssssssssssssssssssssss DE: Vishnu Shell`,
      `ossssssssssssssssssssssssssssssso WM: Custom WM`,
      `ossssssssssssssssssssssssssssssso Theme: Dark [Teal]`,
      `/sssssssssssssssssssssssssssssss Terminal: TermApp`,
      ` .ossssssssssssssssssssssssssso.  CPU: Vite 8.2`,
      `  -+sssssssssssssssssssssss+-   Memory: Tailwind`,
      `    \`:+ssssssssssssssssss+:\`    Skills: ${skillCount}`,
      `        .-/+oossssoo+/-.        Uptime: ∞`,
    ].join("\n");
  },

  help: () =>
    [
      `Available commands:`,
      ``,
      `  whoami              — Who is Vishnu?`,
      `  cat resume.txt      — Full resume summary`,
      `  cat skills.txt      — Skills by category`,
      `  ls projects/        — List projects`,
      `  cat projects/<name>/README.md — Project details`,
      `  cat contact.json    — Contact info`,
      `  cat education.txt   — Education details`,
      `  neofetch            — System info`,
      `  date                — Current date/time`,
      `  uptime              — Portfolio uptime`,
      `  echo <text>         — Echo text`,
      `  clear               — Clear terminal`,
      `  history             — Command history`,
      `  sudo hire-me        — 😏`,
      `  help                — This message`,
    ].join("\n"),

  date: () => new Date().toString(),

  uptime: () => {
    const launched = new Date("2026-10-20");
    const now = new Date();
    const days = Math.max(
      0,
      Math.floor((now - launched) / (1000 * 60 * 60 * 24))
    );
    return `Portfolio has been live for ${days} day${days !== 1 ? "s" : ""} 🚀`;
  },

  "sudo hire-me": () =>
    [
      `[sudo] password for recruiter: ********`,
      `✅ Access granted.`,
      ``,
      `📨 Sending hiring request to Vishnu...`,
      `📧 Contact: ${profile.identity.email}`,
      `🔗 GitHub: ${profile.identity.github}`,
      ``,
      `Thanks for visiting! Let's connect. 🤝`,
    ].join("\n"),
};

/**
 * App registry — defines all available "applications" in the desktop.
 */
export const appRegistry = [
  {
    id: "home",
    name: "Home",
    icon: "Home",
    iconColor: "#42a5f5",
    desktopIcon: true,
    dockIcon: true,
    defaultWidth: 700,
    defaultHeight: 500,
  },
  {
    id: "experience",
    name: "Work Experience",
    icon: "Briefcase",
    iconColor: "#ffa726",
    desktopIcon: true,
    desktopLabel: "Shnoor\nInternational...",
    dockIcon: false,
    defaultWidth: 650,
    defaultHeight: 480,
  },
  {
    id: "ironparadise",
    name: "IronParadise",
    icon: "Dumbbell",
    iconColor: "#ef5350",
    desktopIcon: true,
    dockIcon: false,
    defaultWidth: 700,
    defaultHeight: 500,
  },
  {
    id: "fizztype",
    name: "FizzType",
    icon: "Keyboard",
    iconColor: "#ab47bc",
    desktopIcon: true,
    dockIcon: false,
    defaultWidth: 700,
    defaultHeight: 500,
  },
  {
    id: "projects",
    name: "Projects",
    icon: "FolderOpen",
    iconColor: "#ffa726",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 750,
    defaultHeight: 500,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "Terminal",
    iconColor: "#e4e4e4",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 700,
    defaultHeight: 450,
  },
  {
    id: "browser",
    name: "Web Browser",
    icon: "Globe",
    iconColor: "#66bb6a",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 800,
    defaultHeight: 550,
  },
  {
    id: "code",
    name: "Code Editor",
    icon: "Code2",
    iconColor: "#42a5f5",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 750,
    defaultHeight: 500,
  },
  {
    id: "skills",
    name: "Skills",
    icon: "BarChart3",
    iconColor: "#26c6da",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 650,
    defaultHeight: 500,
  },
  {
    id: "education",
    name: "Education",
    icon: "GraduationCap",
    iconColor: "#ffa726",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 600,
    defaultHeight: 450,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "Mail",
    iconColor: "#ec407a",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 550,
    defaultHeight: 420,
  },
  {
    id: "settings",
    name: "Settings",
    icon: "Settings",
    iconColor: "#a0a0a0",
    desktopIcon: false,
    dockIcon: true,
    defaultWidth: 500,
    defaultHeight: 450,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "Trash2",
    iconColor: "#666666",
    desktopIcon: true,
    dockIcon: false,
    defaultWidth: 400,
    defaultHeight: 300,
  },
];

/** Desktop icons — sorted for left-column layout */
export const desktopIcons = appRegistry.filter((a) => a.desktopIcon);

/** Dock icons — ordered for the bottom dock */
export const dockIcons = appRegistry.filter((a) => a.dockIcon);
