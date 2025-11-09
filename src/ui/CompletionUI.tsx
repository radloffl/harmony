import { useEffect, useState } from 'react';
import { Box, Newline, Text } from 'ink';
import { colors, getProviderColor, spacing, styles } from '../styles/theme.ts';

interface CompletionUIProps {
    prompt: string;
    provider: string;
    onComplete: () => void;
    fetchResponse: () => Promise<{ text: string; model: string }>;
}

export default function CompletionUI(
    { prompt, provider, onComplete, fetchResponse }: CompletionUIProps,
) {
    const [response, setResponse] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResponse = async () => {
            try {
                const result = await fetchResponse();
                setResponse(result.text);
                setModel(result.model);
                setLoading(false);
                setTimeout(onComplete, 100);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                setLoading(false);
                setTimeout(onComplete, 100);
            }
        };

        loadResponse();
    }, []);

    const providerColor = getProviderColor(provider);

    return (
        <Box flexDirection='column' padding={spacing.xs}>
            <Box marginBottom={spacing.xs}>
                <Text {...styles.header}>
                    Harmony AI CLI - Completion
                </Text>
                <Text {...styles.subheader}>({provider})</Text>
            </Box>

            <Box {...styles.userMessage} flexDirection='column'>
                <Text {...styles.label} color={colors.warning}>
                    Prompt:
                </Text>
                <Text>{prompt}</Text>
            </Box>

            <Newline />

            {loading && (
                <Box>
                    <Text {...styles.loading}>⏳ Generating...</Text>
                </Box>
            )}

            {error && (
                <Box {...styles.errorMessage}>
                    <Text color={colors.error} {...styles.label}>
                        Error:
                    </Text>
                    <Newline />
                    <Text color={colors.error}>{error}</Text>
                </Box>
            )}

            {!loading && !error && (
                <>
                    <Box {...styles.aiMessage} flexDirection='column'>
                        <Text {...styles.label} color={providerColor}>
                            Completion ({model}):
                        </Text>
                        <Text>{response}</Text>
                    </Box>
                </>
            )}
        </Box>
    );
}
