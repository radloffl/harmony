/**
 * Centralized theme and styling configuration for Harmony CLI
 *
 * This module provides:
 * - Color palette for consistent theming
 * - Spacing constants for layout
 * - Border styles for different UI elements
 * - Component-specific style presets
 */

// Color Palette
export const colors = {
    // Primary brand colors
    primary: 'cyan',
    secondary: 'blue',

    // Status colors
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',

    // Neutral colors
    text: 'white',
    textDim: 'gray',
    border: 'gray',

    // Provider-specific colors
    chatgpt: 'green',
    claude: 'magenta',
} as const;

// Spacing
export const spacing = {
    none: 0,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
} as const;

// Border Styles
export const borderStyles = {
    default: 'round',
    sharp: 'single',
    double: 'double',
    bold: 'bold',
} as const;

// Component-specific style presets
export const styles = {
    // Header styles
    header: {
        color: colors.primary,
        bold: true,
    },

    subheader: {
        color: colors.textDim,
        dimColor: true,
    },

    // Message boxes
    userMessage: {
        borderStyle: borderStyles.default,
        borderColor: colors.border,
        padding: spacing.xs,
    },

    aiMessage: {
        borderStyle: borderStyles.default,
        borderColor: colors.success,
        padding: spacing.xs,
    },

    errorMessage: {
        borderStyle: borderStyles.default,
        borderColor: colors.error,
        padding: spacing.xs,
    },

    warningMessage: {
        borderStyle: borderStyles.default,
        borderColor: colors.warning,
        padding: spacing.xs,
    },

    infoMessage: {
        borderStyle: borderStyles.default,
        borderColor: colors.info,
        padding: spacing.xs,
    },

    // Labels
    label: {
        bold: true,
    },

    // Loading states
    loading: {
        color: colors.info,
    },

    // Code/command text
    code: {
        color: colors.primary,
    },
} as const;

// Helper to get provider color
export function getProviderColor(provider: string): string {
    switch (provider.toLowerCase()) {
        case 'chatgpt':
            return colors.chatgpt;
        case 'claude':
            return colors.claude;
        default:
            return colors.primary;
    }
}

// Helper to get status color
export function getStatusColor(status: 'success' | 'error' | 'warning' | 'info'): string {
    return colors[status];
}
