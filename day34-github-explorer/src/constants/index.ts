
export const GeneralStatus = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    CANCELED: 'canceled',
} as const;

export type GeneralStatus = (typeof GeneralStatus)[keyof typeof GeneralStatus];

export const DEFAULTS = {
    FETCH_URL: 'https://api.github.com',
    RETRY: {
        maxRetries: 3,
        baseDelayMs: 300,
        factor: 2, // exponential backoff factor
        jitterRatio: 0.25,
    }
} as const;