import Header from "../../../components/Header"
import { useGithub } from "../hooks";
import RepoList from "./RepoList"

/**
 * 1) debounce: 入力後300ms待ってから検索開始
 * 2) AbortController: 新しい検索が来たら古いfetchをabort
 * 3) Retry（指数バックオフ）: 5xx系やネットワーク失敗時のみ最大3回
 * 4) SWRキャッシュ: key = `search:${query}`, `issues:${full_name}`
 *    - 命中: stale表示 → バックグラウンドでrevalidate
 * 5) 正常系/異常系のActionを分離してreducerで状態遷移
 * 6) Pagination: 次ページ用のcursor or page paramをstateに保持
 * 7) エラーパターン: rate limit(403/429), ネットワーク切断, タイムアウト
 * 8) システム設計の観点: 
 *    - 可観測性（log/metricsの設計下地）
 *    - キャッシュTTL/容量/evictionの方針
 *    - APIの依存（GitHub API制限）を隠蔽するadapter層
 */


const GithubExplorer = () => {
  const { repos, isLoading, error } = useGithub();

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">

      <Header />
      {/* <SearchBar
      // value={state.query}
      // onChange={}
      // onSearch={() => {
      // TODO: debounce + fetch開始
      // - 既存リクエストのAbort
      // - キャッシュ命中なら即表示
      // - ネットワーク失敗時、指数バックオフでリトライ（最大3回）
      // - 成功: SEARCH_SUCCESS, 失敗: SEARCH_ERROR
      // }}
      /> */}
      <RepoList
        repos={repos}
        isLoading={isLoading}
        error={error}
        onSelect={(repo) => {
          console.log('selected repo', repo);
          // dispatch({ type: "SELECT_REPO", payload: repo });
          // TODO: issues取得（SWR: stale-while-revalidate）
          // - キャッシュのkey: `issues:${repo.full_name}`
          // - 即時: stale表示 → バックグラウンドで再検証
        }}
      />
      {/* <IssuesPanel
        // repo={state.selectedRepo}
        // issues={state.issues}
        // loading={state.status === "loading"}
        onRefresh={() => {
          // TODO: 手動再取得（キャッシュ無視 or revalidate）
        }}
      /> */}
    </main>
  )
}

export default GithubExplorer
