import Anthropic from '@anthropic-ai/sdk';
import type {
    AIProvider,
    ChatMessage,
    ChatResponse,
    CompletionResponse,
    RequestOptions,
} from '../types/index.ts';

class ClaudeAPI implements AIProvider {
    private client: Anthropic;
    private defaultModel: string;

    constructor(apiKey: string) {
        this.client = new Anthropic({ apiKey });
        this.defaultModel = 'claude-3-5-sonnet-20241022';
    }

    async sendChatRequest(
        messages: ChatMessage[],
        options?: RequestOptions,
    ): Promise<ChatResponse> {
        const response = await this.client.messages.create({
            model: options?.model || this.defaultModel,
            max_tokens: options?.maxTokens || 1024,
            messages: messages.map((msg) => ({
                role: msg.role === 'system' ? 'user' : msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
            temperature: options?.temperature,
            top_p: options?.topP,
        });

        const textContent = response.content
            .filter((block): block is Anthropic.TextBlock => block.type === 'text')
            .map((block) => block.text)
            .join('');

        return {
            content: textContent,
            model: response.model,
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens,
            },
        };
    }

    async sendCompletionRequest(
        prompt: string,
        options?: RequestOptions,
    ): Promise<CompletionResponse> {
        // Claude uses the chat completions format, so we convert the prompt to a message
        const response = await this.sendChatRequest([
            { role: 'user', content: prompt },
        ], options);

        return {
            text: response.content,
            model: response.model,
            usage: response.usage,
        };
    }
}

export default ClaudeAPI;
