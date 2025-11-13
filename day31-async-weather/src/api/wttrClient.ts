import { DEFAULTS } from "../constants";
import { normalizeWttrResponse, type Weather } from "../domain/weather";

export type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export const fetchWeatherFromWttr = async (
    city: string,
    fetcher: Fetcher = fetch,
    baseUrl: string = DEFAULTS.FETCH_URL,
    signal?: AbortSignal
): Promise<Weather> => {
    const url = `${baseUrl}/${encodeURIComponent(city)}?format=j1`;
    const res = await fetcher(url, { signal });
    if (!res.ok) {
        // 4xxは即失敗、429/5xxは上位の再試行ロジックが扱う
        throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status, res });
    }
    const json = await res.json();
    return normalizeWttrResponse(json, city);
};