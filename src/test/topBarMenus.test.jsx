import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TopBar from '../components/TopBar';

describe('macOS TopBar Menu Actions & Selective Hover Fidelity (Phase 6)', () => {
  it('enforces selective hover rules: excludes Finder, Battery, and Date/Time', () => {
    render(<TopBar />);

    // Finder must have macos-topbar-non-hoverable and NOT hoverable class
    const finderEl = screen.getByTestId('topbar-finder-title');
    expect(finderEl.classList.contains('macos-topbar-non-hoverable')).toBe(true);
    expect(finderEl.classList.contains('hoverable')).toBe(false);

    // Battery must have macos-topbar-non-hoverable and NOT hoverable class
    const batteryEl = screen.getByTestId('topbar-battery-status');
    expect(batteryEl.classList.contains('macos-topbar-non-hoverable')).toBe(true);
    expect(batteryEl.classList.contains('hoverable')).toBe(false);

    // Date/Time must have macos-topbar-non-hoverable and NOT hoverable class
    const dateTimeEl = screen.getByTestId('topbar-datetime-status');
    expect(dateTimeEl.classList.contains('macos-topbar-non-hoverable')).toBe(true);
    expect(dateTimeEl.classList.contains('hoverable')).toBe(false);

    // Interactive buttons must have hoverable class
    expect(screen.getByTestId('topbar-apple-btn').classList.contains('hoverable')).toBe(true);
    expect(screen.getByTestId('topbar-file-btn').classList.contains('hoverable')).toBe(true);
    expect(screen.getByTestId('topbar-view-btn').classList.contains('hoverable')).toBe(true);
    expect(screen.getByTestId('topbar-go-btn').classList.contains('hoverable')).toBe(true);
    expect(screen.getByTestId('topbar-window-btn').classList.contains('hoverable')).toBe(true);
    expect(screen.getByTestId('topbar-help-btn').classList.contains('hoverable')).toBe(true);
  });

  it('renders exact Apple Menu on click matching reference/apple_logo-clicked.png', () => {
    render(<TopBar />);
    const appleBtn = screen.getByTestId('topbar-apple-btn');

    fireEvent.click(appleBtn);
    // Verifies active-bordered outline box
    expect(appleBtn.classList.contains('active-bordered')).toBe(true);

    const dropdown = screen.getByTestId('dropdown-apple');
    expect(dropdown).toBeDefined();

    expect(screen.getByText('About This Mac')).toBeDefined();
    expect(screen.getByText('System Settings...')).toBeDefined();
    expect(screen.getByText('⌘,')).toBeDefined();
    expect(screen.getByText('App Store...')).toBeDefined();
    expect(screen.getByText('Recent Items')).toBeDefined();
    expect(screen.getByText('Force Quit...')).toBeDefined();
    expect(screen.getByText('⌥⌘⎋')).toBeDefined();
    expect(screen.getByText('Sleep')).toBeDefined();
    expect(screen.getByText('Restart...')).toBeDefined();
    expect(screen.getByText('Shut Down...')).toBeDefined();
    expect(screen.getByText('Lock Screen')).toBeDefined();
    expect(screen.getByText('⌃⌘Q')).toBeDefined();
    expect(screen.getByText('Log Out Vishnu Thangaraj...')).toBeDefined();
    expect(screen.getByText('⇧⌘Q')).toBeDefined();
  });

  it('renders exact File Menu on click matching reference/file-clicked.png', () => {
    render(<TopBar />);
    const fileBtn = screen.getByTestId('topbar-file-btn');

    fireEvent.click(fileBtn);
    expect(fileBtn.classList.contains('active')).toBe(true);

    const dropdown = screen.getByTestId('dropdown-file');
    expect(dropdown).toBeDefined();

    expect(screen.getByText('New Finder Window')).toBeDefined();
    expect(screen.getByText('⌘N')).toBeDefined();
    expect(screen.getByText('New File')).toBeDefined();
    expect(screen.getByText('⌘T')).toBeDefined();
    expect(screen.getByText('Close Window')).toBeDefined();
    expect(screen.getByText('⌘W')).toBeDefined();
  });

  it('renders exact View Menu on click matching reference/view-clicked.png', () => {
    render(<TopBar />);
    const viewBtn = screen.getByTestId('topbar-view-btn');

    fireEvent.click(viewBtn);
    const dropdown = screen.getByTestId('dropdown-view');
    expect(dropdown).toBeDefined();

    expect(screen.getByText('as Icons')).toBeDefined();
    expect(screen.getByText('⌘1')).toBeDefined();
    expect(screen.getByText('as List')).toBeDefined();
    expect(screen.getByText('⌘2')).toBeDefined();
    expect(screen.getByText('as Columns')).toBeDefined();
    expect(screen.getByText('⌘3')).toBeDefined();
  });

  it('renders exact Go Menu on click matching reference/go-click.png', () => {
    render(<TopBar />);
    const goBtn = screen.getByTestId('topbar-go-btn');

    fireEvent.click(goBtn);
    const dropdown = screen.getByTestId('dropdown-go');
    expect(dropdown).toBeDefined();

    expect(screen.getByText('Applications')).toBeDefined();
    expect(screen.getByText('⇧⌘A')).toBeDefined();
  });

  it('renders exact Window Menu on click matching reference/window-clicked.png with border box', () => {
    render(<TopBar />);
    const windowBtn = screen.getByTestId('topbar-window-btn');

    fireEvent.click(windowBtn);
    // Verifies active-bordered outline box matching reference
    expect(windowBtn.classList.contains('active-bordered')).toBe(true);

    const dropdown = screen.getByTestId('dropdown-window');
    expect(dropdown).toBeDefined();

    expect(screen.getByText('Minimize')).toBeDefined();
    expect(screen.getByText('⌘M')).toBeDefined();
    expect(screen.getByText('Zoom')).toBeDefined();
  });

  it('renders exact Help Menu on click matching reference/help-clicked.png', () => {
    render(<TopBar />);
    const helpBtn = screen.getByTestId('topbar-help-btn');

    fireEvent.click(helpBtn);
    const dropdown = screen.getByTestId('dropdown-help');
    expect(dropdown).toBeDefined();

    expect(screen.getByText('Portfolio Help')).toBeDefined();
    expect(screen.getByText('Keyboard Shortcuts')).toBeDefined();
  });

  it('switches open menus seamlessly when hovering across adjacent menus', () => {
    render(<TopBar />);
    const fileBtn = screen.getByTestId('topbar-file-btn');
    const viewBtn = screen.getByTestId('topbar-view-btn');

    // Click to open File menu
    fireEvent.click(fileBtn);
    expect(screen.getByTestId('dropdown-file')).toBeDefined();

    // Mouse enters View menu while File menu is open -> switches to View
    fireEvent.mouseEnter(viewBtn);
    expect(screen.queryByTestId('dropdown-file')).toBeNull();
    expect(screen.getByTestId('dropdown-view')).toBeDefined();
  });

  it('triggers onAction callback and closes menu when a menu item is clicked', () => {
    const handleAction = vi.fn();
    render(<TopBar onAction={handleAction} />);

    fireEvent.click(screen.getByTestId('topbar-file-btn'));
    fireEvent.click(screen.getByText('New Finder Window'));

    expect(handleAction).toHaveBeenCalledWith('New Finder Window');
    expect(screen.queryByTestId('dropdown-file')).toBeNull();
  });
});
