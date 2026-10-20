import { useState } from "react";
import {
  Folder,
  Home,
  Clock,
  Star,
  Globe,
  Trash2,
  FileText,
  Music,
  Image,
  Video,
  Download,
  HardDrive,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Search,
  MoreVertical,
} from "lucide-react";
import { FolderIcon } from "../components/icons/GnomeIcons";
import { PathBar } from "../components/primitives/PathBar";
import { listDirectory } from "../data/vfs";
import { useWindowStore } from "../store/windowStore";

const SIDEBAR_ITEMS = [
  { id: "home", label: "Home", path: "/home/vishnu", icon: Home },
  { id: "recent", label: "Recent", path: "/home/vishnu/Documents", icon: Clock },
  { id: "starred", label: "Starred", path: "/home/vishnu/Projects", icon: Star },
  { id: "network", label: "Network", path: "/home/vishnu/Contact", icon: Globe },
  { id: "trash", label: "Trash", path: "/home/vishnu/Desktop", icon: Trash2 },
  { divider: true },
  { id: "docs", label: "Documents", path: "/home/vishnu/Documents", icon: FileText },
  { id: "music", label: "Music", path: "/home/vishnu/Skills", icon: Music },
  { id: "pictures", label: "Pictures", path: "/home/vishnu/Projects", icon: Image },
  { id: "videos", label: "Videos", path: "/home/vishnu/Education", icon: Video },
  { id: "downloads", label: "Downloads", path: "/home/vishnu/Documents", icon: Download },
  { id: "storage", label: "Storage Disk", path: "/home/vishnu", icon: HardDrive },
  { id: "workspace", label: "Workspace", path: "/home/vishnu/Projects", icon: Briefcase },
];

export const FilesApp = ({ params = {} }) => {
  const [currentPath, setCurrentPath] = useState(params.initialPath || "/home/vishnu");
  const [history, setHistory] = useState([params.initialPath || "/home/vishnu"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState("");

  const openWindow = useWindowStore((s) => s.openWindow);

  const navigateTo = (path) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(path);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setCurrentPath(path);
    setSelectedItem(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedItem(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedItem(null);
    }
  };

  const items = listDirectory(currentPath) || [];
  const filteredItems = searchQuery
    ? items.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const handleItemDoubleClick = (item) => {
    if (item.type === "dir") {
      navigateTo(item.path);
    } else if (item.app) {
      openWindow(item.app, { filePath: item.path });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1d1d20] text-white select-none">
      {/* ── Files Integrated Split Header Bar (R5) ── */}
      <div className="h-11 border-b border-white/10 flex items-center bg-[#29292d]">
        {/* Left Header: Search, 'Files', Kebab menu (R5) */}
        <div className="w-[177px] px-3.5 flex items-center justify-between border-r border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white/90">Files</span>
          </div>
          <button className="p-1 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Header: Back/Forward, PathBar pill, View toggle (R5) */}
        <div className="flex-1 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back / Forward */}
            <div className="flex items-center gap-1">
              <button
                onClick={goBack}
                disabled={historyIndex === 0}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Back"
                aria-label="Back"
              >
                <ChevronLeft className="w-4 h-4 text-white/80" />
              </button>
              <button
                onClick={goForward}
                disabled={historyIndex >= history.length - 1}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Forward"
                aria-label="Forward"
              >
                <ChevronRight className="w-4 h-4 text-white/80" />
              </button>
            </div>

            {/* PathBar Breadcrumb Pill (R5) */}
            <PathBar
              path={currentPath.replace("/home/vishnu", "Home")}
              onSelect={() => navigateTo("/home/vishnu")}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <div className="flex items-center bg-black/20 px-2 py-1 rounded-lg border border-white/10">
              <Search className="w-3.5 h-3.5 text-white/50 mr-1.5" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none w-24 focus:w-36 transition-all"
              />
            </div>

            {/* List / Grid Toggle */}
            <div className="flex items-center bg-black/20 p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded ${viewMode === "grid" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"}`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${viewMode === "list" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"}`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Body: Sidebar + File Grid ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (~177px, #393939) */}
        <div className="w-[177px] bg-[#393939] p-2 flex flex-col gap-0.5 overflow-y-auto border-r border-white/5 text-xs">
          {SIDEBAR_ITEMS.map((item, idx) => {
            if (item.divider) {
              return <div key={`div-${idx}`} className="my-1.5 border-t border-white/10" />;
            }
            const Icon = item.icon;
            const isSelected = currentPath === item.path;

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.path)}
                className={`w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 text-left transition-colors duration-100 ${
                  isSelected
                    ? "bg-[#4d4d52] text-white font-medium shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[var(--accent)]" : "text-white/70"}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content View: 4-Column Icon Grid (R5) */}
        <div
          className="flex-1 bg-[#1d1d20] p-6 overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                const isSelected = selectedItem === item.name;
                const isDir = item.type === "dir";

                return (
                  <div
                    key={item.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item.name);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleItemDoubleClick(item);
                    }}
                    className={`flex flex-col items-center justify-start p-3 rounded-xl cursor-pointer transition-colors select-none ${
                      isSelected
                        ? "bg-[var(--accent)]/35 ring-1 ring-[var(--accent)] text-white"
                        : "hover:bg-white/10 text-white/90"
                    }`}
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-1">
                      {isDir ? (
                        <FolderIcon
                          size={56}
                          emblem={
                            item.name === "IronParadise"
                              ? "shortcut"
                              : item.name === "Downloads"
                              ? "download"
                              : item.name === "Skills"
                              ? "music"
                              : null
                          }
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow">
                          <FileText className="w-6 h-6 text-white/80" />
                        </div>
                      )}
                    </div>
                    <span
                      className="text-xs font-normal text-center truncate max-w-full px-1"
                      title={item.name}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <div
                  key={item.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item.name);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleItemDoubleClick(item);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer ${
                    selectedItem === item.name
                      ? "bg-[var(--accent)]/35 text-white"
                      : "hover:bg-white/10 text-white/90"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.type === "dir" ? (
                      <Folder className="w-4 h-4 text-blue-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-white/70" />
                    )}
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[11px] text-white/40">
                    {item.type === "dir" ? "Folder" : item.mime || "Document"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="h-48 flex items-center justify-center text-white/40 text-sm">
              Folder is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
