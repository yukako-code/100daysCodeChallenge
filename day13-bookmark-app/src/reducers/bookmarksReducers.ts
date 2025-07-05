import type { BookmarksState, BookmarkAction } from "../types/bookmarks";

export const bookmarksReducers = (state: BookmarksState, action: BookmarkAction) => {
    switch (action.type) {
        case 'ADD_BOOKMARK':
            return {
                ...state,
                bookmarkList: [
                    ...state.bookmarkList,
                    action.payload
                ],
                allBookmarkList: [
                    ...state.allBookmarkList,
                    action.payload
                ]
            }
        case 'EDIT_BOOKMARK':
            return {
                ...state,
                bookmarkList: state.bookmarkList.map((b) => b.id === action.payload.id ? action.payload : b),
                allBookmarkList: state.allBookmarkList.map((b) => b.id === action.payload.id ? action.payload : b),
            };
        case 'DELETE_BOOKMARK':
            return {
                ...state,
                bookmarkList: state.bookmarkList.filter((bookmark) => bookmark.id !== action.payload),
                allBookmarkList: state.allBookmarkList.filter((bookmark) => bookmark.id !== action.payload),
            }
        case 'FETCH_BOOKMARK_LIST':
            return {
                ...state,
                allBookmarkList: [...state.allBookmarkList, ...action.payload],
                bookmarkList: [...action.payload] // ← 上書き
            }
        case 'SET_EDITING_BOOKMARK':
            return {
                ...state,
                updatingBookmark: action.payload
            }

        case 'SEARCH_BOOKMARK':
            return {
                ...state,
                searchTerm: action.payload,
                // 常に元データを参照することで検索のリセットが可能に
                bookmarkList: state.allBookmarkList.filter((bookmark) =>
                    !action.payload ||
                    bookmark.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    bookmark.description.toLowerCase().includes(action.payload.toLowerCase())
                )
            }
        default:
            return state
    }

}