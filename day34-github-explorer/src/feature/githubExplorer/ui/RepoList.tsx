import ErrorBanner from "../../../components/Errorbanner";
import Skeleton from "../../../components/Skeleton";
import type { RepoItem } from "../../../domain/repo";


type Props = {
    repos: RepoItem[];
    isLoading: boolean;
    error: string | undefined;
    onSelect: (r: RepoItem) => void;
}
const RepoList: React.FC<Props> = ({
    repos,
    onSelect,
    isLoading,
    error,
}) => {
    return (
        <section className="space-y-3">
            <h2 className="text-lg font-semibold">Results</h2>
            {isLoading && <Skeleton text="Searching repositories..." />}
            {error && <ErrorBanner message={error} />}
            <ul className="divide-y rounded-md border">
                {repos.map((r) => (
                    <li key={r.id} className="flex items-center justify-between p-3">
                        <div>
                            <p className="font-medium">{r.full_name}</p>
                            <p className="text-sm opacity-70">★ {r.html_url}</p>
                        </div>
                        <button
                            className="rounded-md border px-3 py-1 text-sm"
                            onClick={() => onSelect(r)}
                        >
                            Issues
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
export default RepoList;