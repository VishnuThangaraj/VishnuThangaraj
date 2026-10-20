# VishnuOS v3 Project Audit Report (Task 0.1)

Date: 2026-10-20
Status: VERIFIED

## 1. Executive Summary
The existing codebase implements a functional React/Tailwind/Zustand single-page application with mock window management, mobile mode, and classic mode. However, the visual appearance diverged significantly from the GNOME/Ubuntu reference screenshots (R1–R5) by introducing macOS-like Liquid Glass lensing, dock icon magnification, springy overshoot animations, and non-canonical colour schemes (amber/teal instead of the reference olive-green `#4b8501`).

Under the Reference-Fidelity plan (Workflow v3), we preserve the robust domain data and store foundations while refactoring/rebuilding the visual shell, design system tokens, and window chrome.

## 2. Module Audit Inventory

| Module / File | Status | Rationale |
|---|---|---|
| `src/data/profile.js` | **KEEP** | Complete, accurate source of truth for Vishnu Thangaraj's resume, projects (IronParadise, FizzType), experience, and stack. Virtual file system will consume this directly. |
| `src/data/wallpapers.js` | **REFACTOR** | Needs to support the reference placeholder and GNOME wallpaper manifest specifications. |
| `src/store/createStore.js` | **KEEP** | Lightweight Zustand-compatible store implementation working cleanly without extra dependencies. |
| `src/store/windowStore.js` | **REFACTOR** | Solid state machine foundation (open, close, focus, minimize, maximize), but needs dock target registry coordinates, proper GNOME ease-out animation states, and multi-workspace window isolation. |
| `src/store/settingsStore.js` | **REFACTOR** | Keep persistence logic and system preference detection; update defaults to match reference: accent `#4b8501` (olive green), remove Liquid Glass tiers in favor of GNOME surface styles. |
| `src/theme/tokens.js` | **REBUILD** | Currently defines macOS-style blur and non-reference accent colors. Needs full rebuild into GNOME design tokens (CSS variables + semantic tokens + light/dark matrices). |
| `src/components/glass/*` | **ARCHIVE / REBUILD** | Contains `GlassPanel.jsx`, `GlassSurface.jsx`, `GlassPill.jsx`, `LensingFilter.jsx`. GNOME is a clean, flat dark UI with subtle translucency only where verified in screenshots. Lensing filter will be deactivated. |
| `src/shell/TopBar.jsx` | **REFACTOR** | Layout structure is good (left/center/right). Needs pixel-matched geometry (32px height, workspace dots + active pill, Places menu, network speed readout `8.8 KB/s`, exact clock format, and quick settings pill). |
| `src/shell/Dock.jsx` | **REBUILD** | Remove dock magnification and springy bounces. Implement exact 839×84px floating dock with 20px radius, 48px icons at 68px pitch, olive-green running dot indicator, and Show Apps state. |
| `src/shell/WindowFrame.jsx` | **REBUILD** | Rebuild into GNOME Libadwaita integrated header bar matching R5 (split sidebar header, breadcrumb path bar, circular min/max/close controls, 12px corner radius). |
| `src/shell/DesktopIconGrid.jsx` | **REFACTOR** | Match 64px X-column, 120px pitch, 2-line ellipsized labels, and Yaru-blue folder icons (`#5294e2`) with shortcut emblems. |
| `src/shell/Activities.jsx` | **REFACTOR** | Match R2: blurred dimmed background, 370×36px search pill, 3 workspace thumbnails, 10×3 app grid with pagination dots. |
| `src/apps/*` (Core Apps) | **REFACTOR** | App content and logic are largely sound. Adjust window frames and UI styling to use GNOME Adwaita component primitives. |
| `src/mobile/PhoneMode.jsx` | **KEEP** | Good responsive fallback; will integrate with updated tokens. |
| `src/classic/ClassicView.jsx` | **KEEP** | Semantic accessible view for no-JS / printable portfolio; fully functional. |
| `src/__tests__/*` | **REFACTOR** | 34 existing tests pass. Update assertions to validate new token variables, GNOME contrast thresholds, and store enhancements. |

## 3. Dependency Assessment
- `react` 19.2.8 & `react-dom` 19.2.8: Modern, high performance.
- `tailwindcss` 4.3.3: Native CSS variables and utility classes.
- `lucide-react` 1.59.0: Clean symbolic icons for UI controls.
- `vitest` 5.0.5 & `@testing-library/react`: Fast unit/integration test runner.
All dependencies are clean and well-maintained.
