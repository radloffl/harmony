import type { AIProvider } from '../types/index.ts';
import ChatGPTAPI from '../api/chatgpt.ts';
import ClaudeAPI from '../api/claude.ts';

export type ProviderType = 'chatgpt' | 'claude';

export function createProvider(type: ProviderType, apiKey: string): AIProvider {
    switch (type) {
        case 'chatgpt':
            return new ChatGPTAPI(apiKey);
        case 'claude':
            return new ClaudeAPI(apiKey);
        default:
            throw new Error(`Unknown provider type: ${type}`);
    }
}

export function getProviderFromEnv(): { type: ProviderType; apiKey: string } {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    const claudeKey = Deno.env.get('ANTHROPIC_API_KEY');
    const preferredProvider = Deno.env.get('AI_PROVIDER') as ProviderType | undefined;

    // If a preferred provider is set, use it
    if (preferredProvider === 'chatgpt' && openaiKey) {
        return { type: 'chatgpt', apiKey: openaiKey };
    }
    if (preferredProvider === 'claude' && claudeKey) {
        return { type: 'claude', apiKey: claudeKey };
    }

    // Otherwise, fall back to the first available key
    if (openaiKey) {
        return { type: 'chatgpt', apiKey: openaiKey };
    }
    if (claudeKey) {
        return { type: 'claude', apiKey: claudeKey };
    }

    throw new Error(
        'No API key found. Set OPENAI_API_KEY or ANTHROPIC_API_KEY environment variable.',
    );
}
