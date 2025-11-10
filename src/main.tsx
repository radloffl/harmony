import { Command } from '@cliffy/command';
import { render } from 'ink';
import { chatCommand } from './commands/chat.tsx';
import { completionCommand } from './commands/complete.tsx';
import ErrorUI from './ui/ErrorUI.tsx';

async function main() {
    try {
        await new Command()
            .name('harmony')
            .version('1.0.0')
            .description('AI CLI Tool for interacting with ChatGPT and Claude')
            .meta('Environment Variables', `
  OPENAI_API_KEY      Your OpenAI API key
  ANTHROPIC_API_KEY   Your Anthropic (Claude) API key
  AI_PROVIDER         Preferred provider: 'chatgpt' or 'claude' (optional)
                      If not set, uses the first available API key`)
            .example(
                'Chat with AI',
                'harmony chat "What is the meaning of life?"',
            )
            .example(
                'Text completion',
                'harmony complete "Once upon a time"',
            )
            .example(
                'Use specific provider',
                'AI_PROVIDER=claude harmony chat "Hello Claude!"',
            )
            .command('chat', chatCommand)
            .command('complete', completionCommand)
            .parse(Deno.args);
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        // @ts-ignore - Deno type checking issue with npm JSX runtime, code works fine
        const { waitUntilExit } = render(
            <ErrorUI error={err} command={Deno.args[0]} />,
        );
        await waitUntilExit();
        Deno.exit(1);
    }
}

if (import.meta.url === new URL('main.tsx', import.meta.url).href) {
    main();
}
