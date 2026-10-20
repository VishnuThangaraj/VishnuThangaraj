import { useState } from "react";
import { Button } from "./Button";
import { Switch } from "./Switch";
import { Slider } from "./Slider";
import { SearchPill } from "./SearchPill";
import { QuickSettingsTile } from "./QuickSettingsTile";
import { PathBar } from "./PathBar";
import { CalendarGrid } from "./CalendarGrid";
import { FolderIcon, ShowAppsIcon, WindowControlButtons, NetworkSpeedIcon } from "../icons/GnomeIcons";
import { Wifi, Volume2, Moon, Sun, Battery } from "lucide-react";
import { useSettingsStore } from "../../store/settingsStore";

export const DevGallery = () => {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const [switchState, setSwitchState] = useState(true);
  const [sliderVal, setSliderVal] = useState(70);
  const [searchVal, setSearchVal] = useState("");
  const [tileActive, setTileActive] = useState(true);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">VishnuOS Design System Component Gallery</h1>
            <p className="text-sm text-white/60">Reference-Fidelity GNOME Adwaita Primitives Matrix</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm flex items-center gap-2"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Theme: {theme}</span>
            </button>
          </div>
        </header>

        {/* 1. Buttons */}
        <section className="space-y-3 bg-[#2d2d2d] p-5 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold text-white/90">1. Buttons (Flat, Suggested, Destructive, Pill)</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="flat">Flat Button</Button>
            <Button variant="suggested">Suggested Action</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="pill">Pill Button</Button>
            <Button variant="flat" disabled>Disabled</Button>
            <WindowControlButtons onMinimize={() => {}} onMaximize={() => {}} onClose={() => {}} />
          </div>
        </section>

        {/* 2. Controls: Switch, Slider, Search */}
        <section className="space-y-4 bg-[#2d2d2d] p-5 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold text-white/90">2. Inputs & Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm">GNOME Switch:</span>
              <Switch checked={switchState} onChange={setSwitchState} />
              <Switch checked={false} onChange={() => {}} />
            </div>
            <div>
              <span className="text-sm block mb-1">Volume Slider:</span>
              <Slider
                value={sliderVal}
                onChange={setSliderVal}
                iconLeft={<Volume2 className="w-4 h-4" />}
              />
            </div>
            <div className="md:col-span-2">
              <span className="text-sm block mb-1">Search Pill (370×36px):</span>
              <SearchPill value={searchVal} onChange={setSearchVal} onClear={() => setSearchVal("")} />
            </div>
          </div>
        </section>

        {/* 3. Quick Settings Tiles */}
        <section className="space-y-3 bg-[#2d2d2d] p-5 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold text-white/90">3. Quick Settings Tiles (R4)</h2>
          <div className="flex flex-wrap gap-4">
            <QuickSettingsTile
              icon={<Wifi className="w-5 h-5" />}
              title="Wi-Fi"
              subtitle="Connected"
              active={tileActive}
              onClick={() => setTileActive(!tileActive)}
              onSubmenuClick={() => alert("Wi-Fi network list")}
            />
            <QuickSettingsTile
              icon={<Moon className="w-5 h-5" />}
              title="Dark Style"
              active={theme === "dark"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <QuickSettingsTile
              icon={<Battery className="w-5 h-5" />}
              title="Power Mode"
              subtitle="Balanced"
              active={false}
              onClick={() => {}}
            />
          </div>
        </section>

        {/* 4. Icons & Folder Emblems */}
        <section className="space-y-3 bg-[#2d2d2d] p-5 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold text-white/90">4. Icons, Emblems & Status</h2>
          <div className="flex items-center gap-6">
            <FolderIcon size={56} />
            <FolderIcon size={56} emblem="shortcut" />
            <FolderIcon size={56} emblem="download" />
            <FolderIcon size={56} emblem="music" />
            <FolderIcon size={56} emblem="person" />
            <ShowAppsIcon size={48} />
            <ShowAppsIcon size={48} active={true} />
            <div className="flex items-center gap-1 bg-[#36363a] px-3 py-1 rounded-full text-xs">
              <NetworkSpeedIcon />
              <span>8.8 KB/s</span>
            </div>
            <PathBar path="Home/Projects/IronParadise" />
          </div>
        </section>

        {/* 5. Calendar Grid (R3) */}
        <section className="space-y-3 bg-[#2d2d2d] p-5 rounded-2xl border border-white/5 max-w-sm">
          <h2 className="text-lg font-semibold text-white/90">5. Calendar Grid (R3)</h2>
          <CalendarGrid onSelectDate={(d) => console.log(d)} />
        </section>
      </div>
    </div>
  );
};
