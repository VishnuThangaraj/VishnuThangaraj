# VishnuOS Portfolio (v3.0 — Reference-Fidelity GNOME Rebuild)

> A faithful, pixel-precise **GNOME/Ubuntu Adwaita desktop operating system** portfolio engineered in React 19, Tailwind CSS, and Zustand, measured and verified against reference screenshots.

**Owner:** Vishnu Thangaraj (Full Stack Developer | DevOps | AI/ML)  
**Live URL:** [https://vishnuthangaraj.github.io](https://vishnuthangaraj.github.io)  
**Architecture:** Vite + React 19 + Tailwind CSS + Zustand-compatible Store + Vitest + Virtual File System  

---

## 🖥️ System Architecture & Reference Fidelity

VishnuOS v3 is rebuilt from the ground up to faithfully reflect modern GNOME desktop specifications (as captured in references R1–R5):

1. **Top Bar (32px Height — R1, R3, R4):**
   - **Workspace Indicator:** Dot, wide active pill (`w-7 h-2 rounded-full`), dot representing 3 workspaces. Supports click and mousewheel switching.
   - **Places Menu:** Instant navigation to Home, Projects, Documents, Experience, Notes, Stack, and Terminal.
   - **Network Speed Readout:** `⇅ 8.8 KB/s` monospace bandwidth monitor.
   - **Live Clock & Date:** Formatted `Tue Oct 20  7:59 AM` with minute ticks. Encased in a highlight pill when the date menu is open.
   - **Quick Settings Pill:** Consolidated status pill holding Wi-Fi, volume, battery status, and `79%` readout.

2. **Floating Application Dock (839×84 px — R1, R5):**
   - Floating geometry centered horizontally with 4px bottom offset and 20px border radius.
   - 48×48 px icons at 68px pitch. **Zero macOS dock magnification or springy bounce.**
   - Canonical GNOME Olive Green (`#4b8501`) 4px running indicator dot under active applications.
   - Show Apps 9-dot grid button toggles Activities overview.

3. **Activities Overview (R2):**
   - Background blur (20px) and dimming overlay.
   - **Search Pill:** Centered 370×36px pill with live search filtering across apps and content.
   - **Workspace Strip:** 3 workspace thumbnails with active workspace highlight.
   - **App Grid:** 10 columns × 3 rows per page with ~64px icons, 2×2 mini icon folder previews (Developer Tools), pagination dots, and circular next-page arrow button.

4. **Date Menu Popover (754×645 px — R3):**
   - **Left Column:** Notifications panel with clear action; Media Player card with play/pause/skip controls.
   - **Right Column:** Date header, month calendar grid with `#4b8501` filled circle for today and event dots, Today agenda card, and World Clocks card (Coimbatore IST & St. Louis MO).

5. **Quick Settings Popover (402×476 px — R4):**
   - Battery pill (`79%`), round buttons for Screenshot, Settings, Lock, and Power.
   - Volume slider with headphone icon and `#4b8501` fill.
   - Two-column grid of 180×48px tiles: Wi-Fi, Bluetooth, Power Mode, Night Light, Dark Style toggle, Do Not Disturb, Keyboard, Airplane Mode, Caffeine (Screen Wake Lock API), and Connect with Me.

6. **Files Window (890×550 px — R5):**
   - Integrated Libadwaita split header bar (47px height).
   - Sidebar header: Search, Files title, kebab options menu.
   - Content header: Back/Forward buttons, PathBar breadcrumb pill (`🏠 Home ⋮`), list/grid toggle, circular right-aligned window buttons (minimize, maximize, close).
   - Sidebar (177px, `#393939`): Home, Recent, Starred, Network, Trash, Documents, Music, Pictures, Videos, Downloads.
   - Content area (`#1d1d20`): 4-column icon grid with blue folder icons (`#5294e2`) and emblem overlays.

7. **Virtual File System (VFS):**
   - Complete directory tree driven directly from `src/data/profile.js`:
     `/home/vishnu/Documents`, `/home/vishnu/Projects`, `/home/vishnu/Experience`, `/home/vishnu/Skills`, `/home/vishnu/Education`, `/home/vishnu/Contact`.
   - Accessible via Files app or GNOME Terminal (`ls`, `cd`, `pwd`, `cat`).

8. **Adaptive Modes:**
   - **Phone Mode (`< 768px`):** GNOME-mobile inspired compact status bar, full-screen apps, and quick launcher.
   - **Classic View (`#/classic`):** 100% accessible, semantic, printable linear portfolio.

---

## 🎨 Design System Tokens

| Token | Dark Theme | Light Theme | Description |
|---|---|---|---|
| `--accent` | `#4b8501` | `#4b8501` | Canonical GNOME Olive Green |
| `--accent-hover` | `#669727` | `#5d9e05` | Active / Hover Green |
| `--topbar-bg` | `rgba(25, 29, 17, 0.95)` | `rgba(240, 240, 240, 0.95)` | Shell Top Bar |
| `--dock-bg` | `#171a18` | `#f0f0f2` | Floating Dock Surface |
| `--popover-bg` | `#36363a` | `#f6f6f8` | Popover Surface (Date/Quick) |
| `--window-header-bg` | `#1d1d20` | `#fafafc` | Integrated Header Bar |
| `--window-content-bg` | `#1d1d20` | `#ffffff` | Window Interior |
| `--window-sidebar-bg` | `#393939` | `#ebebed` | Files / Settings Sidebar |
| `--folder-blue` | `#5294e2` | `#3584e4` | Yaru Folder Blue |

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js `v20+` or `v24+`
- pnpm `v9+` or `v12+`

### Installation
```bash
# Clone repository
git clone https://github.com/VishnuThangaraj/VishnuThangaraj.git
cd VishnuThangaraj

# Install dependencies
pnpm install

# Start local development server
pnpm run dev
```

### Build & Verification Commands
| Command | Description |
|---|---|
| `pnpm run dev` | Starts Vite local development server |
| `pnpm run build` | Compiles optimized production bundle in `dist/` |
| `pnpm run lint` | Runs ESLint 10 code quality & syntax checks |
| `pnpm run test` | Executes Vitest unit, contrast, a11y, and parity suites |
| `pnpm run preview` | Previews production build locally |
| `python3 tests/fidelity/fidelity_gate.py --self-test` | Runs Fidelity Gate verification |

---

## 📜 Open Source Licenses

- **Code:** Released under the [MIT License](LICENSES.md).
- **Typography:** Ubuntu Font Family distributed under the [Ubuntu Font Licence v1.0](LICENSES.md).
- **Icons:** Custom SVG icons designed in the Yaru visual language; Lucide icons under ISC.
