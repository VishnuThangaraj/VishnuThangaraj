import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('macOS Portfolio Accessibility & Quality Assurance (Task 5.4)', () => {
  it('provides accessible semantic landmark roles', () => {
    render(<App />);

    // Region landmark for desktop
    expect(screen.getByRole('region', { name: 'macOS Desktop' })).toBeDefined();

    // Banner landmark for TopBar
    expect(screen.getByRole('banner')).toBeDefined();

    // Navigation for menus
    expect(screen.getByRole('navigation', { name: 'Menu bar' })).toBeDefined();

    // Toolbar for status icons and dock
    const toolbars = screen.getAllByRole('toolbar');
    expect(toolbars.length).toBeGreaterThanOrEqual(2); // TopBar status + Dock
  });

  it('provides accessible names for all interactive TopBar status and Dock buttons', () => {
    render(<App />);

    const requiredAriaLabels = [
      'Apple Menu',
      'Focus / Do Not Disturb',
      'Spotlight Search',
      'Wi-Fi: Connected',
      'Bluetooth: On',
      'Control Center',
      'Finder',
      'Terminal',
      'Photos',
      'Contact Me',
      'System Settings',
      'Spotify',
      'Projects',
      'Messages',
    ];

    requiredAriaLabels.forEach((label) => {
      const el = screen.getByLabelText(label);
      expect(el).toBeDefined();
    });
  });
});
