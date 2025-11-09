// AI Provider Interface
export interface AIProvider {
    sendChatRequest(messages: ChatMessage[], options?: RequestOptions): Promise<ChatResponse>;
    sendCompletionRequest(prompt: string, options?: RequestOptions): Promise<CompletionResponse>;
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface RequestOptions {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
}

export interface ChatResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export interface CompletionResponse {
    text: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

// OpenAI specific types
export interface OpenAIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        text: string;
        index: number;
        logprobs?: unknown;
        finish_reason: string;
    }>;
}

export interface OpenAIRequest {
    model: string;
    prompt: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
}

export interface CommandOptions {
    prompt: string;
    maxTokens?: number;
    temperature?: number;
}
