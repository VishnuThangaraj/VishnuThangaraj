import React, { useState, useEffect, useRef } from 'react';
import {
  AppleLogoIcon,
  FocusMoonIcon,
  SpotlightSearchIcon,
  WifiIcon,
  BluetoothIcon,
  BatteryChargingIcon,
  ControlCenterIcon,
  MenuSleepIcon,
  MenuRestartIcon,
  MenuPowerIcon,
  MenuLockIcon,
  MenuChevronRight,
  MenuFilePlusIcon,
  MenuCheckmarkIcon,
} from './TopBarIcons';
import TopBarClock from './TopBarClock';

export const TOPBAR_MENUS = {
  apple: [
    { label: 'About This Mac' },
    { separator: true },
    { label: 'System Settings...', shortcut: '⌘,' },
    { label: 'App Store...' },
    { separator: true },
    { label: 'Recent Items', chevron: true },
    { separator: true },
    { label: 'Force Quit...', shortcut: '⌥⌘⎋' },
    { separator: true },
    { label: 'Sleep', icon: MenuSleepIcon },
    { label: 'Restart...', icon: MenuRestartIcon },
    { label: 'Shut Down...', icon: MenuPowerIcon },
    { separator: true },
    { label: 'Lock Screen', icon: MenuLockIcon, shortcut: '⌃⌘Q' },
    { label: 'Log Out Vishnu Thangaraj...', shortcut: '⇧⌘Q' },
  ],
  file: [
    { label: 'New Finder Window', shortcut: '⌘N' },
    { label: 'New File', icon: MenuFilePlusIcon, shortcut: '⌘T' },
    { separator: true },
    { label: 'Close Window', shortcut: '⌘W' },
  ],
  view: [
    { label: 'as Icons', icon: MenuCheckmarkIcon, shortcut: '⌘1' },
    { label: 'as List', shortcut: '⌘2', indent: true },
    { label: 'as Columns', shortcut: '⌘3', indent: true },
  ],
  go: [
    { label: 'Applications', shortcut: '⇧⌘A' },
  ],
  window: [
    { label: 'Minimize', shortcut: '⌘M' },
    { label: 'Zoom' },
  ],
  help: [
    { label: 'Portfolio Help' },
    { label: 'Keyboard Shortcuts' },
  ],
};

const TopBar = ({ onAction }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const barRef = useRef(null);

  // Close menus when clicking outside or pressing Escape
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
    // When any menu is already open, hovering over other topbar menus seamlessly switches
    if (activeMenu !== null) {
      setActiveMenu(menuKey);
    }
  };

  const handleItemClick = (item) => {
    if (item.separator) return;
    setActiveMenu(null);
    if (onAction) onAction(item.label);
  };

  return (
    <header
      ref={barRef}
      className="macos-topbar"
      data-testid="macos-topbar"
      role="banner"
    >
      {/* Left Menu Section */}
      <nav className="macos-topbar-left" role="navigation" aria-label="Menu bar">
        {/* Apple Menu (reference/apple_logo-clicked.png: boxed outline when clicked) */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className={`macos-topbar-btn hoverable ${
              activeMenu === 'apple' ? 'active-bordered' : ''
            }`}
            data-testid="topbar-apple-btn"
            onClick={() => toggleMenu('apple')}
            onMouseEnter={() => handleMouseEnter('apple')}
            aria-haspopup="menu"
            aria-expanded={activeMenu === 'apple'}
            aria-label="Apple Menu"
            style={{ padding: '2px 9px', borderRadius: '5px' }}
          >
            <AppleLogoIcon />
          </button>
          {activeMenu === 'apple' && (
            <div
              className="macos-dropdown-menu"
              data-testid="dropdown-apple"
              style={{ left: 0, minWidth: '225px' }}
              role="menu"
            >
              {TOPBAR_MENUS.apple.map((item, idx) =>
                item.separator ? (
                  <div key={idx} className="macos-dropdown-separator" />
                ) : (
                  <div
                    key={idx}
                    className="macos-dropdown-item"
                    role="menuitem"
                    onClick={() => handleItemClick(item)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </span>
                    {item.shortcut && (
                      <span className="item-secondary" style={{ fontSize: '12px', opacity: 0.6, marginLeft: '16px' }}>
                        {item.shortcut}
                      </span>
                    )}
                    {item.chevron && (
                      <span className="item-secondary" style={{ opacity: 0.6 }}>
                        <MenuChevronRight />
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Finder App Label — STRICTLY NO HOVER EFFECT as mandated */}
        <div className="macos-topbar-non-hoverable macos-topbar-title" data-testid="topbar-finder-title">
          Finder
        </div>

        {/* Standard Menus: File, View, Go, Window, Help */}
        {['file', 'view', 'go', 'window', 'help'].map((key) => {
          const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
          const isBordered = key === 'window'; // reference/window-clicked.png has box outline
          const isActive = activeMenu === key;

          return (
            <div key={key} style={{ position: 'relative' }}>
              <button
                type="button"
                className={`macos-topbar-btn hoverable ${
                  isActive ? (isBordered ? 'active-bordered' : 'active') : ''
                }`}
                data-testid={`topbar-${key}-btn`}
                onClick={() => toggleMenu(key)}
                onMouseEnter={() => handleMouseEnter(key)}
                aria-haspopup="menu"
                aria-expanded={isActive}
              >
                {capitalized}
              </button>

              {isActive && (
                <div
                  className="macos-dropdown-menu"
                  data-testid={`dropdown-${key}`}
                  style={{
                    left: 0,
                    minWidth: key === 'go' ? '175px' : key === 'window' ? '180px' : '205px',
                  }}
                  role="menu"
                >
                  {TOPBAR_MENUS[key].map((item, idx) =>
                    item.separator ? (
                      <div key={idx} className="macos-dropdown-separator" />
                    ) : (
                      <div
                        key={idx}
                        className="macos-dropdown-item"
                        role="menuitem"
                        onClick={() => handleItemClick(item)}
                      >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          {item.icon && <item.icon />}
                          {item.indent && <span style={{ width: '21px', display: 'inline-block' }} />}
                          <span>{item.label}</span>
                        </span>
                        {item.shortcut && (
                          <span className="item-secondary" style={{ fontSize: '12px', opacity: 0.6, marginLeft: '16px' }}>
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

      {/* Right Status Section */}
      <div className="macos-topbar-right" role="toolbar" aria-label="Status Bar">
        {/* Moon / Focus / DND — Hoverable */}
        <button
          type="button"
          className="macos-status-icon-btn hoverable"
          aria-label="Focus / Do Not Disturb"
          title="Do Not Disturb"
        >
          <FocusMoonIcon />
        </button>

        {/* Spotlight Search — Hoverable */}
        <button
          type="button"
          className="macos-status-icon-btn hoverable"
          aria-label="Spotlight Search"
          title="Spotlight"
        >
          <SpotlightSearchIcon />
        </button>

        {/* Wi-Fi — Hoverable */}
        <button
          type="button"
          className="macos-status-icon-btn hoverable"
          aria-label="Wi-Fi: Connected"
          title="Wi-Fi"
        >
          <WifiIcon />
        </button>

        {/* Bluetooth — Hoverable */}
        <button
          type="button"
          className="macos-status-icon-btn hoverable"
          aria-label="Bluetooth: On"
          title="Bluetooth"
        >
          <BluetoothIcon />
        </button>

        {/* Battery with 100% — STRICTLY NO HOVER EFFECT as mandated */}
        <div
          className="macos-topbar-non-hoverable"
          data-testid="topbar-battery-status"
          aria-label="Battery 100% Fully Charged"
          title="Battery: 100% Charged"
          style={{ display: 'flex', alignItems: 'center', padding: '2px 4px' }}
        >
          <BatteryChargingIcon />
        </div>

        {/* Control Center — Hoverable */}
        <button
          type="button"
          className="macos-status-icon-btn hoverable"
          aria-label="Control Center"
          title="Control Center"
        >
          <ControlCenterIcon />
        </button>

        {/* Live Date and Time — STRICTLY NO HOVER EFFECT as mandated */}
        <div
          className="macos-topbar-non-hoverable"
          data-testid="topbar-datetime-status"
          aria-label="Date and Time"
          title="Date and Time"
          style={{ padding: '2px 6px', display: 'flex', alignItems: 'center' }}
        >
          <TopBarClock />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
