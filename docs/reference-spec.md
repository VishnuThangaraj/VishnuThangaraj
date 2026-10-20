# VishnuOS Reference Specification (Task 0.3)

Based on pixel-level measurement of R1–R5 at 1920×1080 resolution.

## 1. Global Coordinates & Palette

- **Base Resolution:** 1920 × 1080 px
- **Accent Primary:** `#4b8501` (RGB: `75, 133, 1`) - GNOME Olive Green
- **Accent Hover:** `#669727` (RGB: `102, 151, 39`)
- **Accent Soft:** `rgba(75, 133, 1, 0.2)`
- **Folder Blue:** `#5294e2` (RGB: `82, 148, 226`) - Yaru Folder Blue
- **Surfaces (Dark Theme):**
  - Top Bar: `rgba(25, 29, 17, 0.95)` (~32px)
  - Dock: `#171a18` (RGB: `23, 26, 24`), border `rgba(255, 255, 255, 0.08)`
  - Popovers (Date & Quick Settings): `#36363a` (RGB: `54, 54, 58`)
  - Popover Cards: `#54545a` (RGB: `84, 84, 90`)
  - Window Header & Content: `#1d1d20` (RGB: `29, 29, 32`)
  - Window Sidebar: `#393939` (RGB: `57, 57, 57`)
  - Search Pill: `#3e4238` (RGB: `62, 66, 56`)
- **Surfaces (Light Theme Derived):**
  - Top Bar: `rgba(240, 240, 240, 0.95)` (or GNOME Dark shell mode)
  - Dock: `#f0f0f2`, border `rgba(0, 0, 0, 0.1)`
  - Popovers: `#f6f6f8`
  - Window Header: `#fafafc`
  - Window Sidebar: `#ebebed`
  - Window Content: `#ffffff`

---

## 2. Component Specifications

### 2.1 Top Bar (R1, R3, R4)
- **Bounds:** `x: 0, y: 0, width: 1920, height: 32`
- **Left Zone:**
  - Workspace Indicator: 3 dots/pills. Inactive dots: 8px circles. Active workspace: 32×8px rounded pill (`#f2f2f2`).
  - Places Menu: Text "Places", opens drop-down with Home, Documents, Projects, etc.
  - Network Speed Readout: `⇅ 8.8 KB/s` monospace/tabular readout.
- **Center Zone:**
  - Clock: e.g. `Tue Oct 20  7:59 AM`. When date menu is open, encased in a rounded pill (`rgba(255, 255, 255, 0.15)`).
- **Right Zone:**
  - Tray icons (status, clipboard, notification bell).
  - Quick Settings pill: rounded pill (~24px height, 12px radius) containing Wi-Fi icon, volume icon, battery icon, and percentage (`79%`).

### 2.2 Dock (R1, R5)
- **Bounds:** `x: 540, y: 992, width: 839, height: 84`
- **Offset from bottom edge:** 4px (bottom at y=1075 of 1080)
- **Border radius:** 20px
- **Icons:** 48×48px, horizontal pitch: 68px
- **Magnification:** None (flat GNOME behavior).
- **Running Indicator:** 4px dot in `#4b8501`, positioned horizontally centered under running app icon at y=1061.
- **Show Apps Icon:** 9-dot grid icon on far right. Receives lighter rounded background when overview is active (R2).

### 2.3 Desktop Icons (R1)
- **Column X-Center:** ~64px
- **Starting Y:** 48px
- **Vertical Pitch:** 120px
- **Icon Size:** ~56px
- **Folder Style:** `#5294e2` with emblems (shortcut arrow on bottom right for symlinked folders like IronParadise).
- **Label:** Max 2 lines with text truncation/ellipsis, centered beneath icon with subtle text drop-shadow.

### 2.4 Activities Overview (R2)
- **Wallpaper Treatment:** Heavily blurred (20px) and dimmed (40% black overlay).
- **Search Pill:** Centered at `x: 775, y: 44, width: 370, height: 36, radius: 18`.
- **Workspace Strip:** At `y: 100`, 3 thumbnails (each ~270×152px), active thumbnail emphasized.
- **App Grid:** 10 columns × 3 rows per page, icon pitch ~148×120px, folder groups show 2×2 mini icon preview.
- **Pagination:** Paging dots centered near bottom; circular next-page arrow button at right edge.

### 2.5 Date Menu Popover (R3)
- **Bounds:** `x: 583, y: 38, width: 754, height: 645, radius: 20`
- **Two-Column Layout:**
  - Left column (~340px): Notifications panel, Media Player card (title, track, controls), "Clear" button.
  - Vertical separator.
  - Right column (~380px): Date header ("Tuesday", "October 20 2026"), Calendar month grid (S M T W T F S, today highlighted with `#4b8501` filled circle, dots under days with events), "Today" card, "World Clocks" card (St. Louis & Coimbatore).

### 2.6 Quick Settings Popover (R4)
- **Bounds:** `x: 1512, y: 38, width: 402, height: 476, radius: 22`
- **Right margin:** 6px
- **Top Row:** Battery pill (79%), icon buttons for Screenshot, Settings, Lock, Power.
- **Volume Slider:** Headphone icon, slider track with `#4b8501` fill, round knob.
- **Two-Column Grid of Action Tiles:**
  - 180×48px per tile, 12px gap, 12px border radius.
  - Active tiles (Wi-Fi, Dark Style, GSConnect): `#4b8501` background with white text.
  - Inactive tiles: `#54545a` background.
  - Nested submenu arrow segment where applicable.

### 2.7 Files Window (R5)
- **Bounds:** `x: 515, y: 281, width: 890, height: 550, radius: 12`
- **Header:** 47px height integrated header bar.
  - Sidebar header: Search, "Files", kebab menu.
  - Content header: Back/Forward buttons, Path Bar pill (`🏠 Home ⋮`), list/grid toggle, 3 circular window buttons (minimize, maximize, close).
- **Sidebar:** Width 177px, background `#393939`. Navigation items: Home (selected pill), Recent, Starred, Network, Trash, Documents, Music, Pictures, Videos, Downloads, Projects, Workspace.
- **Content Area:** Background `#1d1d20`. 4-column icon grid showing blue folders with emblems and files.
