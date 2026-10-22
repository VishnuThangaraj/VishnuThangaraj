import React, { useState, useEffect, useRef } from 'react';
import {
  AppleLogoIcon,
  FocusMoonIcon,
  SpotlightSearchIcon,
  WifiIcon,
  BluetoothIcon,
  BatteryChargingIcon,
  ControlCenterIcon,
} from './TopBarIcons';
import TopBarClock from './TopBarClock';

const MENU_CONFIG = {
  apple: [
    { label: 'About This Mac' },
    { separator: true },
    { label: 'System Settings...' },
    { label: 'App Store...' },
    { separator: true },
    { label: 'Recent Items' },
    { separator: true },
    { label: 'Force Quit...' },
    { separator: true },
    { label: 'Sleep' },
    { label: 'Restart...' },
    { label: 'Shut Down...' },
    { separator: true },
    { label: 'Lock Screen' },
    { label: 'Log Out Vishnu Thangaraj...' },
  ],
  finder: [
    { label: 'About Finder' },
    { separator: true },
    { label: 'Settings...' },
    { separator: true },
    { label: 'Empty Trash...' },
    { separator: true },
    { label: 'Hide Finder' },
    { label: 'Hide Others' },
    { label: 'Show All' },
  ],
  file: [
    { label: 'New Finder Window', shortcut: '⌘N' },
    { label: 'New Folder', shortcut: '⇧⌘N' },
    { label: 'New Smart Folder' },
    { label: 'New Tab', shortcut: '⌘T' },
    { separator: true },
    { label: 'Close Window', shortcut: '⌘W' },
    { label: 'Get Info', shortcut: '⌘I' },
  ],
  view: [
    { label: 'as Icons', shortcut: '⌘1' },
    { label: 'as List', shortcut: '⌘2' },
    { label: 'as Columns', shortcut: '⌘3' },
    { label: 'as Gallery', shortcut: '⌘4' },
    { separator: true },
    { label: 'Clean Up' },
    { label: 'Clean Up By' },
    { label: 'Sort By' },
    { separator: true },
    { label: 'Show View Options', shortcut: '⌘J' },
  ],
  go: [
    { label: 'Back', shortcut: '⌘[' },
    { label: 'Forward', shortcut: '⌘]' },
    { separator: true },
    { label: 'Recents', shortcut: '⇧⌘F' },
    { label: 'Documents', shortcut: '⇧⌘O' },
    { label: 'Desktop', shortcut: '⇧⌘D' },
    { label: 'Downloads', shortcut: '⌥⌘L' },
    { label: 'Home', shortcut: '⇧⌘H' },
    { label: 'Applications', shortcut: '⇧⌘A' },
    { label: 'Utilities', shortcut: '⇧⌘U' },
  ],
  window: [
    { label: 'Minimize', shortcut: '⌘M' },
    { label: 'Zoom' },
    { separator: true },
    { label: 'Bring All to Front' },
  ],
  help: [
    { label: 'macOS Help' },
    { label: "See What's New in macOS" },
  ],
};

const TopBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const barRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMenu = (menuKey) => {
    setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleMouseEnter = (menuKey) => {
    if (activeMenu !== null) {
      setActiveMenu(menuKey);
    }
  };

  return (
    <header
      ref={barRef}
      className="macos-topbar"
      data-testid="macos-topbar"
      role="banner"
    >
      {/* Left Menu Section matching reference/topbar.png */}
      <nav className="macos-topbar-left" role="navigation" aria-label="Menu bar">
        {/* Apple Menu */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className={`macos-menu-item ${activeMenu === 'apple' ? 'active' : ''}`}
            onClick={() => toggleMenu('apple')}
            onMouseEnter={() => handleMouseEnter('apple')}
            aria-haspopup="menu"
            aria-expanded={activeMenu === 'apple'}
            aria-label="Apple Menu"
            style={{ padding: '2px 9px' }}
          >
            <AppleLogoIcon />
          </button>
          {activeMenu === 'apple' && (
            <div className="macos-dropdown-menu" style={{ left: 0 }} role="menu">
              {MENU_CONFIG.apple.map((item, idx) =>
                item.separator ? (
                  <div key={idx} className="macos-dropdown-separator" />
                ) : (
                  <div key={idx} className="macos-dropdown-item" role="menuitem">
                    <span>{item.label}</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Finder App Menu */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className={`macos-menu-item app-title ${activeMenu === 'finder' ? 'active' : ''}`}
            onClick={() => toggleMenu('finder')}
            onMouseEnter={() => handleMouseEnter('finder')}
            aria-haspopup="menu"
            aria-expanded={activeMenu === 'finder'}
          >
            Finder
          </button>
          {activeMenu === 'finder' && (
            <div className="macos-dropdown-menu" style={{ left: 0 }} role="menu">
              {MENU_CONFIG.finder.map((item, idx) =>
                item.separator ? (
                  <div key={idx} className="macos-dropdown-separator" />
                ) : (
                  <div key={idx} className="macos-dropdown-item" role="menuitem">
                    <span>{item.label}</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Standard macOS Menus: File, View, Go, Window, Help */}
        {['file', 'view', 'go', 'window', 'help'].map((key) => {
          const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <div key={key} style={{ position: 'relative' }}>
              <button
                type="button"
                className={`macos-menu-item ${activeMenu === key ? 'active' : ''}`}
                onClick={() => toggleMenu(key)}
                onMouseEnter={() => handleMouseEnter(key)}
                aria-haspopup="menu"
                aria-expanded={activeMenu === key}
              >
                {capitalized}
              </button>
              {activeMenu === key && (
                <div className="macos-dropdown-menu" style={{ left: 0 }} role="menu">
                  {MENU_CONFIG[key].map((item, idx) =>
                    item.separator ? (
                      <div key={idx} className="macos-dropdown-separator" />
                    ) : (
                      <div key={idx} className="macos-dropdown-item" role="menuitem">
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span style={{ fontSize: '11px', opacity: 0.6, marginLeft: '16px' }}>
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Right Status Section matching reference/topbar.png */}
      <div className="macos-topbar-right" role="toolbar" aria-label="Status Bar">
        {/* Moon / Focus / DND */}
        <button
          type="button"
          className="macos-status-icon-btn"
          aria-label="Focus / Do Not Disturb"
          title="Do Not Disturb"
        >
          <FocusMoonIcon />
        </button>

        {/* Spotlight Search */}
        <button
          type="button"
          className="macos-status-icon-btn"
          aria-label="Spotlight Search"
          title="Spotlight"
        >
          <SpotlightSearchIcon />
        </button>

        {/* Wi-Fi */}
        <button
          type="button"
          className="macos-status-icon-btn"
          aria-label="Wi-Fi: Connected"
          title="Wi-Fi"
        >
          <WifiIcon />
        </button>

        {/* Bluetooth */}
        <button
          type="button"
          className="macos-status-icon-btn"
          aria-label="Bluetooth: On"
          title="Bluetooth"
        >
          <BluetoothIcon />
        </button>

        {/* Battery with Charging Glyph and 100% */}
        <div
          className="macos-status-icon-btn"
          aria-label="Battery 100% Fully Charged"
          title="Battery: 100% Charged"
          style={{ cursor: 'default' }}
        >
          <BatteryChargingIcon />
        </div>

        {/* Control Center */}
        <button
          type="button"
          className="macos-status-icon-btn"
          aria-label="Control Center"
          title="Control Center"
        >
          <ControlCenterIcon />
        </button>

        {/* Live Date and Time */}
        <div
          className="macos-status-icon-btn"
          aria-label="Date and Time"
          title="Date and Time"
          style={{ padding: '2px 6px' }}
        >
          <TopBarClock />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
