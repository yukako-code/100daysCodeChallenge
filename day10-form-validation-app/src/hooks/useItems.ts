import { useState } from "react"
import type { FavoriteItem } from "../types";


type HookReturnType = {
    items: Array<FavoriteItem>;
    form: FavoriteItem;
}
export const useItems = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState<FavoriteItem>({
        id: '',
        title: '',
        category: '',
        note: ''
    });

    return {
        items,
        form
    }
}