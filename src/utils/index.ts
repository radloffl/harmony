export function formatOutput(data: unknown): string {
    return JSON.stringify(data, null, 2);
}

export function handleError(error: Error): void {
    console.error('An error occurred:', error.message);
}
