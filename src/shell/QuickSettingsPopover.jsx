import { useState } from "react";
import { QuickSettingsTile } from "../components/primitives/QuickSettingsTile";
import { Slider } from "../components/primitives/Slider";
import {
  Wifi,
  Bluetooth,
  Zap,
  Moon,
  Sun,
  BellOff,
  Keyboard,
  Plane,
  Coffee,
  Share2,
  Battery,
  Camera,
  Settings as SettingsIcon,
  Lock,
  Power,
  Headphones,
} from "lucide-react";
import { useSettingsStore } from "../store/settingsStore";
import { useWindowStore } from "../store/windowStore";

export const QuickSettingsPopover = ({ onClose }) => {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const nightLight = useSettingsStore((s) => s.nightLight);
  const setNightLight = useSettingsStore((s) => s.setNightLight);

  const openWindow = useWindowStore((s) => s.openWindow);

  const [volume, setVolume] = useState(80);
  const [wifiActive, setWifiActive] = useState(true);
  const [bluetoothActive, setBluetoothActive] = useState(false);
  const [dndActive, setDndActive] = useState(false);
  const [airplaneActive, setAirplaneActive] = useState(false);
  const [caffeineActive, setCaffeineActive] = useState(false);
  const [powerMode, setPowerMode] = useState("Balanced");

  const toggleCaffeine = async () => {
    const next = !caffeineActive;
    setCaffeineActive(next);
    if ("wakeLock" in navigator && next) {
      try {
        await navigator.wakeLock.request("screen");
      } catch {
        // wakeLock might be restricted in some browsers
      }
    }
  };

  return (
    <div
      className="fixed z-[1200] text-white shadow-2xl border border-white/10 p-5 overflow-hidden flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: "1512px",
        top: "38px",
        width: "402px",
        height: "476px",
        borderRadius: "22px",
        backgroundColor: "#36363a",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Top Row: Battery pill + Action buttons (R4) ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-[#54545a] px-3 py-1.5 rounded-full text-xs font-semibold">
          <Battery className="w-4 h-4 text-emerald-400" />
          <span>79%</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Screenshot captured to /home/vishnu/Pictures")}
            className="w-8 h-8 rounded-full bg-[#54545a] hover:bg-[#66666d] flex items-center justify-center transition-colors text-white/90"
            title="Take Screenshot"
            aria-label="Take Screenshot"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              openWindow("settings");
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#54545a] hover:bg-[#66666d] flex items-center justify-center transition-colors text-white/90"
            title="Open Settings"
            aria-label="Open Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert("Session Locked. Click anywhere to return.")}
            className="w-8 h-8 rounded-full bg-[#54545a] hover:bg-[#66666d] flex items-center justify-center transition-colors text-white/90"
            title="Lock Desktop"
            aria-label="Lock Desktop"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm("Restart VishnuOS?")) {
                window.location.reload();
              }
            }}
            className="w-8 h-8 rounded-full bg-[#54545a] hover:bg-[#e03131] flex items-center justify-center transition-colors text-white/90"
            title="Power / Restart"
            aria-label="Power / Restart"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Volume Slider with Headphone Icon (R4) ── */}
      <Slider
        value={volume}
        onChange={setVolume}
        iconLeft={<Headphones className="w-4 h-4" />}
        ariaLabel="Output Volume"
      />

      {/* ── Two-Column Action Tiles Grid (R4) ── */}
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
        {/* 1. Wi-Fi (Active) */}
        <QuickSettingsTile
          icon={<Wifi className="w-5 h-5" />}
          title="Wi-Fi"
          subtitle={wifiActive ? "Vishnu_Fiber_5G" : "Turned Off"}
          active={wifiActive}
          onClick={() => setWifiActive(!wifiActive)}
          onSubmenuClick={() => alert("Wi-Fi Networks: Vishnu_Fiber_5G (Connected)")}
        />

        {/* 2. Bluetooth */}
        <QuickSettingsTile
          icon={<Bluetooth className="w-5 h-5" />}
          title="Bluetooth"
          subtitle={bluetoothActive ? "Active" : "Off"}
          active={bluetoothActive}
          onClick={() => setBluetoothActive(!bluetoothActive)}
        />

        {/* 3. Power Mode */}
        <QuickSettingsTile
          icon={<Zap className="w-5 h-5" />}
          title="Power Mode"
          subtitle={powerMode}
          active={powerMode === "Performance"}
          onClick={() =>
            setPowerMode(powerMode === "Balanced" ? "Performance" : "Balanced")
          }
        />

        {/* 4. Night Light */}
        <QuickSettingsTile
          icon={<Sun className="w-5 h-5" />}
          title="Night Light"
          subtitle={nightLight ? "Active" : "Off"}
          active={nightLight}
          onClick={() => setNightLight(!nightLight)}
        />

        {/* 5. Dark Style (Active in R4) */}
        <QuickSettingsTile
          icon={<Moon className="w-5 h-5" />}
          title="Dark Style"
          subtitle={theme === "dark" ? "On" : "Off"}
          active={theme === "dark"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />

        {/* 6. Do Not Disturb */}
        <QuickSettingsTile
          icon={<BellOff className="w-5 h-5" />}
          title="Do Not Disturb"
          subtitle={dndActive ? "On" : "Off"}
          active={dndActive}
          onClick={() => setDndActive(!dndActive)}
        />

        {/* 7. Keyboard */}
        <QuickSettingsTile
          icon={<Keyboard className="w-5 h-5" />}
          title="Keyboard"
          subtitle="en (US)"
          active={false}
          onClick={() => {}}
        />

        {/* 8. Airplane Mode */}
        <QuickSettingsTile
          icon={<Plane className="w-5 h-5" />}
          title="Airplane Mode"
          subtitle={airplaneActive ? "On" : "Off"}
          active={airplaneActive}
          onClick={() => setAirplaneActive(!airplaneActive)}
        />

        {/* 9. Caffeine */}
        <QuickSettingsTile
          icon={<Coffee className="w-5 h-5" />}
          title="Caffeine"
          subtitle={caffeineActive ? "Awake" : "Off"}
          active={caffeineActive}
          onClick={toggleCaffeine}
        />

        {/* 10. GSConnect -> Connect With Me (Active in R4) */}
        <QuickSettingsTile
          icon={<Share2 className="w-5 h-5" />}
          title="Connect with Me"
          subtitle="Email & Links"
          active={true}
          onClick={() => {
            openWindow("contact");
            onClose();
          }}
        />
      </div>
    </div>
  );
};
