# Figma Variable Mapping

This document maps the Figma variable structure to the design token files.

## File Structure Mapping

| Figma Variable Collection | Token File | Description |
|---------------------------|------------|-------------|
| `.Primitive Colors` | `tokens/primitives/colors.ts` | Base color values organized by color family |
| `.Primitive Sizes` | `tokens/primitives/sizes.ts` | Base size values (0-112px) |
| `Colors` | `tokens/semantic/colors.ts` | Semantic color tokens that reference primitives |
| `Sizes` | `tokens/semantic/sizes.ts` | Semantic size tokens (radius, spacing) |
| `Typography` | (Not yet implemented) | Typography tokens (empty in Figma) |

## Primitive Colors Mapping

### Color Families
All 19 color families from Figma are represented:
- `azure`, `basil`, `black`, `blue`, `fuchsia`, `gray`, `green`, `lime`, `melon`, `mint`, `orange`, `parakeet`, `red`, `ruby`, `teal`, `turquoise`, `yellow`, `white`

### Shades
Each family includes shades 50-900, matching Figma:
- `primitiveColors.azure[50]` → Figma `azure-50`
- `primitiveColors.azure[100]` → Figma `azure-100`
- ... through `azure[900]`

### Base Values
Special base values are included:
- `primitiveColors.gray.base` → Figma `grayBase` (`#191c1d`)
- `primitiveColors.red.base` → Figma `redBase` (`#ba1a1a`)
- `primitiveColors.black.base` → Figma `blackBase` (`#000000`)
- `primitiveColors.white.base` → Figma `white` (`#ffffff`)

### Opacity Variants
Opacity variants match Figma naming:
- `opacityColors.gray.op04` → Figma `(opacity/gray/gray-op04)`
- `opacityColors.blue.op12` → Figma `(opacity/blue/blue-op12)`

## Primitive Sizes Mapping

All size values from 0 to 112px (increments of 2) are included:
- `primitiveSizes[2]` → Figma `size-2` = `2px`
- `primitiveSizes[16]` → Figma `size-16` = `16px`
- `primitiveSizes[100]` → Figma `size-100` = `100px`

## Semantic Colors Mapping

### Action Colors
- `actionColors.hovered` → Figma `color-action-hovered` → `(opacity/gray/gray-op04)`
- `actionColors.focused` → Figma `color-action-focused` → `(opacity/gray/gray-op12)`
- `actionColors.disabled` → Figma `color-action-disabled` → `(opacity/gray/gray-op38)`
- `actionColors.selected` → Figma `color-action-selected` → `(opacity/gray/gray-op08)`
- `actionColors.active` → Figma `color-action-active` → `(opacity/gray/gray-op54)`

### Primary Colors
- `primaryColors.main` → Figma `color-primary-main` → `(blue/blue-700)`
- `primaryColors.dark` → Figma `color-primary-dark` → `(blue/blue-900)`
- `primaryColors.light` → Figma `color-primary-light` → `(blue/blue-500)`
- `primaryColors.states.hovered` → Figma `color-primary-hovered` → `(opacity/blue/blue-op04)`

### Component Colors
All component-specific colors are mapped:
- `alertColors.error.fill` → Figma `component/alert/color-alert-error-fill` → `(red/red-50)`
- `buttonColors.outlined.border` → Figma `component/button/color-button-outlined-border` → `(opacity/blue/blue-op60)`
- `cardColors.elevated.enabledFill` → Figma `component/card/elevated/color-card-elevated-enabled-fill` → `(white)`

## Semantic Sizes Mapping

### Radius Tokens
- `radiusTokens.xs` → Figma `radius/radius-xs` → `(size-2)` = `2px`
- `radiusTokens.sm` → Figma `radius/radius-sm` → `(size-4)` = `4px`
- `radiusTokens.md` → Figma `radius/radius-md` → `(size-8)` = `8px`
- `radiusTokens.lg` → Figma `radius/radius-lg` → `(size-12)` = `12px`
- `radiusTokens.xl` → Figma `radius/radius-xl` → `(size-16)` = `16px`
- `radiusTokens.xxl` → Figma `radius/radius-xxl` → `(size-24)` = `24px`
- `radiusTokens.circle` → Figma `radius/radius-circle` → `(size-100)` = `100px`

### Spacing Tokens
- `spacingTokens[4]` → Figma `spacing/space-4` → `(size-4)` = `4px`
- `spacingTokens[16]` → Figma `spacing/space-16` → `(size-16)` = `16px`
- All spacing values from 2 to 96px are included

## Connection Pattern

The token structure preserves the Figma connection pattern:

1. **Direct Reference**: Semantic tokens directly reference primitive values
   ```typescript
   primaryColors.main = primitiveColors.blue[700]
   ```

2. **Opacity Reference**: Semantic tokens use opacity variants
   ```typescript
   actionColors.hovered = opacityColors.gray.op04
   ```

3. **Semantic-to-Semantic**: Some semantic tokens reference other semantic tokens
   ```typescript
   textColors.link = primaryColors.main
   ```

## Usage in Components

When importing components from Figma, the variable references will map directly:

```typescript
// Figma variable: (blue/blue-700)
// Maps to: primitiveColors.blue[700] or primaryColors.main

// Figma variable: (opacity/gray/gray-op04)
// Maps to: opacityColors.gray.op04 or actionColors.hovered

// Figma variable: (size-16)
// Maps to: primitiveSizes[16] or spacingTokens[16] or radiusTokens.xl
```

## Verification Checklist

- ✅ All primitive color families included (19 families)
- ✅ All color shades included (50-900 for each family)
- ✅ All base values included (grayBase, redBase, blackBase, white)
- ✅ Opacity variants included for all used color families
- ✅ All primitive sizes included (0-112px)
- ✅ All semantic color categories included
- ✅ All component-specific colors included
- ✅ All radius tokens included
- ✅ All spacing tokens included
- ✅ Connection patterns preserved (primitive → semantic)
- ✅ TypeScript types exported for type safety
