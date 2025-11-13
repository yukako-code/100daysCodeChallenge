export type RetryOptions = {
    maxRetries?: number;
    baseDelayMs?: number;
    factor?: number;
    jitterRatio?: number; // (0.25 means ±25% jitter)
}

// Retry-Afterヘッダを秒or日付からmsに解釈 サーバーの「何秒後に再試行して」の指示
export const parseRetryAfter = (header: string | null): number | null => {
    if (!header) return null;
    const seconds = Number(header);
    if (!Number.isNaN(seconds)) {
        return Math.max(0, seconds * 1000);
    }
    const when = new Date(header).getTime() - Date.now();
    return Number.isFinite(when) ? Math.max(0, when) : null;
}

// 基本の指数バックオフ + イコールジッター
export const computeDelayMs = (attempt: number, {
    baseDelayMs = 300,
    factor = 2,
    jitterRatio = 0.25
}: Pick<RetryOptions, 'baseDelayMs' | 'factor' | 'jitterRatio'> = {}): number => {
    const base = baseDelayMs * Math.pow(factor, attempt);
    const jitter = base * jitterRatio;
    const delta = (Math.random() * 2 - 1) * jitter; // -jitter..+jitter
    return Math.max(0, base + delta);
};

// 指数バックオフ with Abort対応待機 待機中でも AbortController で即座に中断できるようにする
export const sleepWithAbort = (ms: number, signal?: AbortSignal): Promise<void> => {
    if (ms <= 0) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            signal?.removeEventListener('abort', onAbort);
            resolve();
        }, ms);

        const onAbort = () => {
            clearTimeout(timer);
            const err = Object.assign(new Error('Aborted'), { name: 'AbortError' });
            reject(err);
        };

        signal?.addEventListener('abort', onAbort);
    });
}