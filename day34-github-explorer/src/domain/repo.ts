export type RepoItem = {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
    };
    html_url: string;
    description: string | null;
}
//A part of type from  https://api.github.com/search/repositories
type GithubRepoResponse = {
    items: RepoItem[];
}
export const normalizeGithubRepoItem = (json: unknown): RepoItem[] => {
    const data = json as GithubRepoResponse;
    return data.items
}