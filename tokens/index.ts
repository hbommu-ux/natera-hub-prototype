/**
 * Design Tokens - Main Export
 * 
 * This file exports all design tokens organized by category.
 * Tokens follow the primitive-to-semantic architecture where
 * semantic tokens reference primitive tokens.
 */

// Primitive Tokens
export { primitiveColors, opacityColors } from './primitives/colors';
export { primitiveSizes } from './primitives/sizes';

// Semantic Color Tokens
export {
  actionColors,
  colorSwatches,
  componentColors,
  alertColors,
  buttonColors,
  cardColors,
  chipColors,
  chipStatusColors,
  inputColors,
  searchColors,
  contentColors,
  errorColors,
  infoColors,
  primaryColors,
  secondaryColors,
  successColors,
  surfaceColors,
  textColors,
  warningColors,
} from './semantic/colors';

// Semantic Size Tokens
export {
  radiusTokens,
  sizeTokens,
  spacingTokens,
} from './semantic/sizes';

/**
 * Complete token object for easy access
 */
export const tokens = {
  colors: {
    primitive: {
      colors: primitiveColors,
      opacity: opacityColors,
    },
    semantic: {
      action: actionColors,
      swatches: colorSwatches,
      component: componentColors,
      alert: alertColors,
      button: buttonColors,
      card: cardColors,
      chip: chipColors,
      chipStatus: chipStatusColors,
      input: inputColors,
      search: searchColors,
      content: contentColors,
      error: errorColors,
      info: infoColors,
      primary: primaryColors,
      secondary: secondaryColors,
      success: successColors,
      surface: surfaceColors,
      text: textColors,
      warning: warningColors,
    },
  },
  sizes: {
    primitive: primitiveSizes,
    semantic: {
      radius: radiusTokens,
      size: sizeTokens,
      spacing: spacingTokens,
    },
  },
} as const;

// Type exports for TypeScript support
export type PrimitiveColors = typeof primitiveColors;
export type OpacityColors = typeof opacityColors;
export type PrimitiveSizes = typeof primitiveSizes;
export type ActionColors = typeof actionColors;
export type ColorSwatches = typeof colorSwatches;
export type ComponentColors = typeof componentColors;
export type AlertColors = typeof alertColors;
export type ButtonColors = typeof buttonColors;
export type CardColors = typeof cardColors;
export type ChipColors = typeof chipColors;
export type ChipStatusColors = typeof chipStatusColors;
export type InputColors = typeof inputColors;
export type SearchColors = typeof searchColors;
export type ContentColors = typeof contentColors;
export type ErrorColors = typeof errorColors;
export type InfoColors = typeof infoColors;
export type PrimaryColors = typeof primaryColors;
export type SecondaryColors = typeof secondaryColors;
export type SuccessColors = typeof successColors;
export type SurfaceColors = typeof surfaceColors;
export type TextColors = typeof textColors;
export type WarningColors = typeof warningColors;
export type RadiusTokens = typeof radiusTokens;
export type SizeTokens = typeof sizeTokens;
export type SpacingTokens = typeof spacingTokens;
export type Tokens = typeof tokens;
