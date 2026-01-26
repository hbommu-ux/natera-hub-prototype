/**
 * Color Utility Functions
 * Helper functions for color manipulation and opacity calculations
 */

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Convert hex color to RGBA with opacity
 */
export function hexToRgba(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Calculate opacity percentage to decimal
 */
export function opacityToDecimal(percentage: number): number {
  return percentage / 100;
}

/**
 * Get opacity value as decimal from string format (e.g., "op04" -> 0.04)
 */
export function parseOpacityString(opacityString: string): number {
  const match = opacityString.match(/op(\d+)/);
  if (!match) return 1;
  return parseInt(match[1], 10) / 100;
}
