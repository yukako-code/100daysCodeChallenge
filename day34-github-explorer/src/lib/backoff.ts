export type RetryOptions = {
    maxRetries?: number;
    baseDelayMs?: number;
    factors?: number;
    jitterRatio?: number; // (0.25 means ±25% jitter)
}