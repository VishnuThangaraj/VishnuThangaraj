import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { useWindowStore } from "../store/windowStore";

const DESKTOP_ITEMS = [
  {
    id: "home",
    appId: "about",
    label: "Home",
    isFolder: true,
    isShortcut: false,
    emblem: null,
  },
  {
    id: "ironparadise",
    appId: "projects",
    params: { itemId: "ironparadise" },
    label: "IronParadise",
    isFolder: true,
    isShortcut: true,
    emblem: "shortcut",
  },
  {
    id: "shnoor",
    appId: "experience",
    params: { itemId: "shnoor" },
    label: "Shnoor International Systems",
    isFolder: true,
    isShortcut: true,
    emblem: "shortcut",
  },
  {
    id: "trash",
    appId: "trash",
    icon: "Trash2",
    label: "Trash",
    isFolder: false,
    color: "#a1a1aa",
    isShortcut: false,
  },
];

export const DesktopIconGrid = ({ onOpenContextMenu }) => {
  const [selectedId, setSelectedId] = useState(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  const handleOpen = (item) => {
    openWindow(item.appId, item.params || {});
  };

  return (
    <div
      className="absolute z-10 select-none flex flex-col gap-4"
      style={{
        left: "20px",
        top: "48px",
        width: "96px",
      }}
      onClick={() => setSelectedId(null)}
    >
      {DESKTOP_ITEMS.map((item) => (
        <div key={item.id} style={{ minHeight: "108px" }}>
          <DesktopIcon
            icon={item.icon}
            label={item.label}
            isFolder={item.isFolder}
            isShortcut={item.isShortcut}
            emblem={item.emblem}
            color={item.color}
            isSelected={selectedId === item.id}
            onSelect={() => setSelectedId(item.id)}
            onOpen={() => handleOpen(item)}
            onContextMenu={(e) => {
              if (onOpenContextMenu) {
                onOpenContextMenu(e, "desktop-icon", item);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};
