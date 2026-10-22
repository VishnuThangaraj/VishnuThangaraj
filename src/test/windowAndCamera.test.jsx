import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import Window from '../components/window/Window';
import CameraApp from '../components/apps/CameraApp';

describe('Phase 9: Desktop Icon Actions, Reusable Window & Camera App', () => {
  let originalOpen;

  beforeEach(() => {
    originalOpen = window.open;
    window.open = vi.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
    vi.restoreAllMocks();
  });

  describe('Task 9.1: External Profile Redirections (LinkedIn & GitHub)', () => {
    it('redirects to LinkedIn URL in new tab when clicked', () => {
      render(<App />);

      const linkedinIcon = screen.getByTestId('desktop-icon-linkedin');
      fireEvent.click(linkedinIcon);

      expect(window.open).toHaveBeenCalledWith(
        'https://www.linkedin.com/in/vishnuthangaraj',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('redirects to GitHub URL in new tab when clicked', () => {
      render(<App />);

      const githubIcon = screen.getByTestId('desktop-icon-github');
      fireEvent.click(githubIcon);

      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/VishnuThangaraj',
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Task 9.2: Reusable macOS Window Shell', () => {
    it('renders window title, traffic light controls, and content', () => {
      render(
        <Window id="sample" title="Sample Window" isOpen={true}>
          <div data-testid="sample-content">Hello Window</div>
        </Window>
      );

      expect(screen.getByTestId('macos-window-sample')).toBeTruthy();
      expect(screen.getByTestId('window-title-sample').textContent).toBe('Sample Window');
      expect(screen.getByTestId('window-close-btn')).toBeTruthy();
      expect(screen.getByTestId('window-minimize-btn')).toBeTruthy();
      expect(screen.getByTestId('window-maximize-btn')).toBeTruthy();
      expect(screen.getByTestId('sample-content')).toBeTruthy();
    });

    it('triggers onClose and onMinimize callbacks on control button clicks', () => {
      const onCloseMock = vi.fn();
      const onMinimizeMock = vi.fn();

      render(
        <Window
          id="test-controls"
          title="Controls Test"
          isOpen={true}
          onClose={onCloseMock}
          onMinimize={onMinimizeMock}
        >
          <div>Body</div>
        </Window>
      );

      fireEvent.click(screen.getByTestId('window-close-btn'));
      expect(onCloseMock).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId('window-minimize-btn'));
      expect(onMinimizeMock).toHaveBeenCalledTimes(1);
    });

    it('toggles maximize state and expands dimensions edge-to-edge', () => {
      render(
        <Window id="test-max" title="Maximize Test" isOpen={true}>
          <div>Body</div>
        </Window>
      );

      const windowEl = screen.getByTestId('macos-window-test-max');
      const maxBtn = screen.getByTestId('window-maximize-btn');

      // Initially absolute position
      expect(windowEl.style.position).toBe('absolute');

      // Click maximize button
      fireEvent.click(maxBtn);
      expect(windowEl.style.position).toBe('fixed');
      expect(windowEl.style.width).toBe('100vw');
      expect(windowEl.style.top).toBe('28px');
      expect(windowEl.style.left).toBe('0px');
      expect(windowEl.style.height).toBe('calc(100vh - 112px)');

      // Click again to restore
      fireEvent.click(maxBtn);
      expect(windowEl.style.position).toBe('absolute');
    });

    it('drags window across desktop via titlebar mouse movement', () => {
      render(
        <Window
          id="test-drag"
          title="Drag Test"
          isOpen={true}
          defaultPosition={{ x: 100, y: 100 }}
        >
          <div>Draggable</div>
        </Window>
      );

      const titlebar = screen.getByTestId('window-titlebar-test-drag');
      const windowEl = screen.getByTestId('macos-window-test-drag');

      // Start drag at mouse coordinates (150, 120)
      fireEvent.mouseDown(titlebar, { clientX: 150, clientY: 120, button: 0 });

      // Move mouse to (250, 200) -> delta: +100x, +80y
      fireEvent.mouseMove(window, { clientX: 250, clientY: 200 });

      expect(windowEl.style.left).toBe('200px');
      expect(windowEl.style.top).toBe('180px');

      // Release mouse
      fireEvent.mouseUp(window);
    });
  });

  describe('Task 9.3: Camera Application', () => {
    it('renders camera UI controls and placeholder icon when camera inactive', () => {
      render(<CameraApp />);

      expect(screen.getByTestId('camera-app')).toBeTruthy();
      expect(screen.getByTestId('camera-off-placeholder')).toBeTruthy();
      expect(screen.getByTestId('camera-gallery-btn')).toBeTruthy();
      expect(screen.getByTestId('camera-shutter-btn')).toBeTruthy();
      expect(screen.getByTestId('camera-flip-btn')).toBeTruthy();
    });

    it('triggers shutter flash effect on click', () => {
      vi.useFakeTimers();
      render(<CameraApp />);

      const shutterBtn = screen.getByTestId('camera-shutter-btn');
      fireEvent.click(shutterBtn);

      // Flash overlay appears
      expect(screen.getByTestId('camera-flash-overlay')).toBeTruthy();

      // After timeout, flash overlay disappears
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.queryByTestId('camera-flash-overlay')).toBeNull();

      vi.useRealTimers();
    });

    it('initializes video stream and cleans up tracks on unmount when stream available', async () => {
      const stopTrackMock = vi.fn();
      const mockStream = {
        getTracks: vi.fn(() => [{ stop: stopTrackMock }]),
      };

      navigator.mediaDevices = {
        getUserMedia: vi.fn().mockResolvedValue(mockStream),
      };

      const { unmount } = render(<CameraApp />);

      // Await promise resolution
      await act(async () => {
        await Promise.resolve();
      });

      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();

      // Unmount should stop tracks
      unmount();
      expect(stopTrackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Task 9.4: Desktop & Dock Window Integration', () => {
    it('opens Camera window when Camera icon is clicked and closes when red button clicked', () => {
      render(<App />);

      // Initially closed
      expect(screen.queryByTestId('macos-window-camera')).toBeNull();

      // Click desktop camera icon
      const cameraIcon = screen.getByTestId('desktop-icon-camera');
      fireEvent.click(cameraIcon);

      // Window is now open
      expect(screen.getByTestId('macos-window-camera')).toBeTruthy();
      expect(screen.getByTestId('camera-app')).toBeTruthy();

      // Click close button
      const closeBtn = screen.getByTestId('window-close-btn');
      fireEvent.click(closeBtn);

      // Window closes
      expect(screen.queryByTestId('macos-window-camera')).toBeNull();
    });
  });
});
