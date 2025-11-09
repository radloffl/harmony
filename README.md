# Harmony AI CLI

A beautiful command-line interface for interacting with AI providers (OpenAI and Claude) using
React-like components via Ink.

## Features

- 🎨 **Beautiful CLI UI** - Built with Ink (React for CLIs)
- 🤖 **Multi-Provider Support** - Works with both ChatGPT and Claude
- 🔄 **Automatic Provider Selection** - Auto-detects available API keys
- 💬 **Chat & Completion** - Support for both chat and text completion modes
- 🎯 **Type-Safe** - Built with TypeScript for Deno
- ✨ **Helpful Error Messages** - Beautiful error UI with contextual help and quick fixes

## Installation

Make sure you have [Deno](https://deno.land/) installed.

```bash
git clone <your-repo>
cd harmony
```

## Configuration

Set your API key(s) as environment variables:

```bash
# For ChatGPT
export OPENAI_API_KEY="your-openai-key"

# For Claude
export ANTHROPIC_API_KEY="your-anthropic-key"

# Optional: Set preferred provider
export AI_PROVIDER="chatgpt"  # or "claude"
```

## Usage

### Chat Mode

```bash
deno task dev chat "What is the meaning of life?"
```

### Completion Mode

```bash
deno task dev complete "Once upon a time"
```

### Using Different Providers

```bash
# Use Claude
AI_PROVIDER=claude deno task dev chat "Hello Claude!"

# Use ChatGPT (default if OPENAI_API_KEY is set)
deno task dev chat "Hello GPT!"
```

### Using the --prompt Flag

```bash
deno task dev chat --prompt "Explain quantum computing"
```

## Directory Structure

```
harmony/
├── src/
│   ├── main.tsx             # Entry point
│   ├── commands/
│   │   └── index.tsx        # Command handlers with Ink UI
│   ├── api/
│   │   ├── chatgpt.ts       # ChatGPT API implementation
│   │   └── claude.ts        # Claude API implementation
│   ├── ui/
│   │   ├── ChatUI.tsx       # Chat UI component
│   │   ├── CompletionUI.tsx # Completion UI component
│   │   └── ErrorUI.tsx      # Error UI component
│   ├── styles/
│   │   ├── theme.ts         # Centralized theme & styling
│   │   └── README.md        # Styling documentation
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── utils/
│       └── provider.ts      # Provider factory & selection
├── deno.json                # Deno configuration
└── README.md
```

## Architecture

The project uses a provider pattern to support multiple AI APIs:

- **AIProvider Interface** - Common interface for all AI providers
- **ChatGPT & Claude Implementations** - Specific implementations for each provider
- **Provider Factory** - Automatically selects and creates the appropriate provider
- **Ink UI Components** - React-like components for beautiful CLI output
- **Centralized Theme** - Consistent colors, spacing, and styles across all UI components

### Styling System

Harmony uses a centralized theming system for consistent UI:

```typescript
import { colors, styles, spacing } from './styles/theme.ts';

// Use theme colors
<Text color={colors.primary}>Title</Text>

// Use style presets
<Box {...styles.userMessage}>Content</Box>

// Use spacing constants
<Box padding={spacing.md}>Content</Box>
```

See [src/styles/README.md](src/styles/README.md) for complete styling documentation.

## Development

```bash
# Run in development mode
deno task dev

# Run with specific command
deno task dev chat "your prompt"

# Format code
deno fmt

# Check types
deno check src/main.tsx
```

## Adding New Providers

To add a new AI provider:

1. Create a new file in `src/api/` (e.g., `gemini.ts`)
2. Implement the `AIProvider` interface
3. Add the provider to `src/utils/provider.ts`
4. Update the `ProviderType` union type

## Contributing

Contributions are welcome! If you would like to contribute to the project, please fork the
repository and submit a pull request.

## License

This project is licensed under the MIT License.
