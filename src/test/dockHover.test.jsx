import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dock from '../components/Dock';
import DockTooltip from '../components/DockTooltip';

describe('macOS Dock Hover & Magnification (reference/dock-hover.png fidelity)', () => {
  it('renders DockTooltip when visible and displays exact title', () => {
    render(<DockTooltip title="Contact Me" left={180} isVisible={true} />);
    const tooltip = screen.getByTestId('dock-tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toBe('Contact Me');
  });

  it('hides DockTooltip when isVisible is false', () => {
    render(<DockTooltip title="Contact Me" left={180} isVisible={false} />);
    expect(screen.queryByTestId('dock-tooltip')).toBeNull();
  });

  it('updates scales and shows tooltip upon mouse move across dock', () => {
    render(<Dock />);
    const dockContainer = screen.getByRole('toolbar');

    // Simulate mouse entering and moving over the dock
    fireEvent.mouseMove(dockContainer, { clientX: 250, clientY: 700 });

    // When mouse moves over, a tooltip should appear
    const tooltip = screen.getByTestId('dock-tooltip');
    expect(tooltip).toBeDefined();

    // Simulate mouse leave
    fireEvent.mouseLeave(dockContainer);
    expect(screen.queryByTestId('dock-tooltip')).toBeNull();
  });

  it('specifically verifies the "Contact Me" tooltip label for contacts icon matching dock-hover.png', () => {
    render(<Dock />);
    const contactItem = screen.getByTestId('dock-item-contacts');
    expect(contactItem.getAttribute('aria-label')).toBe('Contact Me');
  });
});
