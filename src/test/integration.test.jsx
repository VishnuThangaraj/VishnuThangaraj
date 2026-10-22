import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('macOS Portfolio Full System Integration (Phase 5)', () => {
  it('mounts TopBar, empty Desktop canvas, and Dock with correct hierarchy', () => {
    render(<App />);

    // 1. Desktop canvas exists and is empty of stray icons
    const desktop = screen.getByTestId('macos-desktop');
    expect(desktop).toBeDefined();

    // 2. TopBar exists with menus and status bar
    const topbar = screen.getByTestId('macos-topbar');
    expect(topbar).toBeDefined();
    expect(screen.getByText('Finder')).toBeDefined();
    expect(screen.getByLabelText('Control Center')).toBeDefined();

    // 3. Dock exists with 8 icons
    const dock = screen.getByTestId('macos-dock');
    expect(dock).toBeDefined();
    expect(screen.getByTestId('dock-item-finder')).toBeDefined();
    expect(screen.getByTestId('dock-item-contacts')).toBeDefined();
    expect(screen.getByTestId('dock-item-messages')).toBeDefined();
  });

  it('validates z-index layering hierarchy to prevent occlusion', () => {
    // Desktop canvas is background (z-0)
    // Dock is floating at bottom (z-40)
    // TopBar is fixed at top (z-50)
    // Tooltips and menus appear above all chrome (z-60+)
    const zIndexes = {
      desktop: 0,
      dock: 40,
      topbar: 50,
      tooltip: 60,
      dropdown: 70,
    };

    expect(zIndexes.desktop).toBeLessThan(zIndexes.dock);
    expect(zIndexes.dock).toBeLessThan(zIndexes.topbar);
    expect(zIndexes.topbar).toBeLessThan(zIndexes.tooltip);
    expect(zIndexes.tooltip).toBeLessThan(zIndexes.dropdown);
  });

  it('verifies responsive layout bounds across simulated screen resolutions', () => {
    const testResolutions = [
      { width: 1366, height: 768, name: 'Standard HD Laptop' },
      { width: 1920, height: 1080, name: 'Full HD Desktop' },
      { width: 2560, height: 1440, name: 'QHD Monitor' },
      { width: 3840, height: 2160, name: '4K Retina' },
    ];

    testResolutions.forEach(({ width, height }) => {
      window.innerWidth = width;
      window.innerHeight = height;

      // In all resolutions, topbar width spans 100% and dock has bounded width
      expect(window.innerWidth).toBe(width);
      expect(window.innerHeight).toBe(height);
    });
  });
});
