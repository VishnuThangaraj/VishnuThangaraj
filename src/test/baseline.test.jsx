import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Baseline System Test', () => {
  it('renders App component with macOS desktop canvas', () => {
    render(<App />);
    const desktopEl = screen.getByTestId('macos-desktop');
    expect(desktopEl).toBeDefined();
    expect(desktopEl.className).toContain('macos-desktop');
  });
});
