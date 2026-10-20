import { useState, useRef, useEffect } from "react";
import { profile } from "../data/profile";
import { vfs, normalizePath, listDirectory, readFile } from "../data/vfs";
import { useSettingsStore } from "../store/settingsStore";
import { useWindowStore } from "../store/windowStore";

const WELCOME_BANNER = `Welcome to VishnuOS v3.0 Terminal (bash 5.2.15-release)
Type 'help' for available commands, or 'ls' to explore the filesystem.
`;

export const TerminalApp = () => {
  const [cwd, setCwd] = useState("/home/vishnu");
  const [history, setHistory] = useState([{ type: "output", text: WELCOME_BANNER }]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const setTheme = useSettingsStore((s) => s.setTheme);
  const theme = useSettingsStore((s) => s.theme);
  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = inputVal.trim();
      if (!raw) return;

      const newHistory = [...history, { type: "input", text: raw, dir: cwd }];
      setCmdHistory((prev) => [raw, ...prev]);
      setCmdHistoryIdx(-1);

      const parts = raw.split(" ").filter(Boolean);
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      if (cmd === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      }

      if (cmd === "help") {
        newHistory.push({
          type: "output",
          text: `Available commands:
  ls [path]       List directory contents
  cd [path]       Change current working directory
  pwd             Print working directory
  cat <file>      Display file content
  open <app>      Open an application (files, projects, experience, settings, contact)
  whoami          Display current user
  skills          List full stack skills & tools
  projects        List featured projects
  experience      List work history
  neofetch        System & profile specifications
  theme [dark|light] Toggle or set visual theme
  date            Display current system date and time
  uname -a        Print system architecture
  sudo hire-me    Recruiter fast-track
  clear           Clear the console buffer`,
        });
      } else if (cmd === "pwd") {
        newHistory.push({ type: "output", text: cwd });
      } else if (cmd === "whoami") {
        newHistory.push({
          type: "output",
          text: `vishnu (Vishnu Thangaraj — ${profile.identity.title})`,
        });
      } else if (cmd === "uname") {
        newHistory.push({
          type: "output",
          text: `Linux vishnu-os 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,
        });
      } else if (cmd === "date") {
        newHistory.push({ type: "output", text: new Date().toString() });
      } else if (cmd === "ls") {
        const targetPath = arg ? (arg.startsWith("/") ? arg : `${cwd}/${arg}`) : cwd;
        const entries = listDirectory(targetPath);
        if (entries) {
          const formatted = entries
            .map((item) => (item.type === "dir" ? `${item.name}/` : item.name))
            .join("   ");
          newHistory.push({ type: "output", text: formatted || "(empty directory)" });
        } else {
          newHistory.push({
            type: "error",
            text: `ls: cannot access '${arg || cwd}': No such file or directory`,
          });
        }
      } else if (cmd === "cd") {
        if (!arg || arg === "~") {
          setCwd("/home/vishnu");
        } else {
          const target = arg.startsWith("/") ? arg : `${cwd}/${arg}`;
          const norm = normalizePath(target);
          if (vfs[norm] && vfs[norm].type === "dir") {
            setCwd(norm);
          } else {
            newHistory.push({
              type: "error",
              text: `cd: no such file or directory: ${arg}`,
            });
          }
        }
      } else if (cmd === "cat") {
        if (!arg) {
          newHistory.push({ type: "error", text: "cat: missing file operand" });
        } else {
          const target = arg.startsWith("/") ? arg : `${cwd}/${arg}`;
          const norm = normalizePath(target);
          const content = readFile(norm);
          if (content !== null) {
            newHistory.push({ type: "output", text: content });
          } else {
            newHistory.push({
              type: "error",
              text: `cat: ${arg}: No such file or directory`,
            });
          }
        }
      } else if (cmd === "open") {
        if (!arg) {
          newHistory.push({ type: "error", text: "open: specify an app name (e.g. files, projects, contact)" });
        } else {
          openWindow(arg);
          newHistory.push({ type: "output", text: `Launched ${arg}` });
        }
      } else if (cmd === "skills") {
        const s = profile.skills;
        newHistory.push({
          type: "output",
          text: `TECHNICAL SKILLS:
Frontend: ${s.frontend.join(", ")}
Backend:  ${s.backend.join(", ")}
DevOps:   ${s.devops.join(", ")}
AI/ML:    ${s.ai_ml.join(", ")}`,
        });
      } else if (cmd === "projects") {
        newHistory.push({
          type: "output",
          text: profile.projects
            .map((p) => `[${p.name}] - ${p.tagline}\n  ${p.description}\n  Repo: ${p.repo}`)
            .join("\n\n"),
        });
      } else if (cmd === "experience") {
        newHistory.push({
          type: "output",
          text: profile.experience
            .map((e) => `[${e.company}] ${e.role} (${e.period})\n  ${e.bullets.join("\n  ")}`)
            .join("\n\n"),
        });
      } else if (cmd === "theme") {
        const targetTheme = arg === "light" ? "light" : arg === "dark" ? "dark" : theme === "dark" ? "light" : "dark";
        setTheme(targetTheme);
        newHistory.push({ type: "output", text: `Theme switched to ${targetTheme}.` });
      } else if (cmd === "neofetch") {
        newHistory.push({
          type: "output",
          text: `
      .:/+++/-.          vishnu@vishnu-os
     /++////+++/         ----------------
    /+/     /+/          OS: VishnuOS v3.0 (GNOME 46 / Ubuntu based)
   /+/   +/  /+/         Host: Modern Web Architecture
  /+/   +++/  /+/        Kernel: 6.8.0-45-generic
 /+/   /++++/  /+/       Uptime: 42 mins
/+/     /++/    /+/      Packages: 12 apps, 1 vfs
/+++++++++++++++++/      Shell: bash 5.2.15
                         Resolution: 1920x1080
                         DE: GNOME Adwaita
                         WM: Adwaita Mutter
                         Theme: GNOME Dark [GTK3/4]
                         Icons: Yaru Olive
                         Terminal: VishnuOS Terminal
                         CPU: Full Stack / DevOps / AI-ML Core
                         Memory: 16GB / Optimal
`,
        });
      } else if (cmd === "sudo") {
        if (arg === "hire-me") {
          newHistory.push({
            type: "output",
            text: `[SUCCESS] User 'vishnu' is verified as an exceptional hire!
Sending interview invitation to: ${profile.identity.email}
GitHub: ${profile.identity.github}`,
          });
        } else {
          newHistory.push({
            type: "output",
            text: `[sudo] password for vishnu: ***\nPermission granted: You are now an administrator of VishnuOS.`,
          });
        }
      } else {
        newHistory.push({
          type: "error",
          text: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
        });
      }

      setHistory(newHistory);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && cmdHistoryIdx < cmdHistory.length - 1) {
        const nextIdx = cmdHistoryIdx + 1;
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIdx > 0) {
        const nextIdx = cmdHistoryIdx - 1;
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (cmdHistoryIdx === 0) {
        setCmdHistoryIdx(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Auto-complete commands
      const commands = ["help", "ls", "cd", "cat", "pwd", "whoami", "neofetch", "clear", "skills", "projects", "experience", "theme", "date", "uname", "open", "sudo"];
      const match = commands.find((c) => c.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#18181c] text-[#e2e8f0] font-mono text-xs p-4 overflow-y-auto select-text cursor-text leading-relaxed"
    >
      {history.map((item, idx) => (
        <div key={idx} className="mb-2 whitespace-pre-wrap break-words">
          {item.type === "input" ? (
            <div className="flex items-center gap-2">
              <span className="text-[#a3e635] font-semibold">vishnu@vishnu-os</span>
              <span className="text-white/40">:</span>
              <span className="text-[#38bdf8]">{item.dir.replace("/home/vishnu", "~")}</span>
              <span className="text-white/60">$</span>
              <span className="text-white font-medium">{item.text}</span>
            </div>
          ) : item.type === "error" ? (
            <div className="text-red-400">{item.text}</div>
          ) : (
            <div className="text-[#cbd5e1]">{item.text}</div>
          )}
        </div>
      ))}

      {/* Active Prompt Line */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[#a3e635] font-semibold">vishnu@vishnu-os</span>
        <span className="text-white/40">:</span>
        <span className="text-[#38bdf8]">{cwd.replace("/home/vishnu", "~")}</span>
        <span className="text-white/60">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white focus:outline-none font-mono"
        />
      </div>
    </div>
  );
};
