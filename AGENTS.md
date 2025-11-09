# AGENTS.md

## AI Agent Integration Guide for Harmony CLI

This document provides guidance for AI agents and LLMs (Large Language Models) on how to understand,
use, and integrate with the Harmony CLI project.

## Project Overview

**Harmony** is a Deno-based command-line interface that provides a unified interface for interacting
with multiple AI providers (ChatGPT and Claude) using beautiful React-like UI components via Ink.

### Core Purpose

- Provide a simple, elegant CLI for AI chat and completion requests
- Abstract away provider-specific implementations behind a common interface
- Deliver helpful, contextual error messages with quick-fix suggestions
- Enable easy switching between ChatGPT and Claude

## Architecture for AI Agents

### Provider Pattern

Harmony uses a **provider pattern** that AI agents should understand:

1. **AIProvider Interface** (`src/types/index.ts`)
   - Defines common methods: `sendChatRequest()` and `sendCompletionRequest()`
   - All providers implement this interface for consistency

2. **Provider Implementations**
   - `ChatGPTAPI` (`src/api/chatgpt.ts`) - Uses OpenAI SDK
   - `ClaudeAPI` (`src/api/claude.ts`) - Uses Anthropic SDK

3. **Provider Factory** (`src/utils/provider.ts`)
   - `createProvider()` - Creates provider instances
   - `getProviderFromEnv()` - Auto-selects based on environment variables

### UI Components (Ink/React)

All UI is built with React-like components:

- `ChatUI.tsx` - Displays chat interactions
- `CompletionUI.tsx` - Displays text completions
- `ErrorUI.tsx` - Shows helpful error messages with context

## How AI Agents Can Use Harmony

### As a Library

AI agents can import and use Harmony's provider system:

```typescript
import { createProvider } from './src/utils/provider.ts';

const provider = createProvider('chatgpt', apiKey);
const response = await provider.sendChatRequest([
    { role: 'user', content: 'Hello!' },
]);
```

### As a CLI Tool

AI agents can invoke Harmony as a subprocess:

```bash
# Chat with ChatGPT
OPENAI_API_KEY=xxx deno run --allow-net --allow-env src/main.tsx chat "your prompt"

# Chat with Claude
ANTHROPIC_API_KEY=xxx AI_PROVIDER=claude deno run --allow-net --allow-env src/main.tsx chat "your prompt"
```

### Environment Variables

```bash
OPENAI_API_KEY      # Required for ChatGPT
ANTHROPIC_API_KEY   # Required for Claude
AI_PROVIDER         # Optional: 'chatgpt' or 'claude'
```

## Adding New Providers

AI agents can extend Harmony by adding new providers:

1. **Create Provider Class** in `src/api/`
   ```typescript
   import type { AIProvider } from '../types/index.ts';

   class NewProviderAPI implements AIProvider {
       async sendChatRequest(messages, options) {/* ... */}
       async sendCompletionRequest(prompt, options) {/* ... */}
   }
   ```

2. **Update Provider Factory** in `src/utils/provider.ts`
   ```typescript
   export type ProviderType = 'chatgpt' | 'claude' | 'newprovider';

   export function createProvider(type: ProviderType, apiKey: string) {
       switch (type) {
           case 'newprovider':
               return new NewProviderAPI(apiKey);
               // ...
       }
   }
   ```

3. **Update Environment Detection** in `getProviderFromEnv()`

## Type Definitions

### Core Interfaces

```typescript
interface AIProvider {
    sendChatRequest(messages: ChatMessage[], options?: RequestOptions): Promise<ChatResponse>;
    sendCompletionRequest(prompt: string, options?: RequestOptions): Promise<CompletionResponse>;
}

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}
```

## Model Context Protocol (MCP) Compatibility

While Harmony doesn't currently implement MCP, it follows similar principles:

- **Standardized Interface**: All providers use the same `AIProvider` interface
- **Tool Abstraction**: Chat and completion methods abstract provider specifics
- **Resource Access**: Providers handle API keys and model selection
- **Error Handling**: Contextual errors guide users to solutions

### Future MCP Integration

To make Harmony MCP-compatible, consider:

- Implementing MCP server protocol
- Exposing providers as MCP resources
- Adding MCP transport layer for client connections

## Agent Capabilities

AI agents working with Harmony can:

✅ **Read** - Understand the codebase structure and provider pattern\
✅ **Execute** - Run CLI commands to test functionality\
✅ **Extend** - Add new AI providers following the established pattern\
✅ **Integrate** - Use Harmony as a library in other Deno projects\
✅ **Debug** - Leverage error UI for troubleshooting

## Testing & Development

### Running Tests

```bash
# Test with mock API key
OPENAI_API_KEY=test deno task dev chat "test prompt"
```

### Adding Features

1. Modify types in `src/types/index.ts`
2. Update provider implementations
3. Add UI components if needed
4. Update documentation

## Security Considerations

⚠️ **API Keys**: Never commit API keys to the repository\
⚠️ **Environment Variables**: Use `.env` files (add to `.gitignore`)\
⚠️ **Permissions**: Deno requires explicit permissions (`--allow-net`, `--allow-env`)

## Dependencies

- **Deno Runtime** - Modern TypeScript/JavaScript runtime
- **OpenAI SDK** (`npm:openai`) - Official OpenAI client
- **Anthropic SDK** (`npm:@anthropic-ai/sdk`) - Official Claude client
- **Ink** (`npm:ink`) - React for CLIs
- **React** (`npm:react`) - UI component library

## Contribution Guidelines

AI agents contributing to Harmony should:

1. Follow the existing provider pattern
2. Maintain TypeScript strict mode compliance
3. Add error handling with helpful messages
4. Update documentation (README.md and AGENTS.md)
5. Test with both ChatGPT and Claude providers

## References

- [Main Documentation](./README.md)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Deno Documentation](https://deno.land/manual)

---

**Note for AI Agents**: This project is designed to be agent-friendly. The codebase uses clear
patterns, strong typing, and helpful error messages to facilitate both human and AI interaction.
When modifying or extending Harmony, maintain these principles to ensure continued agent
compatibility.
