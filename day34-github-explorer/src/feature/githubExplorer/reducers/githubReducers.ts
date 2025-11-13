import { GeneralStatus } from "../../../constants";
import type { RepoItem } from "../../../domain/repo";

export type GithubState = {
    repos: RepoItem[] | undefined;
    status: GeneralStatus;
    error: string | undefined;
}

type GithubAction =
    { type: 'FETCH_REPOS' } |
    { type: 'FETCH_SUCCESS', payload: RepoItem[] } |
    { type: 'FETCH_ERROR', payload: string } |
    { type: 'FETCH_CANCELED' } |
    { type: 'RESET' }

export const initialGithubState: GithubState = {
    repos: undefined,
    status: GeneralStatus.IDLE,
    error: undefined
};

export const githubReducers = (state: GithubState, action: GithubAction): GithubState => {
    switch (action.type) {
        case 'FETCH_REPOS':
            return { ...state, status: GeneralStatus.LOADING };
        case 'FETCH_SUCCESS':
            return { ...state, status: GeneralStatus.SUCCESS, repos: action.payload };
        case 'FETCH_ERROR':
            return { ...state, status: GeneralStatus.ERROR, error: action.payload };
        case 'FETCH_CANCELED':
            return { ...state, status: GeneralStatus.CANCELED };
        case 'RESET':
            return initialGithubState;
        default:
            return state;
    }
}