import { Command } from '@cliffy/command';
import { render } from 'ink';
import { createProvider, getProviderFromEnv } from '../utils/provider.ts';
import CompletionUI from '../ui/CompletionUI.tsx';

function executeCompletionCommand(prompt: string) {
    const { type, apiKey } = getProviderFromEnv();
    const provider = createProvider(type, apiKey);

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

export const completionCommand = new Command()
    .description('Send a text completion request')
    .arguments('<prompt:string>')
    .option('-p, --prompt <text:string>', 'Provide prompt as an option instead of positional arg')
    .example(
        'Basic completion',
        'harmony complete "Once upon a time"',
    )
    .example(
        'Using --prompt flag',
        'harmony complete --prompt "In a galaxy far away"',
    )
    .action(async (options: { prompt?: string }, positionalPrompt?: string) => {
        const prompt = options.prompt || positionalPrompt;
        if (!prompt) {
            throw new Error('No prompt provided');
        }
        await executeCompletionCommand(prompt);
    });
