import { Box, Newline, Text } from 'ink';
import { colors, spacing, styles } from '../styles/theme.ts';

interface ErrorUIProps {
    error: Error;
    command?: string;
}

export default function ErrorUI({ error, command }: ErrorUIProps) {
    const isApiKeyError = error.message.includes('API key');
    const isNoPromptError = error.message.includes('No prompt');

    return (
        <Box flexDirection='column' padding={spacing.xs}>
            <Box marginBottom={spacing.xs}>
                <Text {...styles.label} color={colors.error}>
                    ❌ Error
                </Text>
            </Box>

            <Box {...styles.errorMessage} flexDirection='column'>
                <Text color={colors.error} {...styles.label}>
                    {error.message}
                </Text>
            </Box>

            <Newline />

            {isApiKeyError && (
                <Box flexDirection='column' {...styles.warningMessage}>
                    <Text color={colors.warning} {...styles.label}>
                        💡 Quick Fix:
                    </Text>
                    <Newline />
                    <Text color={colors.warning}>Set your API key as an environment variable:</Text>
                    <Newline />
                    <Box flexDirection='column' paddingLeft={spacing.sm}>
                        <Text {...styles.code}>export OPENAI_API_KEY="your-key-here"</Text>
                        <Text color={colors.textDim}>or</Text>
                        <Text {...styles.code}>export ANTHROPIC_API_KEY="your-key-here"</Text>
                    </Box>
                    <Newline />
                    <Text dimColor>Then run your command again.</Text>
                </Box>
            )}

            {isNoPromptError && (
                <Box flexDirection='column' {...styles.warningMessage}>
                    <Text color={colors.warning} {...styles.label}>
                        💡 Usage:
                    </Text>
                    <Newline />
                    <Text {...styles.code}>harmony {command || 'chat'} "your prompt here"</Text>
                    <Text color={colors.textDim}>or</Text>
                    <Text {...styles.code}>
                        harmony {command || 'chat'} --prompt "your prompt here"
                    </Text>
                </Box>
            )}

            {!isApiKeyError && !isNoPromptError && (
                <Box flexDirection='column' {...styles.warningMessage}>
                    <Text color={colors.warning} {...styles.label}>
                        💡 Need help?
                    </Text>
                    <Newline />
                    <Text {...styles.code}>Run: harmony --help</Text>
                </Box>
            )}
        </Box>
    );
}
