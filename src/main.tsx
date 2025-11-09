import { parseArgs } from '@std/cli/parse-args';
import { render } from 'ink';
import { executeCommand } from './commands/index.tsx';
import ErrorUI from './ui/ErrorUI.tsx';

function showHelp() {
    console.log(`
Harmony - AI CLI Tool

Usage: harmony <command> [options]

Commands:
  chat <prompt>       Send a chat completion request
  complete <prompt>   Send a text completion request

Options:
  --help             Show this help message
  --prompt <text>    Provide prompt as an option instead of positional arg

Environment Variables:
  OPENAI_API_KEY      Your OpenAI API key
  ANTHROPIC_API_KEY   Your Anthropic (Claude) API key
  AI_PROVIDER         Preferred provider: 'chatgpt' or 'claude' (optional)
                      If not set, uses the first available API key

Examples:
  harmony chat "What is the meaning of life?"
  harmony complete "Once upon a time"
  harmony chat --prompt "Explain quantum computing"
  
  # Use Claude instead of ChatGPT
  AI_PROVIDER=claude harmony chat "Hello Claude!"
`);
}

async function main() {
    const args = parseArgs(Deno.args);

    if (args.help) {
        showHelp();
        Deno.exit(0);
    }

    if (args._.length === 0) {
        console.error('No command provided. Use --help for usage information.');
        Deno.exit(1);
    }

    const command = args._[0];
    try {
        await executeCommand(command, args);
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        // @ts-ignore - Deno type checking issue with npm JSX runtime, code works fine
        const { waitUntilExit } = render(
            <ErrorUI error={err} command={String(command)} />,
        );
        await waitUntilExit();
        Deno.exit(1);
    }
}

if (import.meta.url === new URL('main.tsx', import.meta.url).href) {
    main();
}
