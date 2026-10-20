import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopBar } from "../shell/TopBar";
import { Dock } from "../shell/Dock";
import { WindowFrame } from "../shell/WindowFrame";
import { ClassicView } from "../classic/ClassicView";
import { useSettingsStore } from "../store/settingsStore";

describe("Accessibility and Semantics (Phase 6.2 & 6.3)", () => {
  it("renders TopBar with valid landmark role and accessible buttons", () => {
    render(<TopBar />);
    const banner = screen.getByRole("banner");
    expect(banner).toBeDefined();

    const placesBtn = screen.getByRole("button", { name: /Places/i });
    expect(placesBtn.getAttribute("aria-haspopup")).toBe("true");
  });

  it("renders Dock as an accessible toolbar", () => {
    render(<Dock />);
    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toBeDefined();
    expect(toolbar.getAttribute("aria-label")).toBe("Application Dock");
  });

  it("renders WindowFrame with role dialog and title as accessible label", () => {
    const mockWindow = {
      id: "win-test",
      title: "Projects Browser",
      icon: "Globe",
      bounds: { x: 100, y: 100, width: 600, height: 400 },
      isMaximized: false,
      isMinimized: false,
      focused: true,
      zIndex: 101,
    };

    render(
      <WindowFrame window={mockWindow}>
        <div>Test Content</div>
      </WindowFrame>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute("aria-label")).toBe("Projects Browser");

    // Traffic light buttons accessible names
    expect(screen.getByRole("button", { name: /Close window/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Minimize window/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Maximize window/i })).toBeDefined();
  });

  it("provides an accessible skip link in Classic View", () => {
    render(<ClassicView />);
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeDefined();
    expect(skipLink.getAttribute("href")).toBe("#main-content");
  });

  it("respects reduced-motion setting in store", () => {
    const s = useSettingsStore.getState();
    s.setReducedMotion(true);
    expect(useSettingsStore.getState().reducedMotion).toBe(true);

    s.setReducedMotion(false);
    expect(useSettingsStore.getState().reducedMotion).toBe(false);
  });
});
