import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dock from '../components/Dock';
import { DOCK_APPS } from '../components/DockIcons';

describe('macOS Dock Foundation (reference/dock.png fidelity)', () => {
  it('renders dock wrapper and container element', () => {
    render(<Dock />);
    expect(screen.getByTestId('macos-dock')).toBeDefined();
    expect(screen.getByRole('toolbar')).toBeDefined();
  });

  it('renders exactly 8 application icons in the reference sequence', () => {
    render(<Dock />);

    const expectedApps = [
      { id: 'finder', name: 'Finder' },
      { id: 'terminal', name: 'Terminal' },
      { id: 'photos', name: 'Photos' },
      { id: 'contacts', name: 'Contact Me' },
      { id: 'settings', name: 'System Settings' },
      { id: 'spotify', name: 'Spotify' },
      { id: 'folder', name: 'Projects' },
      { id: 'messages', name: 'Messages' },
    ];

    expect(DOCK_APPS.length).toBe(8);

    expectedApps.forEach((app, index) => {
      expect(DOCK_APPS[index].id).toBe(app.id);
      expect(DOCK_APPS[index].name).toBe(app.name);

      const itemButton = screen.getByTestId(`dock-item-${app.id}`);
      expect(itemButton).toBeDefined();
      expect(itemButton.getAttribute('aria-label')).toBe(app.name);
    });
  });

  it('triggers onAppClick callback when an icon button is clicked', () => {
    const handleAppClick = vi.fn();
    render(<Dock onAppClick={handleAppClick} />);

    const finderBtn = screen.getByTestId('dock-item-finder');
    fireEvent.click(finderBtn);
    expect(handleAppClick).toHaveBeenCalledWith('finder');

    const contactBtn = screen.getByTestId('dock-item-contacts');
    fireEvent.click(contactBtn);
    expect(handleAppClick).toHaveBeenCalledWith('contacts');
  });
});
