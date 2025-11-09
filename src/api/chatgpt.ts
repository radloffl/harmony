import OpenAI from 'openai';
import type {
    AIProvider,
    ChatMessage,
    ChatResponse,
    CompletionResponse,
    RequestOptions,
} from '../types/index.ts';

class ChatGPTAPI implements AIProvider {
    private client: OpenAI;
    private defaultChatModel: string;
    private defaultCompletionModel: string;

    constructor(apiKey: string) {
        this.client = new OpenAI({ apiKey });
        this.defaultChatModel = 'gpt-4o-mini';
        this.defaultCompletionModel = 'gpt-3.5-turbo-instruct';
    }

    async sendChatRequest(
        messages: ChatMessage[],
        options?: RequestOptions,
    ): Promise<ChatResponse> {
        const response = await this.client.chat.completions.create({
            model: options?.model || this.defaultChatModel,
            messages: messages.map((message) => ({
                role: message.role,
                content: message.content,
            })) as OpenAI.Chat.ChatCompletionMessageParam[],
            max_tokens: options?.maxTokens,
            temperature: options?.temperature,
            top_p: options?.topP,
        });

        const choice = response.choices[0];
        const content = this.extractChatContent(choice.message?.content);

        return {
            content,
            model: response.model ?? options?.model ?? this.defaultChatModel,
            usage: {
                promptTokens: response.usage?.prompt_tokens ?? 0,
                completionTokens: response.usage?.completion_tokens ?? 0,
                totalTokens: response.usage?.total_tokens ?? 0,
            },
        };
    }

    async sendCompletionRequest(
        prompt: string,
        options?: RequestOptions,
    ): Promise<CompletionResponse> {
        const response = await this.client.completions.create({
            model: options?.model || this.defaultCompletionModel,
            prompt,
            max_tokens: options?.maxTokens ?? 100,
            temperature: options?.temperature,
            top_p: options?.topP,
        });

        const choice = response.choices[0];

        return {
            text: choice.text ?? '',
            model: response.model ?? options?.model ?? this.defaultCompletionModel,
            usage: {
                promptTokens: response.usage?.prompt_tokens ?? 0,
                completionTokens: response.usage?.completion_tokens ?? 0,
                totalTokens: response.usage?.total_tokens ?? 0,
            },
        };
    }

    private extractChatContent(content: unknown): string {
        if (typeof content === 'string') {
            return content;
        }

        if (Array.isArray(content)) {
            return content
                .map((part: unknown) => {
                    if (typeof part === 'string') {
                        return part;
                    }

                    if (typeof part === 'object' && part !== null) {
                        const text = (part as { text?: unknown }).text;
                        if (typeof text === 'string') {
                            return text;
                        }
                    }

                    return '';
                })
                .join('')
                .trim();
        }

        return '';
    }
}

export default ChatGPTAPI;
