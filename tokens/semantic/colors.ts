/**
 * Semantic Color Tokens
 * Contextual colors that reference primitive colors
 */

import { primitiveColors, opacityColors } from '../primitives/colors';

/**
 * Helper function to get color with opacity
 */
const getOpacityColor = (colorFamily: keyof typeof opacityColors, opacity: string) => {
  return opacityColors[colorFamily]?.[opacity as keyof typeof opacityColors[typeof colorFamily]] || '';
};

/**
 * Action Colors
 */
export const actionColors = {
  hovered: getOpacityColor('gray', 'op04'),
  focused: getOpacityColor('gray', 'op12'),
  disabled: getOpacityColor('gray', 'op38'),
  selected: getOpacityColor('gray', 'op08'),
  active: getOpacityColor('gray', 'op54'),
} as const;

/**
 * Color Swatches
 * Direct mappings to primitive color families
 */
export const colorSwatches = {
  azure: primitiveColors.azure,
  basil: primitiveColors.basil,
  black: primitiveColors.black,
  blue: primitiveColors.blue,
  fuchsia: primitiveColors.fuchsia,
  gray: primitiveColors.gray,
  green: primitiveColors.green,
  lime: primitiveColors.lime,
  melon: primitiveColors.melon,
  mint: primitiveColors.mint,
  orange: primitiveColors.orange,
  parakeet: primitiveColors.parakeet,
  red: primitiveColors.red,
  ruby: primitiveColors.ruby,
  teal: primitiveColors.teal,
  turquoise: primitiveColors.turquoise,
  yellow: primitiveColors.yellow,
} as const;

/**
 * Component Colors
 */
export const componentColors = {
  divider: getOpacityColor('black', 'op16'),
  scrim: getOpacityColor('black', 'op38'),
  dividerLight: getOpacityColor('black', 'op08'),
  scrollbar: getOpacityColor('black', 'op26'),
  scrollbarBackground: primitiveColors.black[50],
} as const;

/**
 * Alert Component Colors
 */
export const alertColors = {
  error: {
    fill: primitiveColors.red[50],
    content: primitiveColors.red[600],
    border: primitiveColors.red[100],
    message: primitiveColors.red[400],
  },
  warning: {
    fill: primitiveColors.orange[50],
    content: primitiveColors.orange[600],
    border: primitiveColors.orange[100],
    message: primitiveColors.orange[400],
  },
  info: {
    fill: primitiveColors.turquoise[100],
    content: primitiveColors.turquoise[700],
    border: primitiveColors.turquoise[200],
    message: primitiveColors.turquoise[600],
  },
  success: {
    fill: primitiveColors.basil[100],
    content: primitiveColors.basil[700],
    border: primitiveColors.basil[200],
    message: primitiveColors.basil[600],
  },
} as const;

/**
 * Button Component Colors
 */
export const buttonColors = {
  outlined: {
    border: getOpacityColor('blue', 'op60'),
  },
  tonal: {
    fill: getOpacityColor('blue', 'op12'),
    fillHovered: getOpacityColor('blue', 'op24'),
    fillFocused: getOpacityColor('blue', 'op50'),
  },
} as const;

/**
 * Card Component Colors
 */
export const cardColors = {
  elevated: {
    enabledFill: primitiveColors.white.base,
    hoveredFill: primitiveColors.white.base,
    pressedFill: primitiveColors.white.base,
    focusedFill: primitiveColors.gray[50],
    draggedFill: primitiveColors.white.base,
    disabledFill: primitiveColors.white.base,
    disabledBorder: getOpacityColor('black', 'op08'),
  },
  filled: {
    enabledFill: primitiveColors.gray[50],
    hoveredFill: primitiveColors.gray[100],
    pressedFill: primitiveColors.gray[200],
    focusedFill: primitiveColors.gray[200],
    draggedFill: primitiveColors.gray[200],
    disabledFill: primitiveColors.gray[50],
  },
  outlined: {
    enabledBorder: getOpacityColor('black', 'op16'),
    hoveredBorder: getOpacityColor('black', 'op26'),
    focusedBorder: primitiveColors.blue[700], // primary-main
    disabledBorder: getOpacityColor('black', 'op08'),
    enabledFill: primitiveColors.white.base,
    hoveredFill: primitiveColors.gray[50],
    focusedFill: primitiveColors.gray[100],
    disabledFill: primitiveColors.white.base,
    pressedFill: primitiveColors.gray[100],
    draggedFill: primitiveColors.gray[100],
    pressedBorder: getOpacityColor('black', 'op26'),
    draggedBorder: getOpacityColor('black', 'op26'),
  },
} as const;

/**
 * Chip Component Colors
 */
export const chipColors = {
  enabled: {
    fill: primitiveColors.gray[100],
    border: getOpacityColor('gray', 'op30'),
  },
  selected: {
    fill: getOpacityColor('blue', 'op20'),
    border: getOpacityColor('blue', 'op50'),
    fillOutlined: getOpacityColor('blue', 'op12'),
  },
  disabled: {
    fill: primitiveColors.gray[50],
    border: getOpacityColor('gray', 'op12'),
  },
} as const;

/**
 * Chip Status Colors
 */
export const chipStatusColors = {
  error: {
    fill: primitiveColors.red[50],
    border: primitiveColors.red[400],
    content: primitiveColors.red[500],
  },
  warning: {
    fill: primitiveColors.orange[50],
    border: primitiveColors.orange[400],
    content: primitiveColors.orange[500],
  },
  info: {
    fill: primitiveColors.turquoise[100],
    border: primitiveColors.turquoise[600],
    content: primitiveColors.turquoise[700],
  },
  success: {
    fill: primitiveColors.basil[100],
    border: primitiveColors.basil[600],
    content: primitiveColors.basil[700],
  },
} as const;

/**
 * Input Component Colors
 */
export const inputColors = {
  filled: {
    enabledFill: getOpacityColor('gray', 'op06'),
    hoveredFill: getOpacityColor('gray', 'op10'),
    disabledFill: getOpacityColor('gray', 'op04'),
    focusedFill: getOpacityColor('gray', 'op12'),
  },
  outlined: {
    enabledBorder: getOpacityColor('gray', 'op38'),
    hoveredBorder: getOpacityColor('gray', 'op70'),
    disabledBorder: getOpacityColor('gray', 'op12'),
  },
  standard: {
    enabledBorder: getOpacityColor('gray', 'op38'),
    hoveredBorder: getOpacityColor('gray', 'op70'),
    disabledBorder: getOpacityColor('gray', 'op12'),
  },
} as const;

/**
 * Search Component Colors
 */
export const searchColors = {
  enabledBorder: getOpacityColor('gray', 'op30'),
  hoveredBorder: getOpacityColor('gray', 'op44'),
  disabledBorder: getOpacityColor('gray', 'op08'),
  focusedBorder: getOpacityColor('gray', 'op54'),
} as const;

/**
 * Content Colors
 */
export const contentColors = {
  highestEmphasis: getOpacityColor('gray', 'op87'),
  highEmphasis: getOpacityColor('gray', 'op54'),
  mediumEmphasis: getOpacityColor('gray', 'op38'),
  lowEmphasis: getOpacityColor('gray', 'op12'),
  lowestEmphasis: getOpacityColor('gray', 'op04'),
  inverse: {
    highestEmphasis: primitiveColors.white.base,
    highEmphasis: getOpacityColor('white', 'op70'),
    mediumEmphasis: getOpacityColor('white', 'op50'),
  },
} as const;

/**
 * Error Colors
 */
export const errorColors = {
  main: primitiveColors.red.base,
  dark: primitiveColors.red[800],
  light: primitiveColors.red[500],
  onError: primitiveColors.white.base,
  states: {
    hovered: getOpacityColor('red', 'op04'),
    selected: getOpacityColor('red', 'op08'),
    focused: getOpacityColor('red', 'op12'),
    focusedVisible: getOpacityColor('red', 'op30'),
  },
} as const;

/**
 * Info Colors
 */
export const infoColors = {
  main: primitiveColors.turquoise[700],
  dark: primitiveColors.turquoise[900],
  light: primitiveColors.turquoise[500],
  onInfo: primitiveColors.white.base,
  states: {
    hovered: getOpacityColor('turquoise', 'op04'),
    selected: getOpacityColor('turquoise', 'op08'),
    focused: getOpacityColor('turquoise', 'op12'),
    focusedVisible: getOpacityColor('turquoise', 'op30'),
  },
} as const;

/**
 * Primary Colors
 */
export const primaryColors = {
  main: primitiveColors.blue[700],
  dark: primitiveColors.blue[900],
  light: primitiveColors.blue[500],
  onPrimary: primitiveColors.white.base,
  states: {
    hovered: getOpacityColor('blue', 'op04'),
    selected: getOpacityColor('blue', 'op08'),
    focused: getOpacityColor('blue', 'op12'),
    focusedVisible: getOpacityColor('blue', 'op30'),
  },
} as const;

/**
 * Secondary Colors
 */
export const secondaryColors = {
  main: primitiveColors.green[800],
  dark: primitiveColors.green[900],
  light: primitiveColors.green[600],
  onSecondary: primitiveColors.white.base,
  states: {
    hovered: getOpacityColor('green', 'op04'),
    selected: getOpacityColor('green', 'op08'),
    focused: getOpacityColor('green', 'op12'),
    focusedVisible: getOpacityColor('green', 'op30'),
  },
} as const;

/**
 * Success Colors
 */
export const successColors = {
  main: primitiveColors.basil[700],
  dark: primitiveColors.basil[900],
  light: primitiveColors.basil[600],
  onSuccess: primitiveColors.white.base,
  states: {
    hovered: getOpacityColor('mint', 'op04'),
    selected: getOpacityColor('mint', 'op08'),
    focused: getOpacityColor('mint', 'op12'),
    focusedVisible: getOpacityColor('mint', 'op30'),
  },
} as const;

/**
 * Surface Colors
 */
export const surfaceColors = {
  high: primitiveColors.gray[200],
  medium: primitiveColors.gray[100],
  low: primitiveColors.gray[30],
  highest: primitiveColors.gray[300],
  lowest: primitiveColors.white.base,
  inverse: {
    highest: primitiveColors.gray[600],
    high: primitiveColors.gray[700],
    medium: primitiveColors.gray[800],
    low: primitiveColors.gray[900],
    lowest: primitiveColors.gray.base,
  },
} as const;

/**
 * Text Colors
 */
export const textColors = {
  primary: getOpacityColor('gray', 'op87'),
  secondary: getOpacityColor('gray', 'op60'),
  disabled: getOpacityColor('gray', 'op38'),
  tertiary: getOpacityColor('gray', 'op44'),
  link: primaryColors.main, // References semantic primary
} as const;

/**
 * Warning Colors
 */
export const warningColors = {
  main: primitiveColors.orange[500],
  dark: primitiveColors.orange[800],
  light: primitiveColors.orange[400],
  onWarning: primitiveColors.white.base,
  states: {
    hovered: getOpacityColor('orange', 'op04'),
    selected: getOpacityColor('orange', 'op08'),
    focused: getOpacityColor('orange', 'op12'),
    focusedVisible: getOpacityColor('orange', 'op30'),
  },
} as const;
