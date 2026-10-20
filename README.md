# VishnuOS Portfolio (v2.0)

> A modern Linux Desktop OS portfolio rendered in macOS Tahoe "Liquid Glass" material with fluid window management, responsive phone mode, and accessible linear view.

**Owner:** Vishnu Thangaraj (Full Stack Developer | DevOps | AI/ML)  
**Live URL:** [https://vishnuthangaraj.github.io](https://vishnuthangaraj.github.io)  
**Architecture:** Vite + React 19 + Tailwind CSS + Zustand-compatible Store + Vitest

---

## 🖥️ Architecture & Key Features

VishnuOS is designed around a single source of truth (`src/data/profile.js`) rendered in three modes:

1. **Desktop OS Mode:**
   - **Translucent Top Bar:** Workspace dots, Places navigation menu, live dynamic clock with date overview popover, quick-settings pill (Wi-Fi, volume, battery), and direct settings gear.
   - **Column Desktop Icons:** Top-left column with Home, IronParadise, SHNOOR International, FizzType, IICT, Terminal, Stack, and Resume (with shortcut badges and drag snapping).
   - **Floating Dock:** Bottom-center pill with spring proximity magnification, running app indicator dots, launch bounce animation, tooltips, Trash easter egg, and Activities launch button.
   - **Window Manager:** Fluid window dragging with pointer capture, 8-way resize handles, traffic light window controls (close, minimize, maximize), edge snapping (left half, right half, full screen) with ghost preview overlay, and inactive window material swapping.
   - **Activities & Launchpad:** Instant `Ctrl+K` overview displaying open window tiles and searchable application grid.

2. **Phone Mode (`< 768px` or touch):**
   - iOS/Android style mobile home screen with glass icon grid, status bar, and pinned bottom dock.
   - Full-screen app sheets with native back button and header.

3. **Classic View (`#/classic`):**
   - Clean, semantic, lightning-fast linear portfolio for recruiters in a hurry and screen readers.
   - 100% accessible with skip links, structured semantic sections, and print-friendly styles.

4. **Liquid Glass Material System:**
   - **T0 (Solid):** Opaque tinted surfaces, strong borders, zero blur (WCAG AAA contrast or reduce-transparency).
   - **T1 (CSS Glass - Default):** Backdrop blur, saturation, specular rim highlight, and adaptive drop shadows.
   - **T2 (Lensing):** SVG displacement edge refraction filter for Chromium desktop.

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js `v20+` or `v24+`
- pnpm `v9+` or `v12+`

### Installation
```bash
# Clone the repository
git clone https://github.com/VishnuThangaraj/VishnuThangaraj.git
cd VishnuThangaraj

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Scripts
| Command | Description |
|---|---|
| `pnpm run dev` | Starts Vite local development server on port 5155 |
| `pnpm run build` | Produces production build in `dist/` with code-split app chunks |
| `pnpm run lint` | Runs ESLint across all JavaScript/JSX files |
| `pnpm run test` | Runs the full Vitest suite (tokens, store, contrast, parity, a11y) |
| `pnpm run preview` | Previews the production build locally |

---

## 🛠️ How to Edit Content

All portfolio content is centralized in **one single file**:
`src/data/profile.js`

- **Update Experience:** Add or modify items in `profile.experience`.
- **Update Projects:** Add or modify items in `profile.projects`.
- **Update Skills:** Modify items in `profile.skills`.
- **Update Education & Honors:** Modify `profile.education` or `profile.honors`.

Changes made to `src/data/profile.js` automatically propagate across:
- All Desktop OS windows (About, Experience, Projects, Code, Terminal, Stack, Notes, Contact, Resume)
- Phone mode home screen and sheets
- Classic linear view
- Terminal command responses

---

## 🧩 How to Add a New Application

1. Create your app component in `src/apps/MyNewApp.jsx`.
2. Register the app in `src/apps/registry.jsx`:
   ```javascript
   const MyNewApp = lazy(() => import("./MyNewApp").then(m => ({ default: m.MyNewApp })));
   ```
3. Add the app metadata to `src/store/windowStore.js` and `DOCK_APPS` in `src/shell/Dock.jsx`.

---

## 🐳 Docker Deployment

A lightweight multi-stage Docker build is included:

```bash
# Build Docker image
docker build -t vishnu-os .

# Run container
docker run -p 8080:80 vishnu-os
```
Visit `http://localhost:8080` in your browser.

---

## 📄 License & Attribution
Designed and built by **Vishnu Thangaraj** • 2026.
Original wallpaper and icon designs. Zero external tracking.
