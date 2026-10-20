import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClassicView } from "../classic/ClassicView";
import { AboutApp } from "../apps/AboutApp";
import { ExperienceApp } from "../apps/ExperienceApp";
import { ProjectsApp } from "../apps/ProjectsApp";
import { StackApp } from "../apps/StackApp";
import { NotesApp } from "../apps/NotesApp";
import { ContactApp } from "../apps/ContactApp";
import { ResumeApp } from "../apps/ResumeApp";
import { PhoneMode } from "../mobile/PhoneMode";
import { profile } from "../data/profile";

describe("Content Parity Test Across Modes (Task 5.6)", () => {
  it("renders all profile data in Classic View", () => {
    render(<ClassicView />);

    // Identity
    expect(screen.getAllByText(profile.identity.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(profile.identity.title).length).toBeGreaterThan(0);

    // Experience
    expect(screen.getByText("SHNOOR International")).toBeDefined();
    expect(screen.getByText("IICT")).toBeDefined();

    // Projects
    expect(screen.getByText("IronParadise")).toBeDefined();
    expect(screen.getByText("FizzType")).toBeDefined();

    // Education
    expect(screen.getByText(/Master of Science — Data Science/i)).toBeDefined();
    expect(screen.getByText(/Bachelor of Computer Applications/i)).toBeDefined();

    // Honors
    expect(screen.getByText(/KPRCAS Proficiency Award/i)).toBeDefined();
  });

  it("renders correct data in AboutApp", () => {
    render(<AboutApp />);
    expect(screen.getByText(profile.identity.name)).toBeDefined();
    expect(screen.getByText(profile.identity.title)).toBeDefined();
    expect(screen.getByText(profile.identity.summary)).toBeDefined();
  });

  it("renders both roles in ExperienceApp", () => {
    render(<ExperienceApp params={{ itemId: "shnoor" }} />);
    expect(screen.getAllByText("SHNOOR International").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Software Engineer Intern").length).toBeGreaterThan(0);
  });

  it("renders projects in ProjectsApp", () => {
    render(<ProjectsApp params={{ itemId: "ironparadise" }} />);
    expect(screen.getAllByText("IronParadise").length).toBeGreaterThan(0);
    expect(screen.getByText("Gym ERP System")).toBeDefined();
  });

  it("renders skills in StackApp", () => {
    render(<StackApp />);
    expect(screen.getAllByText("Languages").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Frameworks").length).toBeGreaterThan(0);
    expect(screen.getByText("Python")).toBeDefined();
    expect(screen.getByText("Docker")).toBeDefined();
  });

  it("renders academic degrees in NotesApp", () => {
    render(<NotesApp />);
    expect(screen.getByText(/Master of Science — Data Science/i)).toBeDefined();
    expect(screen.getByText(/CGPA: 9.5/i)).toBeDefined();
  });

  it("renders contact info in ContactApp", () => {
    render(<ContactApp />);
    expect(screen.getByText(/Contact Vishnu Thangaraj/i)).toBeDefined();
  });

  it("renders printable resume in ResumeApp", () => {
    render(<ResumeApp />);
    expect(screen.getAllByText(profile.identity.name).length).toBeGreaterThan(0);
    expect(screen.getByText("Print / Save PDF")).toBeDefined();
  });

  it("renders PhoneMode with candidate info and icons", () => {
    render(<PhoneMode />);
    expect(screen.getByText(profile.identity.name)).toBeDefined();
    expect(screen.getByText("About Me")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
  });
});
