/**
 * macOS Dock Parabolic Magnification Physics
 * Implements smooth cosine-squared bell curve attenuation.
 */

export const calculateDockScale = (distance, maxScale = 1.45, radius = 135) => {
  if (distance < 0) distance = Math.abs(distance);
  if (distance >= radius) return 1.0;

  const normalized = distance / radius;
  const factor = Math.pow(Math.cos((normalized * Math.PI) / 2), 2);
  const scale = 1.0 + (maxScale - 1.0) * factor;

  // Round to 3 decimal places for performance and smooth CSS transforms
  return Math.round(scale * 1000) / 1000;
};

/**
 * Calculates icon dimensions during hover
 */
export const calculateIconDimension = (baseSize, scale) => {
  return Math.round(baseSize * scale * 10) / 10;
};
