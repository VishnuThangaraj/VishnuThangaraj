import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { useWindowStore } from "../store/windowStore";

const DESKTOP_ITEMS = [
  {
    id: "about",
    appId: "about",
    icon: "User",
    label: "Home",
    color: "#60a5fa",
    isShortcut: false,
  },
  {
    id: "ironparadise",
    appId: "projects",
    params: { itemId: "ironparadise" },
    icon: "Dumbbell",
    label: "IronParadise",
    color: "#f87171",
    isShortcut: true,
  },
  {
    id: "shnoor",
    appId: "experience",
    params: { itemId: "shnoor" },
    icon: "Briefcase",
    label: "SHNOOR Intl",
    color: "#fbbf24",
    isShortcut: true,
  },
  {
    id: "fizztype",
    appId: "projects",
    params: { itemId: "fizztype" },
    icon: "Keyboard",
    label: "FizzType",
    color: "#c084fc",
    isShortcut: true,
  },
  {
    id: "iict",
    appId: "experience",
    params: { itemId: "iict" },
    icon: "Activity",
    label: "IICT AI/ML",
    color: "#34d399",
    isShortcut: true,
  },
  {
    id: "terminal",
    appId: "terminal",
    icon: "Terminal",
    label: "Terminal",
    color: "#e2e8f0",
    isShortcut: false,
  },
  {
    id: "stack",
    appId: "stack",
    icon: "Layers",
    label: "Stack",
    color: "#2dd4bf",
    isShortcut: false,
  },
  {
    id: "resume",
    appId: "resume",
    icon: "FileText",
    label: "Resume",
    color: "#fb7185",
    isShortcut: false,
  },
];

export const DesktopIconGrid = ({ onOpenContextMenu }) => {
  const [selectedId, setSelectedId] = useState(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  const handleOpen = (item) => {
    openWindow(item.appId, item.params);
  };

  return (
    <div
      className="absolute top-12 left-4 flex flex-col flex-wrap gap-2 max-h-[calc(100vh-140px)] select-none z-10"
      onClick={() => setSelectedId(null)}
    >
      {DESKTOP_ITEMS.map((item) => (
        <DesktopIcon
          key={item.id}
          icon={item.icon}
          label={item.label}
          color={item.color}
          isShortcut={item.isShortcut}
          isSelected={selectedId === item.id}
          onSelect={() => setSelectedId(item.id)}
          onOpen={() => handleOpen(item)}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedId(item.id);
            if (onOpenContextMenu) {
              onOpenContextMenu(e, "icon", item);
            }
          }}
        />
      ))}
    </div>
  );
};
