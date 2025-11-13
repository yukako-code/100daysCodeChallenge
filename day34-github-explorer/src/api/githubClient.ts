import { DEFAULTS } from "../constants";
import { normalizeGithubRepoItem } from "../domain/repo";

export type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export const fetchReposFromGithub = async (
    query: string,
    fetcher: Fetcher = fetch,
    baseUrl: string = DEFAULTS.FETCH_URL,
    signal?: AbortSignal
) => {
    const url = `${baseUrl}/search/repositories?q=${query}`;
    const res = await fetcher(url, { signal });
    if (!res.ok) {
        // 4xx goes immediate failure, 429/5xx will be handled by upper retry logic
        throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status, res });
    }
    const json = await res.json();
    return normalizeGithubRepoItem(json);
}