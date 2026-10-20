import { useState, useRef, useEffect } from "react";
import { profile, terminalCommands } from "../data/profile";
import { useSettingsStore } from "../store/settingsStore";

const WELCOME_BANNER = `Welcome to VishnuOS v2.0 Terminal (bash 5.2)
Type 'help' for a list of available commands, or 'neofetch' for system info.
`;

const COMMAND_LIST = [
  "help",
  "whoami",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
  "neofetch",
  "clear",
  "theme",
  "date",
  "uptime",
  "sudo hire-me",
];

export const TerminalApp = () => {
  const [history, setHistory] = useState([
    { type: "output", text: WELCOME_BANNER },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const setTheme = useSettingsStore((s) => s.setTheme);
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = inputVal.trim();
      if (!raw) return;

      const newHistory = [...history, { type: "input", text: raw }];
      setCmdHistory((prev) => [raw, ...prev]);
      setCmdHistoryIdx(-1);

      const parts = raw.split(" ");
      const cmd = parts[0].toLowerCase();

      if (cmd === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      }

      if (cmd === "theme") {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        newHistory.push({
          type: "output",
          text: `Switched theme to ${next}.`,
        });
      } else if (terminalCommands[raw]) {
        const out = terminalCommands[raw]();
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "skills") {
        const out = terminalCommands["cat skills.txt"]();
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "projects") {
        const out = profile.projects
          .map(
            (p) =>
              `• ${p.name} — ${p.tagline}\n  Stack: ${p.tech.join(", ")}\n  Repo: ${p.repo}`
          )
          .join("\n\n");
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "experience") {
        const out = profile.experience
          .map(
            (e) =>
              `• ${e.company} — ${e.role} (${e.period})\n  Stack: ${e.tech.join(", ")}`
          )
          .join("\n\n");
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "education") {
        const out = terminalCommands["cat education.txt"]();
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "contact") {
        const out = terminalCommands["cat contact.json"]();
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "fastfetch") {
        const out = terminalCommands["neofetch"]();
        newHistory.push({ type: "output", text: out });
      } else if (cmd === "sudo") {
        if (raw.includes("hire-me")) {
          const out = terminalCommands["sudo hire-me"]();
          newHistory.push({ type: "output", text: out });
        } else {
          newHistory.push({
            type: "output",
            text: `[sudo] user 'recruiter' is not in the sudoers file. This incident will be reported. Try 'sudo hire-me'.`,
          });
        }
      } else {
        newHistory.push({
          type: "error",
          text: `bash: command not found: ${raw}. Type 'help' to see valid commands.`,
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
      const current = inputVal.toLowerCase();
      const match = COMMAND_LIST.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full min-h-[420px] bg-[#0c1015] text-green-400 font-mono text-xs p-4 overflow-y-auto select-text leading-relaxed"
    >
      {history.map((item, idx) => (
        <div key={idx} className="mb-2 whitespace-pre-wrap">
          {item.type === "input" ? (
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-amber-400 font-semibold">vishnu@vishnu-os:~$</span>
              <span className="text-white">{item.text}</span>
            </div>
          ) : (
            <div
              className={
                item.type === "error"
                  ? "text-red-400"
                  : "text-gray-200"
              }
            >
              {item.text}
            </div>
          )}
        </div>
      ))}

      {/* Active Input Line */}
      <div className="flex items-center gap-2">
        <span className="text-amber-400 font-semibold select-none">
          vishnu@vishnu-os:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono text-xs focus:ring-0"
        />
      </div>
    </div>
  );
};
