import { useEffect, useState } from "react"
import type { Bookmark } from "../types/bookmarks"

type UseBookmarksReturnType = {
    bookmarks: Array<Bookmark>
    updatingBookmark: Bookmark | undefined
    handleSubmit: (bookmark: Bookmark) => void
    handleEdit: (bookmark: Bookmark) => void
    handleDelete: (id: string) => void
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

    const handleDelete = (id: string) => {
        setBookmarks(prev => prev.filter((b) => b.id !== id));
        if (updatingBookmark?.id === id) {
            setUpdatingBookmark(undefined);
        }
    };

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
            setBookmarks(bookmarksFromApi);
        };
        fetchArticles();
    }, []);
    return {
        bookmarks,
        updatingBookmark,
        handleEdit,
        handleSubmit,
        handleDelete
    }
}