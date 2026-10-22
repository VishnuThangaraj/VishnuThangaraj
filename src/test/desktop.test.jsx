import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Desktop from '../components/Desktop';

describe('Desktop Component', () => {
  it('renders full-screen desktop canvas with empty surface', () => {
    render(<Desktop />);
    const desktopEl = screen.getByTestId('macos-desktop');
    expect(desktopEl).toBeDefined();
    expect(desktopEl.className).toContain('macos-desktop');
  });

  it('renders children correctly inside desktop canvas', () => {
    render(
      <Desktop>
        <div data-testid="child-element">Test Child</div>
      </Desktop>
    );
    expect(screen.getByTestId('child-element')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
  });
});
