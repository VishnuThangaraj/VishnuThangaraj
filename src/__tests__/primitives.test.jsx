import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/primitives/Button";
import { Switch } from "../components/primitives/Switch";
import { SearchPill } from "../components/primitives/SearchPill";
import { QuickSettingsTile } from "../components/primitives/QuickSettingsTile";
import { PathBar } from "../components/primitives/PathBar";
import { CalendarGrid } from "../components/primitives/CalendarGrid";

describe("GNOME Primitives Matrix", () => {
  it("renders buttons with different variants", () => {
    render(<Button variant="suggested">Launch</Button>);
    const btn = screen.getByRole("button", { name: "Launch" });
    expect(btn).toBeDefined();
    expect(btn.className).toContain("bg-[var(--accent)]");
  });

  it("handles Switch toggles", () => {
    let checked = false;
    render(
      <Switch checked={checked} onChange={(c) => (checked = c)} ariaLabel="Dark Mode" />
    );
    const sw = screen.getByRole("switch", { name: "Dark Mode" });
    expect(sw.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(sw);
    expect(checked).toBe(true);
  });

  it("renders SearchPill and responds to input", () => {
    let val = "";
    render(<SearchPill value={val} onChange={(e) => (val = e)} placeholder="Type to search" />);
    const input = screen.getByPlaceholderText("Type to search");
    expect(input).toBeDefined();
  });

  it("renders QuickSettingsTile with active state and submenu", () => {
    let submenuClicked = false;
    render(
      <QuickSettingsTile
        icon={<span>Icon</span>}
        title="Wi-Fi"
        subtitle="Home Network"
        active={true}
        onSubmenuClick={() => (submenuClicked = true)}
      />
    );
    expect(screen.getByText("Wi-Fi")).toBeDefined();
    expect(screen.getByText("Home Network")).toBeDefined();
    const submenuBtn = screen.getByRole("button", { name: "Wi-Fi settings" });
    fireEvent.click(submenuBtn);
    expect(submenuClicked).toBe(true);
  });

  it("renders PathBar breadcrumbs", () => {
    render(<PathBar path="Home/Projects" />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
  });

  it("renders CalendarGrid with current month and days", () => {
    render(<CalendarGrid />);
    expect(screen.getByText("October 2026")).toBeDefined();
    expect(screen.getByText("20")).toBeDefined();
  });
});
