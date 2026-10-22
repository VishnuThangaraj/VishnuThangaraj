import React from 'react';

/**
 * Pixel-precise SVG icons for macOS Top Bar matching reference/topbar.png
 */

export const AppleLogoIcon = ({ className = 'w-3.5 h-3.5 fill-current' }) => (
  <svg
    viewBox="0 0 170 170"
    className={className}
    style={{ width: '13px', height: '15px' }}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-6.3-9.76-11.21-20.94-14.73-33.53-3.52-12.6-5.28-24.16-5.28-34.69 0-14.74 3.73-26.69 11.19-35.86 7.46-9.17 16.74-13.86 27.84-14.07 4.13 0 9.07 1.05 14.81 3.17 5.74 2.12 9.4 3.23 10.98 3.35 2.17-.23 6.05-1.45 11.64-3.66 5.59-2.22 10.15-3.23 13.68-3.05 10.22.65 18.77 4.58 25.64 11.78 6.87 7.2 11.04 15.66 12.51 25.38-11.09 6.74-16.52 16.09-16.3 28.05.22 9.57 3.91 17.5 11.07 23.8 7.16 6.3 15.77 9.89 25.83 10.77-2.61 7.83-5.87 15.86-9.78 24.1zM119.22 31.84c0-7.18 2.61-13.91 7.83-20.19 5.22-6.28 11.74-10.16 19.57-11.65.22 1.3.33 2.5.33 3.59 0 7.39-2.72 14.24-8.15 20.55-5.44 6.3-12.06 10.11-19.89 11.41-.11-.98-.22-2.28-.33-3.92z"
    />
  </svg>
);

export const FocusMoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '14px', height: '14px' }}
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const SpotlightSearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '14px', height: '14px' }}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

export const WifiIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '15px', height: '15px' }}
    aria-hidden="true"
  >
    <path d="M12 20h.01" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    <path d="M5 12.859a10 10 0 0 1 14 0" />
    <path d="M1.5 9.288a15 15 0 0 1 21 0" />
  </svg>
);

export const BluetoothIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '13px', height: '13px' }}
    aria-hidden="true"
  >
    <path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11" />
  </svg>
);

export const BatteryChargingIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
    <svg
      viewBox="0 0 32 16"
      fill="none"
      style={{ width: '22px', height: '12px' }}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="14"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M29 5.5C29.6 5.5 30 6 30 6.6V9.4C30 10 29.6 10.5 29 10.5V5.5Z"
        fill="currentColor"
      />
      <rect x="3" y="3" width="22" height="10" rx="2" fill="currentColor" opacity="0.9" />
      <path
        d="M15.5 3.8L12.2 8.5H15.2L13.8 12.2L18.2 7.5H15L16.2 3.8H15.5Z"
        fill="#ffffff"
      />
    </svg>
    <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '-0.2px' }}>
      100%
    </span>
  </div>
);

export const ControlCenterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    style={{ width: '15px', height: '15px' }}
    aria-hidden="true"
  >
    <rect
      x="2"
      y="4"
      width="20"
      height="6.5"
      rx="3.25"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="7" cy="7.25" r="2.2" fill="currentColor" />
    <rect
      x="2"
      y="13.5"
      width="20"
      height="6.5"
      rx="3.25"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="17" cy="16.75" r="2.2" fill="currentColor" />
  </svg>
);

/* ==========================================================================
   Dropdown Action Icons (matching apple_logo-clicked.png, file-clicked.png, view-clicked.png)
   ========================================================================== */

export const MenuSleepIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '15px', height: '15px', marginRight: '8px' }}
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const MenuRestartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '15px', height: '15px', marginRight: '8px' }}
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
    <path d="M21 3v5h-5" />
  </svg>
);

export const MenuPowerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '15px', height: '15px', marginRight: '8px' }}
    aria-hidden="true"
  >
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

export const MenuLockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '15px', height: '15px', marginRight: '8px' }}
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const MenuChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '12px', height: '12px', marginLeft: 'auto' }}
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const MenuFilePlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '15px', height: '15px', marginRight: '8px' }}
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

export const MenuCheckmarkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '13px', height: '13px', marginRight: '8px' }}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
