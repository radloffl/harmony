import { render } from 'ink';
import { createProvider, getProviderFromEnv } from '../utils/provider.ts';
import ChatUI from '../ui/ChatUI.tsx';
import CompletionUI from '../ui/CompletionUI.tsx';

export function chatCommand(prompt: string) {
    const { type, apiKey } = getProviderFromEnv();
    const provider = createProvider(type, apiKey);

    return new Promise<void>((resolve) => {
        const { waitUntilExit } = render(
            <ChatUI
                prompt={prompt}
                provider={type}
                onComplete={() => resolve()}
                fetchResponse={async () => {
                    const response = await provider.sendChatRequest([
                        { role: 'user', content: prompt },
                    ]);
                    return { content: response.content, model: response.model };
                }}
            />,
        );

        void waitUntilExit().then(() => resolve());
    });
}

export async function completionCommand(prompt: string) {
    const { type, apiKey } = getProviderFromEnv();
    const provider = await createProvider(type, apiKey);

    return new Promise<void>((resolve) => {
        const { waitUntilExit } = render(
            <CompletionUI
                prompt={prompt}
                provider={type}
                onComplete={() => resolve()}
                fetchResponse={async () => {
                    const response = await provider.sendCompletionRequest(prompt);
                    return { text: response.text, model: response.model };
                }}
            />,
        );

        void waitUntilExit().then(() => resolve());
    });
}

interface ParsedArgs {
    _: (string | number)[];
    prompt?: string;
    [key: string]: unknown;
}

export async function executeCommand(command: string | number, args: ParsedArgs) {
    const prompt = args._.slice(1).join(' ') || args.prompt;

    if (!prompt) {
        throw new Error('No prompt provided');
    }

    switch (command) {
        case 'chat':
            await chatCommand(prompt);
            break;
        case 'complete':
            await completionCommand(prompt);
            break;
        default:
            throw new Error(`Unknown command: ${command}`);
    }
}

// Additional command functions can be added here as needed.
