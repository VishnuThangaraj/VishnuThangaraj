import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DesktopIconsGrid from '../components/desktop/DesktopIconsGrid';
import DesktopIcon from '../components/desktop/DesktopIcon';
import { DESKTOP_ICONS } from '../components/desktop/desktopIconsData';

describe('Phase 8: macOS Home Screen Desktop Icons', () => {
  describe('Task 8.1 & 8.3: Desktop Icons Grid Rendering', () => {
    it('renders all 19 desktop icons matching reference/homescreen-icons.png', () => {
      render(<DesktopIconsGrid />);

      const grid = screen.getByTestId('desktop-icons-grid');
      expect(grid).toBeTruthy();

      expect(DESKTOP_ICONS.length).toBe(19);

      // Verify all 19 icon titles are present in the DOM
      const expectedTitles = [
        'YouTube', 'Vishnu GPT', 'Figma', 'Contact Me', 'Settings',
        'Resume', 'Experience', 'Instagram', 'Camera', 'Terminal',
        'About Me', 'GitHub', 'Photos', 'Global Chat', 'Spotify',
        'Projects', 'WhatsApp', 'Skills', 'LinkedIn'
      ];

      expectedTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeTruthy();
      });

      // Verify each icon container exists by test id
      DESKTOP_ICONS.forEach((item) => {
        expect(screen.getByTestId(`desktop-icon-${item.id}`)).toBeTruthy();
      });
    });
  });

  describe('Task 8.2: Desktop Icon Interaction & Selection State', () => {
    it('applies selection highlight pill when icon is clicked', () => {
      render(<DesktopIconsGrid />);

      const youtubeIcon = screen.getByTestId('desktop-icon-youtube');
      const youtubeLabel = screen.getByTestId('desktop-icon-label-youtube');

      // Initially not selected
      expect(youtubeIcon.getAttribute('aria-selected')).toBe('false');
      expect(youtubeLabel.style.backgroundColor).toBe('transparent');

      // Click to select
      fireEvent.click(youtubeIcon);

      expect(youtubeIcon.getAttribute('aria-selected')).toBe('true');
      expect(youtubeLabel.style.backgroundColor).toBe('rgba(0, 122, 255, 0.85)');
    });

    it('deselects active icon on window click (click outside)', () => {
      render(<DesktopIconsGrid />);

      const figmaIcon = screen.getByTestId('desktop-icon-figma');
      fireEvent.click(figmaIcon);
      expect(figmaIcon.getAttribute('aria-selected')).toBe('true');

      // Window click deselects
      fireEvent.click(window);
      expect(figmaIcon.getAttribute('aria-selected')).toBe('false');
    });

    it('triggers onOpen callback when icon is double-clicked', () => {
      const onOpenMock = vi.fn();
      const mockIconData = { id: 'terminal', title: 'Terminal', icon: 'terminal', type: 'app' };

      render(
        <DesktopIcon
          iconData={mockIconData}
          isSelected={false}
          onSelect={vi.fn()}
          onOpen={onOpenMock}
        />
      );

      const terminalIcon = screen.getByTestId('desktop-icon-terminal');
      fireEvent.doubleClick(terminalIcon);

      expect(onOpenMock).toHaveBeenCalledTimes(1);
      expect(onOpenMock).toHaveBeenCalledWith('terminal', expect.anything());
    });

    it('handles keyboard navigation (Enter to open, Space to select)', () => {
      const onSelectMock = vi.fn();
      const onOpenMock = vi.fn();
      const mockIconData = { id: 'resume', title: 'Resume', icon: 'resume', type: 'document' };

      render(
        <DesktopIcon
          iconData={mockIconData}
          isSelected={false}
          onSelect={onSelectMock}
          onOpen={onOpenMock}
        />
      );

      const resumeIcon = screen.getByTestId('desktop-icon-resume');

      // Space key selects
      fireEvent.keyDown(resumeIcon, { key: ' ' });
      expect(onSelectMock).toHaveBeenCalledWith('resume', expect.anything());

      // Enter key opens
      fireEvent.keyDown(resumeIcon, { key: 'Enter' });
      expect(onOpenMock).toHaveBeenCalledWith('resume', expect.anything());
    });
  });
});
