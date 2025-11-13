import { useReducer, useRef } from "react"
import { initialWeatherState, weatherReducers, type WeatherState } from "../reducers/weatherReducers";
import { computeDelayMs, parseRetryAfter, sleepWithAbort, type RetryOptions } from "../lib/backoff";
import { fetchWeatherFromWttr, type Fetcher } from "../api/wttrClient";
import { DEFAULTS, WeatherStatus } from "../constants";
import { TTLCache } from "../lib/cache";
import { makeRequestController } from "../lib/requestControl";
import type { Weather } from "../domain/weather";

type HooksReturnType = {
    state: WeatherState;
    isLoading: boolean;
    weather: Weather | undefined,
    status: WeatherStatus,
    error: string | undefined,
    fetchWeather: (name: string) => Promise<void>
}

export type UseWeatherOptions = {
    cacheTTLms?: number
    retry?: RetryOptions
    fetcher?: Fetcher
    client?: (city: string, fetcher: Fetcher, baseUrl: string, signal?: AbortSignal) => Promise<Weather>;
    baseUrl?: string;
    keyFn?: (city: string) => string;
}
export const useWeather = (options: UseWeatherOptions = {}): HooksReturnType => {
    const {
        cacheTTLms = DEFAULTS.CACHE_TTL_MS,
        retry = DEFAULTS.RETRY,
        fetcher = fetch,
        client = fetchWeatherFromWttr,
        baseUrl = DEFAULTS.FETCH_URL,
        keyFn = (c) => c.trim().toLowerCase()
    } = options;
    const [state, dispatch] = useReducer(weatherReducers, initialWeatherState);
    const ctrl = useRef(makeRequestController());
    const cacheRef = useRef(new TTLCache<string, Weather>(cacheTTLms));

    const fetchWithRetry = async (city: string, signal: AbortSignal): Promise<Weather> => {
        let attempts = 0;

        while (true) {
            try {
                const weather = await client(city, fetcher, baseUrl, signal);
                return weather;
            } catch (err: any) {
                if (err?.name === 'AbortError') throw err;

                const status = err?.status as number | undefined;
                const res = err?.res as Response | undefined;

                // 再試行対象：429 + 5xx
                const shouldRetry = status === 429 || (status !== undefined && status >= 500 && status < 600) || !status;
                if (!shouldRetry || attempts >= (retry.maxRetries ?? 3)) {
                    // 非再試行（4xx等） or リトライ上限
                    throw err;
                }

                // Retry-After を最優先（サーバのレート制限/回復タイミングに従う）
                // 無ければ指数バックオフ＋ジッターでクライアント側が自律的に間隔調整
                const retryAfterMs = parseRetryAfter(res?.headers.get('Retry-After') ?? null);
                const wait = retryAfterMs ?? computeDelayMs(attempts, retry);

                // 待機中も Abort できるように必ず sleep にも signal を伝播
                await sleepWithAbort(wait, signal);
                attempts++;
            }
        }
    }

    const fetchWeather = async (city: string) => {
        if (!city.trim()) {
            dispatch({ type: "FETCH_ERROR", payload: "Please enter a city name." });
            return;
        }

        // cache hit?
        const key = keyFn(city);
        const cached = cacheRef.current.get(key);
        if (cached) {
            dispatch({ type: 'FETCH_SUCCESS', payload: cached });
            return;
        }

        // start request (abort previous one)
        const { signal, requestId } = ctrl.current.start();
        dispatch({ type: 'FETCH_WEATHER' });

        try {
            const weather = await fetchWithRetry(city, signal);

            // is latest?
            if (!ctrl.current || !ctrl.current["isLatest"](requestId)) return;
            cacheRef.current.set(key, weather);
            dispatch({ type: 'FETCH_SUCCESS', payload: weather });

        } catch (e: any) {
            if (e?.name === 'AbortError') {
                dispatch({ type: 'FETCH_CANCELED' });
                return;
            }
            dispatch({
                type: 'FETCH_ERROR',
                payload: e?.message ?? 'Error encountered while fetching weather info. Check your input and Please try again.'
            });
        }
    };

    return {
        state,
        isLoading: state.status === WeatherStatus.LOADING,
        weather: state.status === WeatherStatus.SUCCESS ? state.weather : undefined,
        status: state.status,
        error: state.error === WeatherStatus.ERROR ? state.error : undefined,
        fetchWeather
    }
}