# Natera Design System - Design Token Structure

## Overview

This document outlines the design token structure within the Natera Design System Figma file, focusing on the connection points between variable collections: `.Primitive Colors`, `.Primitive Sizes`, `Colors`, `Sizes`, and `Typography`.

## Architecture

The design token system follows a **primitive-to-semantic** architecture:

1. **Primitive Tokens** (`.Primitive Colors`, `.Primitive Sizes`): Base, foundational design values
2. **Semantic Tokens** (`Colors`, `Sizes`, `Typography`): Contextual tokens that reference primitives

---

## 1. Primitive Colors (`.Primitive Colors`)

### Structure
Primitive colors are organized into color families, each containing shades from 50-900, plus base values and opacity variants.

### Color Families
- **Azure** (azure-50 through azure-900)
- **Basil** (basil-50 through basil-900)
- **Black** (black-50 through black-900, blackBase)
- **Blue** (blue-50 through blue-900)
- **Fuchsia** (fuchsia-50 through fuchsia-900)
- **Gray** (gray-50 through gray-900, grayBase)
- **Green** (green-50 through green-900)
- **Lime** (lime-50 through lime-900)
- **Melon** (melon-50 through melon-900)
- **Mint** (mint-50 through mint-900)
- **Orange** (orange-50 through orange-900)
- **Parakeet** (parakeet-50 through parakeet-900)
- **Red** (red-50 through red-900, redBase)
- **Ruby** (ruby-50 through ruby-900)
- **Teal** (teal-50 through teal-900)
- **Turquoise** (turquoise-50 through turquoise-900)
- **Yellow** (yellow-50 through yellow-900)
- **White** (white)
- **Black** (blackBase)

### Opacity Variants
Each color family includes opacity variants in the format: `opacity/{color-family}/{color-family}-op{percentage}`
- Example: `opacity/gray/gray-op04`, `opacity/gray/gray-op08`, `opacity/gray/gray-op12`, etc.
- Example: `opacity/blue/blue-op04`, `opacity/blue/blue-op12`, `opacity/blue/blue-op20`, etc.

---

## 2. Primitive Sizes (`.Primitive Sizes`)

### Structure
Primitive sizes are numeric values in pixel increments of 2, ranging from 0 to 112.

### Size Values
- **Range**: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112

### Naming Convention
- Format: `size-{number}` (e.g., `size-2`, `size-4`, `size-16`, `size-100`)

---

## 3. Colors (Semantic)

### Structure
Semantic color tokens are organized into functional categories and reference primitive colors.

### Connection Pattern
Semantic colors reference primitives using the format: `({primitive-path})`
- Example: `(azure/azure-50)` references the primitive `azure-50`
- Example: `(opacity/gray/gray-op04)` references an opacity variant

### Categories

#### Action Colors
- `color-action-hovered` → `(opacity/gray/gray-op04)`
- `color-action-focused` → `(opacity/gray/gray-op12)`
- `color-action-disabled` → `(opacity/gray/gray-op38)`
- `color-action-selected` → `(opacity/gray/gray-op08)`
- `color-action-active` → `(opacity/gray/gray-op54)`

#### Color Swatches
Direct mappings to primitive color families:
- `color-swatch/azure/azure-50` through `azure-900` → `(azure/azure-{shade})`
- `color-swatch/basil/basil-50` through `basil-900` → `(basil/basil-{shade})`
- Similar patterns for all color families (black, blue, fuchsia, gray, green, lime, melon, mint, orange, parakeet, red, ruby, teal, turquoise, yellow)

#### Component Colors

**Alert Component:**
- `component/alert/color-alert-error-fill` → `(red/red-50)`
- `component/alert/color-alert-error-content` → `(red/red-600)`
- `component/alert/color-alert-warning-fill` → `(orange/orange-50)`
- `component/alert/color-alert-info-fill` → `(turquoise/turquoise-100)`
- `component/alert/color-alert-success-fill` → `(basil/basil-100)`

**Button Component:**
- `component/button/color-button-outlined-border` → `(opacity/blue/blue-op60)`
- `component/button/color-button-tonal-fill` → `(opacity/blue/blue-op12)`

**Card Component:**
- `component/card/elevated/color-card-elevated-enabled-fill` → `(white)`
- `component/card/filled/color-card-filled-enabled-fill` → `(gray/gray-50)`
- `component/card/outlined/color-card-outlined-enabled-border` → `(opacity/black/black-op16)`

**Chip Component:**
- `component/chip/color-chip-enabled-fill` → `(gray/gray-100)`
- `component/chip/color-chip-selected-fill` → `(opacity/blue/blue-op20)`

**Input Component:**
- `component/input/filled/color-input-filled-enabled-fill` → `(opacity/gray/gray-op06)`
- `component/input/outlined/color-input-outlined-enabled-border` → `(opacity/gray/gray-op38)`

**Scrollbar Component:**
- `component/scrollbar/color-scrollbar` → `(opacity/black/black-op26)`
- `component/scrollbar/color-scrollbar-background` → `(black/black-50)`

**Search Component:**
- `component/search/color-search-enabled-border` → `(opacity/gray/gray-op30)`

#### Content Colors
- `content/color-content-highest-emphasis` → `(opacity/gray/gray-op87)`
- `content/color-content-high-emphasis` → `(opacity/gray/gray-op54)`
- `content/color-content-medium-emphasis` → `(opacity/gray/gray-op38)`
- `content/color-content-low-emphasis` → `(opacity/gray/gray-op12)`
- `content/color-content-lowest-emphasis` → `(opacity/gray/gray-op04)`

#### Content Inverse Colors
- `content/inverse/color-content-highest-emphasis-inverse` → `(white)`
- `content/inverse/color-content-high-emphasis-inverse` → `(opacity/white/white-op70)`
- `content/inverse/color-content-medium-emphasis-inverse` → `(opacity/white/white-op50)`

#### Error Colors
- `error/color-error-main` → `(red/redBase)`
- `error/color-error-dark` → `(red/red-800)`
- `error/color-error-light` → `(red/red-500)`
- `error/color-error-on-error` → `(white)`
- `error/states/color-error-hovered` → `(opacity/red/red-op04)`

#### Info Colors
- `info/color-info-main` → `(turquoise/turquoise-700)`
- `info/color-info-dark` → `(turquoise/turquoise-900)`
- `info/color-info-light` → `(turquoise/turquoise-500)`
- `info/states/color-info-hovered` → `(opacity/turquoise/turquoise-op04)`

#### Primary Colors
- `primary/color-primary-main` → `(blue/blue-700)`
- `primary/color-primary-dark` → `(blue/blue-900)`
- `primary/color-primary-light` → `(blue/blue-500)`
- `primary/color-primary-on-primary` → `(white)`
- `primary/states/color-primary-hovered` → `(opacity/blue/blue-op04)`

#### Secondary Colors
- `secondary/color-secondary-main` → `(green/green-800)`
- `secondary/color-secondary-dark` → `(green/green-900)`
- `secondary/color-secondary-light` → `(green/green-600)`
- `secondary/states/color-secondary-hovered` → `(opacity/green/green-op04)`

#### Success Colors
- `success/color-success-main` → `(basil/basil-700)`
- `success/color-success-dark` → `(basil/basil-900)`
- `success/color-success-light` → `(basil/basil-600)`
- `success/states/color-success-hovered` → `(opacity/mint/mint-op04)`

#### Surface Colors
- `surface/color-surface-high` → `(gray/gray-200)`
- `surface/color-surface-medium` → `(gray/gray-100)`
- `surface/color-surface-low` → `(gray/gray-30)`
- `surface/color-surface-highest` → `(gray/gray-300)`
- `surface/color-surface-lowest` → `(white)`

#### Surface Inverse Colors
- `surface/inverse/color-surface-highest-inverse` → `(gray/gray-600)`
- `surface/inverse/color-surface-high-inverse` → `(gray/gray-700)`
- `surface/inverse/color-surface-medium-inverse` → `(gray/gray-800)`
- `surface/inverse/color-surface-low-inverse` → `(gray/gray-900)`
- `surface/inverse/color-surface-lowest-inverse` → `(gray/grayBase)`

#### Text Colors
- `text/color-text-primary` → `(opacity/gray/gray-op87)`
- `text/color-text-secondary` → `(opacity/gray/gray-op60)`
- `text/color-text-disabled` → `(opacity/gray/gray-op38)`
- `text/color-text-tertiary` → `(opacity/gray/gray-op44)`
- `text/color-text-link` → `(primary/color-primary-main)` (references semantic primary)

#### Warning Colors
- `warning/color-warning-main` → `(orange/orange-500)`
- `warning/color-warning-dark` → `(orange/orange-800)`
- `warning/color-warning-light` → `(orange/orange-400)`
- `warning/states/color-warning-hovered` → `(opacity/orange/orange-op04)`

#### Component-Specific Colors
- `component/color-divider` → `(opacity/black/black-op16)`
- `component/color-scrim` → `(opacity/black/black-op38)`
- `component/color-divider-light` → `(opacity/black/black-op08)`

---

## 4. Sizes (Semantic)

### Structure
Semantic size tokens are organized into categories: `radius`, `size`, and `spacing`.

### Connection Pattern
Semantic sizes reference primitive sizes using the format: `(size-{number})`

### Categories

#### Radius Tokens
- `radius/radius-xs` → `(size-2)` = 2px
- `radius/radius-sm` → `(size-4)` = 4px
- `radius/radius-md` → `(size-8)` = 8px
- `radius/radius-lg` → `(size-12)` = 12px
- `radius/radius-xl` → `(size-16)` = 16px
- `radius/radius-xxl` → `(size-24)` = 24px
- `radius/radius-circle` → `(size-100)` = 100px

#### Size Tokens
Direct mappings to primitive sizes:
- `size/size-2` → `(size-2)` = 2px
- `size/size-4` → `(size-4)` = 4px
- `size/size-6` → `(size-6)` = 6px
- `size/size-8` → `(size-8)` = 8px
- `size/size-10` → `(size-10)` = 10px
- `size/size-12` → `(size-12)` = 12px
- `size/size-14` → `(size-14)` = 14px
- `size/size-16` → `(size-16)` = 16px
- `size/size-18` → `(size-18)` = 18px
- `size/size-20` → `(size-20)` = 20px
- `size/size-24` → `(size-24)` = 24px
- `size/size-32` → `(size-32)` = 32px
- `size/size-40` → `(size-40)` = 40px
- `size/size-48` → `(size-48)` = 48px
- `size/size-56` → `(size-56)` = 56px
- `size/size-64` → `(size-64)` = 64px
- `size/size-72` → `(size-72)` = 72px
- `size/size-80` → `(size-80)` = 80px
- `size/size-88` → `(size-88)` = 88px
- `size/size-96` → `(size-96)` = 96px

#### Spacing Tokens
- `spacing/space-2` → `(size-2)` = 2px
- `spacing/space-4` → `(size-4)` = 4px
- `spacing/space-8` → `(size-8)` = 8px
- `spacing/space-12` → `(size-12)` = 12px
- `spacing/space-16` → `(size-16)` = 16px
- `spacing/space-20` → `(size-20)` = 20px
- `spacing/space-24` → `(size-24)` = 24px
- `spacing/space-32` → `(size-32)` = 32px
- `spacing/space-40` → `(size-40)` = 40px
- `spacing/space-48` → `(size-48)` = 48px
- `spacing/space-56` → `(size-56)` = 56px
- `spacing/space-64` → `(size-64)` = 64px
- `spacing/space-72` → `(size-72)` = 72px
- `spacing/space-80` → `(size-80)` = 80px
- `spacing/space-88` → `(size-88)` = 88px
- `spacing/space-96` → `(size-96)` = 96px

---

## 5. Typography

### Structure
The Typography collection appears to be minimal or empty in the current design system. The container exists with a header structure but contains no typography variable definitions at this time.

---

## Connection Points Summary

### Color Connections

1. **Primitive → Semantic Direct Mapping**
   - Color swatches directly map primitive colors (e.g., `azure-50` → `(azure/azure-50)`)

2. **Primitive → Semantic with Opacity**
   - Many semantic tokens use opacity variants (e.g., `color-action-hovered` → `(opacity/gray/gray-op04)`)

3. **Primitive → Semantic with Shade Selection**
   - Semantic tokens select specific shades from primitives (e.g., `color-primary-main` → `(blue/blue-700)`)

4. **Semantic → Semantic**
   - Some semantic tokens reference other semantic tokens (e.g., `color-text-link` → `(primary/color-primary-main)`)

### Size Connections

1. **Primitive → Semantic Direct Mapping**
   - Size tokens directly map primitive sizes (e.g., `size-16` → `(size-16)`)

2. **Primitive → Semantic with Semantic Naming**
   - Radius and spacing tokens use semantic names but reference primitives (e.g., `radius-md` → `(size-8)`)

---

## Design Principles

1. **Separation of Concerns**: Primitives contain raw values; semantics contain contextual meaning
2. **Reusability**: Primitives are referenced multiple times across semantic tokens
3. **Consistency**: Similar patterns are used across token types (e.g., opacity variants follow the same naming)
4. **Scalability**: The system supports easy updates by changing primitives, which cascade to all semantic tokens

---

## Token Naming Conventions

### Primitive Colors
- Format: `{color-family}-{shade}` or `{color-family}Base`
- Opacity: `opacity/{color-family}/{color-family}-op{percentage}`

### Primitive Sizes
- Format: `size-{number}`

### Semantic Colors
- Format: `{category}/{subcategory}/color-{name}`
- Examples: `primary/color-primary-main`, `component/alert/color-alert-error-fill`

### Semantic Sizes
- Format: `{category}/{name}`
- Examples: `radius/radius-md`, `spacing/space-16`

---

## Notes

- The design system uses a single mode: "NateraTools"
- All semantic tokens reference primitives, ensuring consistency
- Opacity variants are extensively used for interactive states and overlays
- The system supports component-specific color tokens for fine-grained control
- Typography tokens are not yet defined in the current structure
