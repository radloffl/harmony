# Harmony Styling System

This directory contains the centralized theming and styling configuration for the Harmony CLI.

## Overview

Instead of hardcoding colors, spacing, and styles throughout components, we use a centralized theme
system that provides:

- **Consistent colors** across all UI components
- **Standardized spacing** for layouts
- **Reusable style presets** for common UI patterns
- **Provider-specific theming** (ChatGPT vs Claude)
- **Easy customization** - change the theme in one place

## Usage

### Basic Import

```typescript
import { colors, spacing, styles } from '../styles/theme.ts';
```

### Using Colors

```tsx
// Direct color usage
<Text color={colors.primary}>Primary text</Text>
<Text color={colors.error}>Error text</Text>
<Text color={colors.textDim}>Dimmed text</Text>

// Provider-specific colors
import { getProviderColor } from '../styles/theme.ts';
const providerColor = getProviderColor('chatgpt'); // Returns 'green'
<Text color={providerColor}>ChatGPT</Text>
```

### Using Spacing

```tsx
<Box padding={spacing.xs}>Content</Box>
<Box marginTop={spacing.md}>Content</Box>
<Box paddingLeft={spacing.sm}>Content</Box>
```

### Using Style Presets

Style presets are objects that can be spread into Ink components:

```tsx
// Apply header styling
<Text {...styles.header}>Harmony AI CLI</Text>

// Apply message box styling
<Box {...styles.userMessage} flexDirection="column">
  <Text>User message</Text>
</Box>

// Apply error styling
<Box {...styles.errorMessage}>
  <Text color={colors.error}>Error occurred</Text>
</Box>
```

### Combining Styles

You can combine style presets with additional props:

```tsx
<Text {...styles.label} color={colors.success}>
  Success Label
</Text>

<Box {...styles.aiMessage} flexDirection="column">
  <Text>AI response</Text>
</Box>
```

## Theme Structure

### Colors

```typescript
colors = {
    // Brand
    primary: 'cyan',
    secondary: 'blue',

    // Status
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',

    // Neutral
    text: 'white',
    textDim: 'gray',
    border: 'gray',

    // Providers
    chatgpt: 'green',
    claude: 'magenta',
};
```

### Spacing

```typescript
spacing = {
    none: 0,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
};
```

### Border Styles

```typescript
borderStyles = {
    default: 'round',
    sharp: 'single',
    double: 'double',
    bold: 'bold',
};
```

### Style Presets

#### Headers

- `styles.header` - Main headers (bold, primary color)
- `styles.subheader` - Subheaders (dimmed)

#### Message Boxes

- `styles.userMessage` - User input boxes (gray border)
- `styles.aiMessage` - AI response boxes (success/green border)
- `styles.errorMessage` - Error boxes (red border)
- `styles.warningMessage` - Warning boxes (yellow border)
- `styles.infoMessage` - Info boxes (blue border)

#### Text

- `styles.label` - Bold labels
- `styles.code` - Code/command text (cyan)
- `styles.loading` - Loading state text (blue)

## Helpers

### `getProviderColor(provider: string)`

Returns the appropriate color for a provider:

```typescript
getProviderColor('chatgpt'); // Returns 'green'
getProviderColor('claude'); // Returns 'magenta'
getProviderColor('unknown'); // Returns 'cyan' (primary)
```

### `getStatusColor(status: 'success' | 'error' | 'warning' | 'info')`

Returns the appropriate color for a status:

```typescript
getStatusColor('success'); // Returns 'green'
getStatusColor('error'); // Returns 'red'
getStatusColor('warning'); // Returns 'yellow'
getStatusColor('info'); // Returns 'blue'
```

## Customization

To customize the theme, edit `/src/styles/theme.ts`:

1. **Change colors**: Update the `colors` object
2. **Adjust spacing**: Modify the `spacing` values
3. **Add new presets**: Add to the `styles` object
4. **Custom helpers**: Add new utility functions

Example - Adding a new color:

```typescript
export const colors = {
    // ... existing colors
    accent: 'magenta', // New accent color
} as const;
```

Example - Adding a new style preset:

```typescript
export const styles = {
    // ... existing styles
    highlight: {
        backgroundColor: colors.accent,
        color: colors.text,
        bold: true,
    },
} as const;
```

## Best Practices

1. **Always use theme values** instead of hardcoding colors/spacing
2. **Use style presets** for common UI patterns
3. **Don't mix hardcoded and theme values** in the same component
4. **Add new presets** to `theme.ts` rather than duplicating styles
5. **Document new additions** in this README

## Migration Guide

If you have hardcoded styles in a component, here's how to migrate:

### Before:

```tsx
<Text bold color="cyan">Title</Text>
<Box borderStyle="round" borderColor="gray" padding={1}>
  <Text>Content</Text>
</Box>
```

### After:

```tsx
import { colors, styles, spacing } from '../styles/theme.ts';

<Text {...styles.header}>Title</Text>
<Box {...styles.userMessage}>
  <Text>Content</Text>
</Box>
```

## Examples

See the following components for real-world usage:

- `/src/ui/ChatUI.tsx` - Chat interface with themed messages
- `/src/ui/CompletionUI.tsx` - Completion interface
- `/src/ui/ErrorUI.tsx` - Error display with contextual styling
