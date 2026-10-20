import { useState } from "react";
import { profile } from "../data/profile";
import { Mail, Copy, Check, Send, ExternalLink } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "../components/AppIcon";

export const ContactApp = () => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const email = profile.identity.email || "vishnu.thangaraj.dev@gmail.com";
  const github = profile.identity.github;
  const linkedin = profile.identity.linkedin;

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject || "Portfolio Inquiry — Recruiter / Hiring Team"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="flex flex-col h-full min-h-[440px] p-6 overflow-y-auto select-text space-y-6">
      {/* Header Info */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-amber-400" />
          <span>Contact Vishnu Thangaraj</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Feel free to reach out directly for full stack, DevOps, or AI/ML roles.
        </p>
      </div>

      {/* Direct Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Email */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Email Address
            </div>
            <div className="text-xs font-mono text-white mt-1 truncate" title={email}>
              {email}
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(email, "email")}
            className="mt-3 py-1.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedKey === "email" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* GitHub */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              GitHub Profile
            </div>
            <div className="text-xs font-mono text-white mt-1 truncate">
              {github}
            </div>
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Open GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* LinkedIn */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              LinkedIn
            </div>
            <div className="text-xs font-mono text-white mt-1 truncate">
              {linkedin}
            </div>
          </div>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>Open LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Quick Message Form */}
      <form onSubmit={handleSendMail} className="space-y-3 pt-2">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
          Quick Message Composer (Opens default mail client)
        </h2>

        <div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject (e.g. Opportunity at SHNOOR / Tech Lead)"
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>

        <div>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Vishnu, we came across your VishnuOS portfolio and would like to discuss..."
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-amber-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Launch Mail Client</span>
        </button>
      </form>
    </div>
  );
};
