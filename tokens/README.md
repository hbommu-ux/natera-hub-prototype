# Design Tokens

This directory contains the design token system for the Natera Design System, structured to match the Figma variable organization.

## Structure

```
tokens/
├── primitives/          # Base, foundational tokens
│   ├── colors.ts       # Primitive color values and opacity variants
│   └── sizes.ts        # Primitive size values (0-112px in increments of 2)
├── semantic/           # Contextual tokens that reference primitives
│   ├── colors.ts       # Semantic color tokens (action, component, content, etc.)
│   └── sizes.ts        # Semantic size tokens (radius, spacing)
├── index.ts            # Main export file
└── README.md           # This file
```

## Architecture

The design token system follows a **primitive-to-semantic** architecture:

1. **Primitive Tokens**: Base values that define raw design properties
   - Colors: Color families with shades (50-900) and base values
   - Sizes: Numeric pixel values
   - Opacity: Pre-calculated opacity variants

2. **Semantic Tokens**: Contextual tokens that reference primitives
   - Colors: Organized by function (action, component, content, etc.)
   - Sizes: Organized by purpose (radius, spacing)

## Usage

### Importing Tokens

```typescript
// Import specific token categories
import { primaryColors, textColors } from './tokens';
import { radiusTokens, spacingTokens } from './tokens';

// Import all tokens
import { tokens } from './tokens';

// Use tokens
const buttonColor = primaryColors.main;
const borderRadius = radiusTokens.md;
const padding = spacingTokens[16];
```

### TypeScript Support

All tokens are fully typed. You can use the exported types for type safety:

```typescript
import type { PrimaryColors, RadiusTokens } from './tokens';

function usePrimaryColor(color: keyof PrimaryColors) {
  return primaryColors[color];
}
```

## Token Categories

### Primitive Colors
- 19 color families (azure, basil, black, blue, fuchsia, gray, green, lime, melon, mint, orange, parakeet, red, ruby, teal, turquoise, yellow, white)
- Each family has shades 50-900 plus base values
- Opacity variants for interactive states

### Primitive Sizes
- Values from 0 to 112px in increments of 2
- Format: `size-{number}` (e.g., `size-16` = `16px`)

### Semantic Colors
- **Action**: Interactive state colors (hovered, focused, disabled, selected, active)
- **Component**: Component-specific colors (alert, button, card, chip, input, search, scrollbar)
- **Content**: Content emphasis levels
- **Error/Info/Success/Warning**: Status colors with states
- **Primary/Secondary**: Brand colors with states
- **Surface**: Surface elevation colors
- **Text**: Text color variants

### Semantic Sizes
- **Radius**: Border radius tokens (xs, sm, md, lg, xl, xxl, circle)
- **Size**: Direct size mappings
- **Spacing**: Spacing/padding tokens

## Connection Pattern

Semantic tokens reference primitives using direct value references:

```typescript
// Example: Semantic token references primitive
export const primaryColors = {
  main: primitiveColors.blue[700],  // References primitive
  dark: primitiveColors.blue[900],
  light: primitiveColors.blue[500],
};
```

## Matching Figma Structure

This token structure matches the Figma variable organization:

- `.Primitive Colors` → `tokens/primitives/colors.ts`
- `.Primitive Sizes` → `tokens/primitives/sizes.ts`
- `Colors` → `tokens/semantic/colors.ts`
- `Sizes` → `tokens/semantic/sizes.ts`

The connections between primitives and semantics are preserved, ensuring consistency when importing components from Figma.
