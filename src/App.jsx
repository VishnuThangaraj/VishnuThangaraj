import { useEffect } from "react";
import { Desktop } from "./shell/Desktop";
import { PhoneMode } from "./mobile/PhoneMode";
import { ClassicView } from "./classic/ClassicView";
import { useSettingsStore, applyDOMAttributes } from "./store/settingsStore";
import { useWindowStore } from "./store/windowStore";

const App = () => {
  const mode = useSettingsStore((s) => s.mode);
  const setMode = useSettingsStore((s) => s.setMode);
  const openWindow = useWindowStore((s) => s.openWindow);

  // Sync mode with screen size and initial hash
  useEffect(() => {
    // 1. Check window hash for mode or deep link
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();

      if (hash === "#classic" || hash === "#/classic" || hash.includes("mode=classic")) {
        setMode("classic");
      } else if (hash.startsWith("#/")) {
        const parts = hash.replace("#/", "").split("/");
        const appId = parts[0];
        const itemId = parts[1];

        if (appId) {
          openWindow(appId, itemId ? { itemId } : {});
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    // 2. Responsive mobile width detection (Task 5.1)
    const checkWidth = () => {
      if (window.innerWidth < 768 && mode === "desktop") {
        setMode("phone");
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("resize", checkWidth);
    };
  }, [mode, setMode, openWindow]);

  // Initial sync of DOM attributes (themes, accents, tiers)
  useEffect(() => {
    applyDOMAttributes(useSettingsStore.getState());
  }, []);

  if (mode === "phone") {
    return <PhoneMode />;
  }

  if (mode === "classic") {
    return <ClassicView />;
  }

  return <Desktop />;
};

export default App;
