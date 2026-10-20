import { profile } from "./profile";

/**
 * Virtual File System (VFS) for VishnuOS
 * Single source of truth driven directly from `profile.js`.
 */

const createVFS = () => {
  return {
    "/": {
      type: "dir",
      name: "/",
      children: ["home"],
    },
    "/home": {
      type: "dir",
      name: "home",
      children: ["vishnu"],
    },
    "/home/vishnu": {
      type: "dir",
      name: "vishnu",
      children: [
        "Documents",
        "Projects",
        "Experience",
        "Skills",
        "Education",
        "Contact",
        "Desktop",
      ],
    },
    "/home/vishnu/Documents": {
      type: "dir",
      name: "Documents",
      children: ["Resume.txt", "Bio.md"],
    },
    "/home/vishnu/Documents/Resume.txt": {
      type: "file",
      name: "Resume.txt",
      mime: "text/plain",
      app: "resume",
      content: `VISHNU THANGARAJ
${profile.identity.title}
Location: ${profile.identity.location}
GitHub: ${profile.identity.github}
LinkedIn: ${profile.identity.linkedin}

SUMMARY:
${profile.identity.summary}

EXPERIENCE:
${profile.experience
  .map(
    (e) => `• ${e.role} at ${e.company} (${e.period}, ${e.location})
  ${e.bullets.join("\n  ")}
  Tech: ${e.tech.join(", ")}`
  )
  .join("\n\n")}

PROJECTS:
${profile.projects
  .map(
    (p) => `• ${p.name} — ${p.tagline}
  ${p.description}
  Tech: ${p.tech.join(", ")}
  Repo: ${p.repo}`
  )
  .join("\n\n")}
`,
    },
    "/home/vishnu/Documents/Bio.md": {
      type: "file",
      name: "Bio.md",
      mime: "text/markdown",
      app: "code",
      content: `# About Vishnu Thangaraj

${profile.identity.summary}

## Core Competencies
- Full Stack MERN Development (React, TypeScript, Node.js, Express, MongoDB)
- DevOps Automation (Docker, Jenkins, CI/CD, Containerisation)
- AI/ML Engineering (Ollama local inference, TensorFlow, Scikit-learn, Python)
`,
    },
    "/home/vishnu/Projects": {
      type: "dir",
      name: "Projects",
      children: ["IronParadise", "FizzType"],
    },
    "/home/vishnu/Projects/IronParadise": {
      type: "dir",
      name: "IronParadise",
      children: ["README.md", "architecture.txt"],
    },
    "/home/vishnu/Projects/IronParadise/README.md": {
      type: "file",
      name: "README.md",
      mime: "text/markdown",
      app: "code",
      content: `# IronParadise — Gym ERP System

${profile.projects[0].description}

## Features
${profile.projects[0].bullets.map((b) => `- ${b}`).join("\n")}

## Tech Stack
${profile.projects[0].tech.join(", ")}

## Repository
[GitHub](${profile.projects[0].repo})
`,
    },
    "/home/vishnu/Projects/IronParadise/architecture.txt": {
      type: "file",
      name: "architecture.txt",
      mime: "text/plain",
      app: "code",
      content: `Architecture Overview:
- Client: React 19, TypeScript, Tailwind CSS
- Server: Express REST API, Node.js
- Database: MongoDB replica set
- AI Engine: Ollama local LLM for personalized workout generation
- Deployment: Docker multi-stage container
`,
    },
    "/home/vishnu/Projects/FizzType": {
      type: "dir",
      name: "FizzType",
      children: ["README.md"],
    },
    "/home/vishnu/Projects/FizzType/README.md": {
      type: "file",
      name: "README.md",
      mime: "text/markdown",
      app: "code",
      content: `# FizzType — Typing Speed & Analytics Platform

${profile.projects[1].description}

## Features
${profile.projects[1].bullets.map((b) => `- ${b}`).join("\n")}

## Tech Stack
${profile.projects[1].tech.join(", ")}

## Repository
[GitHub](${profile.projects[1].repo})
`,
    },
    "/home/vishnu/Experience": {
      type: "dir",
      name: "Experience",
      children: ["SHNOOR_International.md", "IICT_AI_ML.md"],
    },
    "/home/vishnu/Experience/SHNOOR_International.md": {
      type: "file",
      name: "SHNOOR_International.md",
      mime: "text/markdown",
      app: "code",
      content: `# Software Engineer Intern — SHNOOR International
Period: ${profile.experience[0].period}
Location: ${profile.experience[0].location}

## Highlights
${profile.experience[0].bullets.map((b) => `- ${b}`).join("\n")}

## Technologies
${profile.experience[0].tech.join(", ")}
`,
    },
    "/home/vishnu/Experience/IICT_AI_ML.md": {
      type: "file",
      name: "IICT_AI_ML.md",
      mime: "text/markdown",
      app: "code",
      content: `# AI/ML Intern — IICT
Period: ${profile.experience[1].period}
Location: ${profile.experience[1].location}

## Highlights
${profile.experience[1].bullets.map((b) => `- ${b}`).join("\n")}

## Technologies
${profile.experience[1].tech.join(", ")}
`,
    },
    "/home/vishnu/Skills": {
      type: "dir",
      name: "Skills",
      children: ["frontend.txt", "backend.txt", "devops.txt", "ai_ml.txt"],
    },
    "/home/vishnu/Skills/frontend.txt": {
      type: "file",
      name: "frontend.txt",
      mime: "text/plain",
      app: "code",
      content: profile.skills.frontend.join("\n"),
    },
    "/home/vishnu/Skills/backend.txt": {
      type: "file",
      name: "backend.txt",
      mime: "text/plain",
      app: "code",
      content: profile.skills.backend.join("\n"),
    },
    "/home/vishnu/Skills/devops.txt": {
      type: "file",
      name: "devops.txt",
      mime: "text/plain",
      app: "code",
      content: profile.skills.devops.join("\n"),
    },
    "/home/vishnu/Skills/ai_ml.txt": {
      type: "file",
      name: "ai_ml.txt",
      mime: "text/plain",
      app: "code",
      content: profile.skills.ai_ml.join("\n"),
    },
    "/home/vishnu/Education": {
      type: "dir",
      name: "Education",
      children: ["MSc_Computer_Science.txt", "BCA.txt"],
    },
    "/home/vishnu/Education/MSc_Computer_Science.txt": {
      type: "file",
      name: "MSc_Computer_Science.txt",
      mime: "text/plain",
      app: "code",
      content: `Master of Science in Computer Science
Institution: ${profile.education[0].institution}
Period: ${profile.education[0].period}
Score: ${profile.education[0].cgpa}
Highlights: ${profile.education[0].highlights.join("; ")}
`,
    },
    "/home/vishnu/Education/BCA.txt": {
      type: "file",
      name: "BCA.txt",
      mime: "text/plain",
      app: "code",
      content: `Bachelor of Computer Applications (BCA)
Institution: ${profile.education[1].institution}
Period: ${profile.education[1].period}
Score: ${profile.education[1].cgpa}
Highlights: ${profile.education[1].highlights.join("; ")}
`,
    },
    "/home/vishnu/Contact": {
      type: "dir",
      name: "Contact",
      children: ["contact.json"],
    },
    "/home/vishnu/Contact/contact.json": {
      type: "file",
      name: "contact.json",
      mime: "application/json",
      app: "contact",
      content: JSON.stringify(profile.identity, null, 2),
    },
    "/home/vishnu/Desktop": {
      type: "dir",
      name: "Desktop",
      children: ["Home", "IronParadise", "SHNOOR_International"],
    },
  };
};

export const vfs = createVFS();

export function normalizePath(path) {
  if (!path.startsWith("/")) path = "/" + path;
  const parts = path.split("/").filter(Boolean);
  const stack = [];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return "/" + stack.join("/");
}

export function getNode(path) {
  const norm = normalizePath(path);
  return vfs[norm] || null;
}

export function listDirectory(path) {
  const node = getNode(path);
  if (!node || node.type !== "dir") return null;
  return node.children.map((childName) => {
    const childPath = normalizePath(`${path}/${childName}`);
    return {
      name: childName,
      path: childPath,
      ...vfs[childPath],
    };
  });
}

export function readFile(path) {
  const node = getNode(path);
  if (!node || node.type !== "file") return null;
  return node.content;
}

export function searchVFS(term) {
  const q = term.toLowerCase();
  const results = [];
  for (const [path, node] of Object.entries(vfs)) {
    if (node.name.toLowerCase().includes(q)) {
      results.push({ path, node, matchType: "name" });
    } else if (node.type === "file" && node.content && node.content.toLowerCase().includes(q)) {
      results.push({ path, node, matchType: "content" });
    }
  }
  return results;
}
