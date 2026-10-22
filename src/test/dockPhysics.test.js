import { describe, it, expect } from 'vitest';
import { calculateDockScale, calculateIconDimension } from '../utils/dockPhysics';

describe('macOS Dock Magnification Physics Engine', () => {
  it('yields maximum scale (1.45) at zero cursor distance', () => {
    const scale = calculateDockScale(0, 1.45, 135);
    expect(scale).toBe(1.45);
  });

  it('yields base scale (1.0) when distance is equal to or greater than radius', () => {
    expect(calculateDockScale(135, 1.45, 135)).toBe(1.0);
    expect(calculateDockScale(200, 1.45, 135)).toBe(1.0);
  });

  it('provides smooth monotonic cosine-squared attenuation for neighbor icons', () => {
    const immediateNeighborDist = 62; // typical 52px icon + 10px gap
    const secondaryNeighborDist = 124;

    const targetScale = calculateDockScale(0, 1.45, 135);
    const immediateScale = calculateDockScale(immediateNeighborDist, 1.45, 135);
    const secondaryScale = calculateDockScale(secondaryNeighborDist, 1.45, 135);

    expect(targetScale).toBe(1.45);
    // Immediate neighbor scales to ~1.20 - 1.28
    expect(immediateScale).toBeGreaterThan(1.15);
    expect(immediateScale).toBeLessThan(1.30);
    // Secondary neighbor scales slightly
    expect(secondaryScale).toBeGreaterThan(1.0);
    expect(secondaryScale).toBeLessThan(immediateScale);
  });

  it('calculates scaled icon dimensions accurately', () => {
    expect(calculateIconDimension(52, 1.0)).toBe(52);
    expect(calculateIconDimension(52, 1.45)).toBe(75.4);
  });
});
