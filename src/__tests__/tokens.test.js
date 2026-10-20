import { describe, it, expect } from "vitest";
import { ACCENTS, GLASS_TIERS, SPRINGS, LAYOUT } from "../theme/tokens";
import { profile } from "../data/profile";
import { wallpapers } from "../data/wallpapers";

describe("Design Tokens & Themes", () => {
  it("defines all required accent colors with contrast compliant properties", () => {
    expect(ACCENTS.amber).toBeDefined();
    expect(ACCENTS.emerald).toBeDefined();
    expect(ACCENTS.teal).toBeDefined();
    expect(ACCENTS.blue).toBeDefined();
    expect(ACCENTS.purple).toBeDefined();
    expect(ACCENTS.rose).toBeDefined();

    expect(ACCENTS.amber.primary).toBe("#f59e0b");
  });

  it("defines all three tiered glass specifications", () => {
    expect(GLASS_TIERS.t0).toBeDefined();
    expect(GLASS_TIERS.t1).toBeDefined();
    expect(GLASS_TIERS.t2).toBeDefined();
  });

  it("defines spring physics constants for motion", () => {
    expect(SPRINGS.dock.stiffness).toBeGreaterThan(0);
    expect(SPRINGS.window.damping).toBeGreaterThan(0);
  });

  it("defines layout dimensions", () => {
    expect(LAYOUT.topbarHeight).toBe(32);
    expect(LAYOUT.dockHeight).toBe(84);
  });
});

describe("Profile Data Model Validation", () => {
  it("contains complete identity information", () => {
    expect(profile.identity.name).toBe("Vishnu Thangaraj");
    expect(profile.identity.title).toContain("Full Stack");
    expect(profile.identity.github).toContain("github.com");
    expect(profile.identity.location).toBeDefined();
  });

  it("contains required work experience roles and tech tags", () => {
    expect(profile.experience.length).toBeGreaterThanOrEqual(2);
    const shnoor = profile.experience.find((e) => e.company.includes("SHNOOR"));
    const iict = profile.experience.find((e) => e.company.includes("IICT"));

    expect(shnoor).toBeDefined();
    expect(shnoor.tech).toContain("Docker");
    expect(shnoor.tech).toContain("Jenkins");

    expect(iict).toBeDefined();
    expect(iict.tech).toContain("Python");
  });

  it("contains IronParadise and FizzType projects", () => {
    const ironParadise = profile.projects.find((p) => p.name === "IronParadise");
    const fizzType = profile.projects.find((p) => p.name === "FizzType");

    expect(ironParadise).toBeDefined();
    expect(ironParadise.bullets.length).toBeGreaterThan(0);
    expect(ironParadise.tech).toContain("React");

    expect(fizzType).toBeDefined();
    expect(fizzType.bullets.length).toBeGreaterThan(0);
  });

  it("contains categorized skills", () => {
    const categories = Object.keys(profile.skills);
    expect(categories).toContain("Languages");
    expect(categories).toContain("Frameworks");
    expect(categories).toContain("Databases");
    expect(categories).toContain("Cloud & DevOps");
    expect(categories).toContain("Tools");
    expect(categories).toContain("Concepts");

    expect(profile.skills.Languages).toContain("Python");
    expect(profile.skills.Languages).toContain("TypeScript");
    expect(profile.skills.Tools).toContain("Bruno");
  });

  it("contains academic education and honors", () => {
    expect(profile.education.length).toBeGreaterThanOrEqual(2);
    const msc = profile.education.find((e) => e.degree.includes("Master"));
    expect(msc.cgpa).toBe("9.5");

    expect(profile.honors.length).toBeGreaterThanOrEqual(3);
  });

  it("defines wallpapers including Mountain Dusk", () => {
    expect(wallpapers.length).toBeGreaterThan(0);
    const dusk = wallpapers.find((w) => w.id === "mountain-dusk");
    expect(dusk).toBeDefined();
  });
});
