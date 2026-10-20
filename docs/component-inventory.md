# Component and State Inventory (Task 0.4)

Every component mapped across states (Default, Hover, Active, Focus, Disabled, Inactive) and modes (Dark, Light).

| Component | Category | Owner Phase | States Covered | Dark Token | Light Token |
|---|---|---|---|---|---|
| **TopBar** | Shell | Phase 2 | Default, Menu Open | `--color-topbar-bg` | `--color-topbar-bg-light` |
| **WorkspaceIndicator** | Shell | Phase 2 | Inactive Dot, Active Pill, Hover | `--color-workspace-active` | `--color-workspace-active` |
| **PlacesMenu** | Shell | Phase 2 | Closed, Open, Item Hover | `--color-popover-bg` | `--color-popover-bg-light` |
| **ClockPill** | Shell | Phase 2 | Default, Popover Open | `--color-pill-highlight` | `--color-pill-highlight-light` |
| **QuickSettingsPill** | Shell | Phase 2 | Default, Open, Hover | `--color-pill-highlight` | `--color-pill-highlight-light` |
| **Dock** | Shell | Phase 2 | Default, Hidden | `--color-dock-bg` | `--color-dock-bg-light` |
| **DockIconItem** | Shell | Phase 2 | Default, Hover, Running Dot, Active (Overview) | `--color-accent` | `--color-accent` |
| **DesktopIcon** | Desktop | Phase 2 | Default, Hover, Selected, Rubberbanded | `--color-selection-bg` | `--color-selection-bg-light` |
| **ContextMenu** | Shell | Phase 2 | Open, Item Hover, Separator | `--color-popover-bg` | `--color-popover-bg-light` |
| **WindowFrame** | Window | Phase 3 | Active, Inactive, Maximized, Snapped | `--color-window-header-bg` | `--color-window-header-bg-light` |
| **WindowControls** | Window | Phase 3 | Default, Hover (Close/Min/Max) | `--color-window-btn-close` | `--color-window-btn-close` |
| **OverviewSearch** | Overlay | Phase 4 | Default, Focused, Typed | `--color-search-bg` | `--color-search-bg-light` |
| **WorkspaceThumb** | Overlay | Phase 4 | Default, Active, Drop Target | `--color-thumb-border` | `--color-thumb-border` |
| **AppGridItem** | Overlay | Phase 4 | Default, Hover, Focused, Folder 2x2 | `--color-text-primary` | `--color-text-primary-light` |
| **DateMenuPopover** | Overlay | Phase 4 | Open, Calendar Day (Default, Today, Event Dot) | `--color-accent` | `--color-accent` |
| **QuickSettingsTile** | Overlay | Phase 4 | Inactive, Active, Submenu Hover | `--color-tile-inactive` / `--color-accent` | `--color-tile-inactive-light` / `--color-accent` |
| **VolumeSlider** | Primitive | Phase 1 | Default, Hover, Dragging | `--color-accent` | `--color-accent` |
| **Button (Pill/Flat)**| Primitive | Phase 1 | Default, Hover, Active, Disabled | `--color-btn-bg` | `--color-btn-bg-light` |
| **Switch** | Primitive | Phase 1 | Off, On, Focused | `--color-accent` | `--color-accent` |
| **SidebarRow** | Primitive | Phase 1 | Default, Hover, Selected, Focused | `--color-sidebar-active` | `--color-sidebar-active-light` |
| **PathBar** | Primitive | Phase 1 | Default, Hover, Dropdown Open | `--color-header-pill` | `--color-header-pill-light` |
| **IconGridView** | Primitive | Phase 1 | Default, Item Select, Multiple Select | `--color-selection-bg` | `--color-selection-bg-light` |
| **FilesApp** | App | Phase 5 | Directory Tree, Search Results, Grid/List | `--color-window-content-bg` | `--color-window-content-bg-light` |
| **TerminalApp** | App | Phase 5 | Focused, Typing, Tab Complete | `--color-terminal-bg` | `--color-terminal-bg` |
| **SettingsApp** | App | Phase 5 | Category Select, Slider, Switch, Radio | `--color-window-content-bg` | `--color-window-content-bg-light` |
