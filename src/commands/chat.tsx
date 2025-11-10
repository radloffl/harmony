import { Command } from '@cliffy/command';
import { render } from 'ink';
import { createProvider, getProviderFromEnv } from '../utils/provider.ts';
import ChatUI from '../ui/ChatUI.tsx';

function executeChatCommand(prompt: string) {
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

export const chatCommand = new Command()
    .description('Send a chat completion request')
    .arguments('<prompt:string>')
    .option('-p, --prompt <text:string>', 'Provide prompt as an option instead of positional arg')
    .example(
        'Basic chat',
        'harmony chat "What is the meaning of life?"',
    )
    .example(
        'Using --prompt flag',
        'harmony chat --prompt "Explain quantum computing"',
    )
    .action(async (options: { prompt?: string }, positionalPrompt?: string) => {
        const prompt = options.prompt || positionalPrompt;
        if (!prompt) {
            throw new Error('No prompt provided');
        }
        await executeChatCommand(prompt);
    });
