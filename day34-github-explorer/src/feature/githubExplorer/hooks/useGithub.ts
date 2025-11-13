import { useReducer } from "react";
import { fetchReposFromGithub, type Fetcher } from "../../../api/githubClient";
import { DEFAULTS, GeneralStatus } from "../../../constants";
import type { RepoItem } from "../../../domain/repo";
import type { RetryOptions } from "../../../lib/backoff";
import { githubReducers, initialGithubState } from "../reducers/githubReducers";

type HooksReturnType = {
    repos: RepoItem[];
    isLoading: boolean;
    error: string | undefined;
    fetchRepos: (query: string) => Promise<void>;
}

type UseGithubOptions = {
    retry?: RetryOptions;
    fetcher?: Fetcher;
    client?: (query: string, fetcher: Fetcher, baseUrl: string, signal?: AbortSignal) => Promise<any>; //TODO any -> GithubRepo[]
    baseUrl?: string;
}
export const useGithub = (options: UseGithubOptions = {}): HooksReturnType => {
    const {
        retry = DEFAULTS.RETRY,
        fetcher = fetch,
        client = fetchReposFromGithub,
        baseUrl = DEFAULTS.FETCH_URL,
    } = options;
    const [state, dispatch] = useReducer(githubReducers, initialGithubState);

    const fetchWithRetry = async (query: string, signal?: AbortSignal): Promise<RepoItem[]> => {
        let attempts = 0;

        while (true) {
            try {
                const repos = await client(query, fetcher, baseUrl, signal);
                return repos;
            } catch (e: any) {
                if (e?.name === 'AbortError') throw e;

                const status = e?.status as number | undefined;
                // const res = e?.res as Response | undefined;

                // retry conditions: 429 + 5xx
                const shouldRetry = status === 429 || (status !== undefined && status >= 500 && status < 600) || !status;
                if (!shouldRetry || attempts >= (retry.maxRetries ?? 3)) {
                    // non-retryable (4xx etc) or reached max retries
                    throw e;
                }

                // const retryAfterMs = 
                // const wait 

                // await sleepWithAbort(wait, signal);
                attempts++;
            }
        }
    }

    const fetchRepos = async (query: string): Promise<void> => {
        // quick validate
        if (!query.trim()) {
            // dispatch error
            dispatch({ type: 'FETCH_ERROR', payload: 'Query cannot be empty' });
            return;
        }

        // cache check
        //TODO:  if there is cached data, dispatch success with cached data and return

        // start request (abort previous one)

        try {
            const repos = await fetchWithRetry(query) // add signal as second arg
            // dispatch success with repos
            dispatch({ type: 'FETCH_SUCCESS', payload: repos });
        } catch (e: any) {
            // dispatch abort or error
            if (e?.name === 'AbortError') {
                // dispatch abort
                dispatch({ type: 'FETCH_CANCELED' });
            } else {
                // dispatch error
                dispatch({ type: 'FETCH_ERROR', payload: e.message ?? 'Unknown error' });
            }
        }

    }
    return {
        repos: state.repos ?? [],
        isLoading: state.status === GeneralStatus.LOADING,
        error: state.error === GeneralStatus.ERROR ? state.error : undefined,
        fetchRepos
    };
}