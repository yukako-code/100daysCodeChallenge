import Skeleton from "../../../components/Skeleton";

function IssuesPanel({
    // repo,
    // issues,
    // loading,
    // onRefresh,
}: {
        // repo: Repo | null;
        // issues: Issue[];
        // loading: boolean;
        // onRefresh: () => void;
    }) {
    // if (!repo) return null;
    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Issues – repo.full_name</h2>
                <button className="rounded-md border px-3 py-1 text-sm" >
                    {/* onClick={onRefresh} */}
                    Refresh
                </button>
            </div>

            {/* {loading && <Skeleton text="Loading issues..." />} */}
            <ul className="divide-y rounded-md border">
                {/* TODO: issuesをmap表示 */}
                {/* 例:
           issues.map(i => (
             <li key={i.id} className="p-3">
               <p className="font-medium">#{i.number} {i.title}</p>
               <p className="text-sm opacity-70">{i.state}</p>
             </li>
           ))
        */}
            </ul>

            {/* TODO: ページネーション or 無限スクロールの下地だけ置く */}
            <div className="flex items-center justify-center py-3">
                <button className="rounded-md border px-3 py-1 text-sm">
                    Load more {/* TODO: 次ページ取得 */}
                </button>
            </div>
        </section>
    );
}
export default IssuesPanel;