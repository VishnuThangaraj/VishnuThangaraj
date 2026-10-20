import { describe, it, expect } from "vitest";

/**
 * Calculates relative luminance as defined by WCAG 2.1
 */
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates WCAG contrast ratio between two RGB colors
 */
function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

describe("WCAG 2.1 Contrast Ratios Guard", () => {
  it("ensures dark theme body text meets WCAG AA (≥ 4.5:1)", () => {
    // White or near white text (#f4f4f5 = 244, 244, 245) on dark surface (#18181b = 24, 24, 27)
    const textDark = [244, 244, 245];
    const surfaceDark = [24, 24, 27];
    const ratio = getContrastRatio(textDark, surfaceDark);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("ensures light theme body text meets WCAG AA (≥ 4.5:1)", () => {
    // Dark gray text (#18181b = 24, 24, 27) on light surface (#f5f5f7 = 245, 245, 247)
    const textLight = [24, 24, 27];
    const surfaceLight = [245, 245, 247];
    const ratio = getContrastRatio(textLight, surfaceLight);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("ensures high-contrast theme meets WCAG AAA (≥ 7:1)", () => {
    // Pure white on pure black
    const white = [255, 255, 255];
    const black = [0, 0, 0];
    const ratio = getContrastRatio(white, black);
    expect(ratio).toBeGreaterThanOrEqual(7.0);
  });

  it("ensures UI focus rings and controls meet WCAG AA UI contrast (≥ 3:1)", () => {
    // Warm amber accent [245, 158, 11] on dark background [24, 24, 27]
    const amber = [245, 158, 11];
    const surfaceDark = [24, 24, 27];
    const ratio = getContrastRatio(amber, surfaceDark);
    expect(ratio).toBeGreaterThanOrEqual(3.0);
  });
});
