# Natera Storybook Component Reference

This document outlines the components studied from the Natera Storybook at https://storybook.nateralab.com/

## Button Component

**Location:** Material / Button  
**Import:** `import { Button } from "@natera/material/$button"`

### Variants & Sizes

The Button component supports multiple variants:

1. **Standard Button** - Default text button
   - Sizes: Small, Medium (default), Large
   
2. **Tonal Button** - Button with tonal background
   - Filled appearance with subtle background color
   
3. **Rounded Button** - Button with fully rounded corners
   - Pill-shaped appearance

### Usage Patterns

- Primary actions use filled/tonal variants
- Secondary actions use outlined or text variants
- Icon buttons for compact actions (search, filters, etc.)
- Consistent padding and spacing using design tokens

### Props (Observed)
- Size variants (small, medium, large)
- Style variants (standard, tonal, rounded)
- Icon support for leading/trailing icons
- Disabled states
- onClick handlers

---

## Material Select (Dropdown)

**Location:** Material / Material Select  
**Import:** `import { MaterialOption, MaterialSelect } from "@natera/material/$select"`

### Features

1. **Dropdown with Label**
   - Floating label design
   - Label animates up when focused/filled
   - Placeholder text support

2. **Visual States**
   - Default/Rest state
   - Hover state
   - Focus state (with border highlight)
   - Disabled state
   - Error state (with helper text)

3. **Design Characteristics**
   - Clean, minimal border design
   - Dropdown arrow indicator
   - Smooth transitions on state changes
   - Consistent with Material Design principles

### Usage Patterns
```tsx
<MaterialSelect label="Label">
  <MaterialOption value="option1">Option 1</MaterialOption>
  <MaterialOption value="option2">Option 2</MaterialOption>
</MaterialSelect>
```

---

## Form Module Select

**Location:** Form Module / Select  
**Import:** `import { FormField, Select, Option } from "@natera/form"`

### Features

1. **Integrated with Form Field**
   - Works with FormField wrapper for labels and validation
   - Helper text support
   - Error state management

2. **Additional Features**
   - Search/filter capability
   - Multi-select support
   - Dropdown width customization
   - Required field validation
   - Value change callbacks

### Usage Pattern
```tsx
<FormField label="Material Select">
  <Select
    label="label"
    name="name"
    placeholder="Select a value"
    required
    onValueChange={(value: string) => console.log(value)}
  >
    <Option value="1">Option 1</Option>
    <Option value="2">Option 2</Option>
  </Select>
</FormField>
```

### DropdownWidth Component
- Used to control the width of dropdown menus
- Can be set to predefined sizes (SAME_WIDTH, etc.)

---

## Other Key Components

### Search Components
- **SearchIcon** - Magnifying glass icon for search actions
- **Searchbar** - Full search input with integrated icon
- Material design with rounded corners

### Filter Components
- **Chip** - Filter chips for active filters
- Removable with close icon
- Can show count badges
- Hover and active states

### Icon Buttons
- Circular button containers
- Icon-only for compact actions
- Hover states with background color change
- Consistent sizing (small, medium, large)

---

## Design Patterns Observed

### Color Usage
- Primary actions use primary color (`--primary-color-primary-main`)
- Hover states use `--action-color-hovered`
- Selected states use `--action-color-selected`
- Borders use `--component-color-divider`

### Typography
- Consistent font family: Roboto, sans-serif
- Font sizes from design tokens
- Letter spacing for readability
- Line height for proper spacing

### Spacing
- Consistent use of spacing tokens
- 8px grid system (space-8, space-12, space-16, space-24, etc.)
- Padding and margins follow design system

### Borders & Radius
- Border radius tokens: radius-sm, radius-md, radius-circle
- 1px borders for separators
- Box shadows for elevated components

### Transitions
- Smooth transitions (0.2s ease) for hover states
- Background color changes on interaction
- Border color changes on focus

---

## Component Behavior Guidelines

### Buttons
- Show hover state on mouse enter
- Support keyboard navigation
- Disabled buttons have reduced opacity
- Loading states where applicable

### Dropdowns/Selects
- Open on click
- Close on outside click
- Close on selection (single select)
- Keyboard navigation support (arrow keys)
- Search/filter capability for long lists
- Auto-focus search input when opened

### Forms
- Validation on blur or submit
- Error states with helper text
- Required field indicators
- Clear visual feedback

---

## Integration Notes

For this project, since we're using custom design tokens, we should:

1. **Match visual styling** - Use similar border styles, colors, and spacing
2. **Follow interaction patterns** - Hover, focus, and active states
3. **Use consistent sizing** - Match button heights, input heights, etc.
4. **Apply proper spacing** - Use the spacing tokens consistently
5. **Maintain accessibility** - Keyboard navigation, ARIA labels, etc.

---

## Key Takeaways

- The Natera design system follows Material Design principles
- Heavy use of design tokens for consistency
- Clean, minimal aesthetic with subtle interactions
- Strong focus on accessibility and usability
- Components are modular and composable
