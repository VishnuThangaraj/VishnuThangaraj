import { lazy, Suspense } from "react";

const AboutApp = lazy(() =>
  import("./AboutApp").then((m) => ({ default: m.AboutApp }))
);
const ExperienceApp = lazy(() =>
  import("./ExperienceApp").then((m) => ({ default: m.ExperienceApp }))
);
const ProjectsApp = lazy(() =>
  import("./ProjectsApp").then((m) => ({ default: m.ProjectsApp }))
);
const CodeApp = lazy(() =>
  import("./CodeApp").then((m) => ({ default: m.CodeApp }))
);
const TerminalApp = lazy(() =>
  import("./TerminalApp").then((m) => ({ default: m.TerminalApp }))
);
const StackApp = lazy(() =>
  import("./StackApp").then((m) => ({ default: m.StackApp }))
);
const NotesApp = lazy(() =>
  import("./NotesApp").then((m) => ({ default: m.NotesApp }))
);
const ContactApp = lazy(() =>
  import("./ContactApp").then((m) => ({ default: m.ContactApp }))
);
const ResumeApp = lazy(() =>
  import("./ResumeApp").then((m) => ({ default: m.ResumeApp }))
);
const SettingsApp = lazy(() =>
  import("./SettingsApp").then((m) => ({ default: m.SettingsApp }))
);
const TrashApp = lazy(() =>
  import("./TrashApp").then((m) => ({ default: m.TrashApp }))
);
const FilesApp = lazy(() =>
  import("./FilesApp").then((m) => ({ default: m.FilesApp }))
);
const CalculatorApp = lazy(() =>
  import("./CalculatorApp").then((m) => ({ default: m.CalculatorApp }))
);
const CalendarApp = lazy(() =>
  import("./CalendarApp").then((m) => ({ default: m.CalendarApp }))
);

const APP_COMPONENTS = {
  about: AboutApp,
  files: FilesApp,
  calculator: CalculatorApp,
  calendar: CalendarApp,
  experience: ExperienceApp,
  projects: ProjectsApp,
  code: CodeApp,
  terminal: TerminalApp,
  stack: StackApp,
  notes: NotesApp,
  contact: ContactApp,
  resume: ResumeApp,
  settings: SettingsApp,
  trash: TrashApp,
};

export const AppContent = ({ appId, params }) => {
  const Component = APP_COMPONENTS[appId] || AboutApp;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[300px] text-xs text-amber-300 font-mono animate-pulse">
          Loading {appId}...
        </div>
      }
    >
      <Component params={params} />
    </Suspense>
  );
};
