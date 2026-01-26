/**
 * Semantic Size Tokens
 * Contextual sizes that reference primitive sizes
 */

import { primitiveSizes } from '../primitives/sizes';

/**
 * Radius Tokens
 */
export const radiusTokens = {
  xs: primitiveSizes[2],   // 2px
  sm: primitiveSizes[4],   // 4px
  md: primitiveSizes[8],   // 8px
  lg: primitiveSizes[12],  // 12px
  xl: primitiveSizes[16],  // 16px
  xxl: primitiveSizes[24], // 24px
  circle: primitiveSizes[100], // 100px
} as const;

/**
 * Size Tokens
 * Direct mappings to primitive sizes
 */
export const sizeTokens = {
  2: primitiveSizes[2],
  4: primitiveSizes[4],
  6: primitiveSizes[6],
  8: primitiveSizes[8],
  10: primitiveSizes[10],
  12: primitiveSizes[12],
  14: primitiveSizes[14],
  16: primitiveSizes[16],
  18: primitiveSizes[18],
  20: primitiveSizes[20],
  24: primitiveSizes[24],
  32: primitiveSizes[32],
  40: primitiveSizes[40],
  48: primitiveSizes[48],
  56: primitiveSizes[56],
  64: primitiveSizes[64],
  72: primitiveSizes[72],
  80: primitiveSizes[80],
  88: primitiveSizes[88],
  96: primitiveSizes[96],
} as const;

/**
 * Spacing Tokens
 */
export const spacingTokens = {
  2: primitiveSizes[2],
  4: primitiveSizes[4],
  8: primitiveSizes[8],
  12: primitiveSizes[12],
  16: primitiveSizes[16],
  20: primitiveSizes[20],
  24: primitiveSizes[24],
  32: primitiveSizes[32],
  40: primitiveSizes[40],
  48: primitiveSizes[48],
  56: primitiveSizes[56],
  64: primitiveSizes[64],
  72: primitiveSizes[72],
  80: primitiveSizes[80],
  88: primitiveSizes[88],
  96: primitiveSizes[96],
} as const;
