import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TopBar from '../components/TopBar';
import TopBarClock, { formatMacDate } from '../components/TopBarClock';

describe('TopBar Component (reference/topbar.png fidelity)', () => {
  it('renders macOS Top Bar with exact left navigation elements', () => {
    render(<TopBar />);
    expect(screen.getByTestId('macos-topbar')).toBeDefined();

    // Apple Logo menu
    expect(screen.getByLabelText('Apple Menu')).toBeDefined();

    // Active Application title "Finder"
    expect(screen.getByText('Finder')).toBeDefined();

    // Standard macOS menus
    expect(screen.getByText('File')).toBeDefined();
    expect(screen.getByText('View')).toBeDefined();
    expect(screen.getByText('Go')).toBeDefined();
    expect(screen.getByText('Window')).toBeDefined();
    expect(screen.getByText('Help')).toBeDefined();
  });

  it('renders all 6 status icons and battery readout matching reference/topbar.png', () => {
    render(<TopBar />);

    expect(screen.getByLabelText('Focus / Do Not Disturb')).toBeDefined();
    expect(screen.getByLabelText('Spotlight Search')).toBeDefined();
    expect(screen.getByLabelText('Wi-Fi: Connected')).toBeDefined();
    expect(screen.getByLabelText('Bluetooth: On')).toBeDefined();
    expect(screen.getByText('100%')).toBeDefined();
    expect(screen.getByLabelText('Control Center')).toBeDefined();
    expect(screen.getByTestId('topbar-clock')).toBeDefined();
  });

  it('formats date and time string matching macOS specification', () => {
    // 2026-10-21 22:50:00 -> Wed Oct 21  10:50 PM
    const testDate = new Date(2026, 9, 21, 22, 50, 0); // Month is 0-indexed (9 = Oct)
    const formatted = formatMacDate(testDate);
    expect(formatted).toBe('Wed Oct 21  10:50 PM');
  });

  it('opens and closes dropdown menu upon clicking menu items', () => {
    render(<TopBar />);
    const fileButton = screen.getByText('File');

    // Click to open
    fireEvent.click(fileButton);
    expect(screen.getByText('New Finder Window')).toBeDefined();
    expect(screen.getByText('⌘N')).toBeDefined();

    // Click again to close
    fireEvent.click(fileButton);
    expect(screen.queryByText('New Finder Window')).toBeNull();
  });

  it('dismisses open dropdown menu when Escape key is pressed', () => {
    render(<TopBar />);
    const appleButton = screen.getByLabelText('Apple Menu');

    fireEvent.click(appleButton);
    expect(screen.getByText('About This Mac')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('About This Mac')).toBeNull();
  });
});
