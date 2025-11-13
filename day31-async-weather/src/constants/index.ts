// erasableSyntaxOnly対応のenum代替
export const WeatherStatus = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    CANCELED: "CANCELED",
} as const;

export type WeatherStatus = (typeof WeatherStatus)[keyof typeof WeatherStatus];

export const DEFAULTS = {
    FETCH_URL: "https://wttr.in",
    CACHE_TTL_MS: 60_000, // 1分
    RETRY: {
        maxRetries: 3,
        baseDelayMs: 300,
        factor: 2, // 指数バックオフの係数
        jitterRatio: 0.25,
    },
} as const;