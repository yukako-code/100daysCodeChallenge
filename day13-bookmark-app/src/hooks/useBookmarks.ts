import { useEffect, useState } from "react"
import type { Bookmark } from "../types/bookmarks"

type UseBookmarksReturnType = {
    bookmarks: Array<Bookmark>
    updatingBookmark: Bookmark | undefined
    handleSubmit: (bookmark: Bookmark) => void
    handleEdit: (bookmark: Bookmark) => void
}
export const useBookmarks = (): UseBookmarksReturnType => {
    const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);
    const [updatingBookmark, setUpdatingBookmark] = useState<Bookmark | undefined>(undefined);

    const handleEdit = (bookmark: Bookmark) => {
        setUpdatingBookmark(bookmark);
    }

    const handleSubmit = (bookmark: Bookmark) => {
        if (updatingBookmark) {
            setBookmarks(bookmarks.map((item) => {
                return item.id === bookmark.id ? { ...item, ...bookmark } : item
            }))
            setUpdatingBookmark(undefined);
            return;
        }
        setBookmarks([...bookmarks, bookmark]);
    }

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch("https://dev.to/api/articles?per_page=10");
            const data = await res.json();
            console.log({ data });
            setBookmarks(data);
        };
        fetchArticles();
    }, [])
    return {
        bookmarks,
        updatingBookmark,
        handleEdit,
        handleSubmit
    }
}