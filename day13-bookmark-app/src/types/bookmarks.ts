
export type Bookmark = {
    id: string;
    title: string;
    url: string;
    description: string;
}

export type BookmarksState = {
    allBookmarkList: Array<Bookmark>,
    bookmarkList: Array<Bookmark>,
    updatingBookmark: Bookmark | undefined,
    searchTerm: string;
}

export type BookmarkAction =
    // 🔹 ブックマークを新規追加する（フォーム送信時、編集状態でないとき）
    | { type: 'ADD_BOOKMARK'; payload: Bookmark }

    // 🔹 既存ブックマークを編集（id一致したブックマークを上書き）
    | { type: 'EDIT_BOOKMARK'; payload: Bookmark }

    // 🔹 指定したidのブックマークを削除（onDeleteボタン時）
    | { type: 'DELETE_BOOKMARK'; payload: Bookmark['id'] }

    // 🔹 APIから取得した記事を初期データとしてリストに反映（上書き or マージ）
    | { type: 'FETCH_BOOKMARK_LIST'; payload: Bookmark[] }

    // 🔹 編集対象のブックマークをセットまたは解除（フォームにデータを流す用途）
    | { type: 'SET_EDITING_BOOKMARK'; payload: Bookmark | undefined }

    // 🔹 ユーザーがインプットした値と一致するタイトルまたはメモをブックマークリストの中から検索
    | { type: 'SEARCH_BOOKMARK'; payload: string };


