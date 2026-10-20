# Rebase Plan (Task 0.7)

Date: 2026-10-20
Status: APPROVED

## 1. Code Retirement and Archival
The following components from the initial v1/v2 Liquid Glass / macOS iteration are moved to an archive folder `src/_legacy_archive/` rather than deleted, so no code history is destroyed:
- `src/components/glass/GlassPanel.jsx`
- `src/components/glass/GlassSurface.jsx`
- `src/components/glass/GlassPill.jsx`
- `src/components/glass/LensingFilter.jsx`

## 2. Component Migration Matrix

| Component | Current State | Target State | Target Phase |
|---|---|---|---|
| `tokens.js` | Generic amber/teal accents | Reference olive `#4b8501`, surfaces, CSS vars | Phase 1 (Task 1.1) |
| `TopBar.jsx` | 36px macOS-hybrid bar | 32px GNOME bar with 3-dot workspace & quick settings pill | Phase 2 (Task 2.3–2.8) |
| `Dock.jsx` | Magnified, bouncy dock | 839×84px static GNOME dock with running dots | Phase 2 (Task 2.9–2.10) |
| `DesktopIconGrid.jsx` | Floating card icons | 64px X-column, 120px pitch, 2-line ellipsized labels | Phase 2 (Task 2.11) |
| `WindowFrame.jsx` | Floating glass window | Adwaita split header bar, circular window controls, 12px radius | Phase 3 (Task 3.1) |
| `Activities.jsx` | Fullscreen modal | Blur + dim overview, 370×36 search, workspace strip, 10×3 grid | Phase 4 (Task 4.2–4.5) |
| Date & Quick Menus | Basic dropdowns | 754×645 Date menu popover and 402×476 Quick Settings | Phase 4 (Task 4.7–4.10) |
| `FilesApp.jsx` | Basic list | R5-faithful file browser with sidebar, breadcrumbs, icon grid | Phase 5 (Task 5.3–5.4) |
| `TerminalApp.jsx` | Basic commands | GNOME console with real virtual filesystem navigation | Phase 5 (Task 5.5) |

## 3. Preservation Strategy
- `src/data/profile.js`: Preserved as single source of truth.
- `src/store/createStore.js`: Preserved for Zustand stores.
- `src/mobile/PhoneMode.jsx` & `src/classic/ClassicView.jsx`: Preserved and enhanced with token parity.
