import { useEffect, useReducer } from "react"
import type { Bookmark } from "../types/bookmarks"
import { bookmarksReducers } from "../reducers/bookmarksReducers"

type UseBookmarksReturnType = {
    bookmarks: Array<Bookmark>
    updatingBookmark: Bookmark | undefined
    handleSubmit: (bookmark: Bookmark) => void
    handleEdit: (bookmark: Bookmark) => void
    handleDelete: (id: string) => void
    handleSearchBookmark: (input: string) => void
    searchTerm: string
}
export const useBookmarks = (): UseBookmarksReturnType => {
    const [state, dispatch] = useReducer(bookmarksReducers, {
        updatingBookmark: undefined,
        bookmarkList: [],
        allBookmarkList: [],
        searchTerm: ''
    })

    const handleEdit = (bookmark: Bookmark) => {
        dispatch({ type: 'SET_EDITING_BOOKMARK', payload: bookmark });
    }

    const handleSubmit = (bookmark: Bookmark) => {
        if (state.updatingBookmark) {
            dispatch({ type: 'EDIT_BOOKMARK', payload: bookmark });
            dispatch({ type: 'SET_EDITING_BOOKMARK', payload: undefined });
            return;
        }
        dispatch({ type: 'ADD_BOOKMARK', payload: bookmark })
    }

    const handleDelete = (id: string) => {
        dispatch({ type: 'DELETE_BOOKMARK', payload: id })
        if (state.updatingBookmark?.id === id) {
            dispatch({ type: 'SET_EDITING_BOOKMARK', payload: undefined });
        }
    };

    const handleSearchBookmark = (searchInput: string) => {
        dispatch({ type: 'SEARCH_BOOKMARK', payload: searchInput })
    }

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch("https://dev.to/api/articles?per_page=10");
            const data = await res.json();
            const bookmarksFromApi: Bookmark[] = data.map((item: any) => ({
                id: item.id.toString(),
                title: item.title,
                url: item.url,
                description: item.description || '',
            }));
            dispatch({ type: 'FETCH_BOOKMARK_LIST', payload: bookmarksFromApi })
        };
        fetchArticles();
    }, []);
    return {
        bookmarks: state.bookmarkList,
        updatingBookmark: state.updatingBookmark,
        handleEdit,
        handleSubmit,
        handleDelete,
        handleSearchBookmark,
        searchTerm: state.searchTerm,
    }
}