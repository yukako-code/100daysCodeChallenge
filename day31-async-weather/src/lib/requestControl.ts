export const makeRequestController = () => {
    let controller: AbortController | null = null;
    let currentId = 0;

    const start = (): { signal: AbortSignal; requestId: number; abortPrev: () => void } => {
        // 前のリクエストをキャンセル
        controller?.abort();
        controller = new AbortController();
        currentId += 1;
        const localId = currentId;
        return {
            signal: controller.signal,
            requestId: localId,
            abortPrev: () => controller?.abort()
        }
    }

    const isLatest = (id: number): boolean => {
        return id === currentId;
    }

    const abortAll = (): void => {
        controller?.abort();
        controller = null;
        // no need to reset currentId since isLatest will return false for any id
    }

    return {
        start,
        isLatest,
        abortAll
    }
}