import { useEffect, useReducer } from "react"
import type { ShoppingItem } from "../type"
import { shoppingItemListReducers, type ShoppingItemListState } from "../reducers/shoppingItemListReducers"

type UseShoppingListReturn = {
    shoppingList: Array<ShoppingItem> //FIXME: any
    handleSubmitItem: (item: ShoppingItem) => void  //FIXME: any
    handleEdit: (id: ShoppingItem['id']) => void
    handleDelete: (id: ShoppingItem['id']) => void
    updatingItem: ShoppingItem | undefined
}

// useReducerの初期値は別関数に切り出すとテストしやすい
const init = (): ShoppingItemListState => {
    const storedList = localStorage.getItem('shoppingList');
    return {
        updatingItem: undefined,
        shoppingItemList: storedList ? JSON.parse(storedList) : [],
    };
};
export const useShoppingList = (): UseShoppingListReturn => {
    const [state, dispatch] = useReducer(shoppingItemListReducers, undefined, init)

    const handleSubmitItem = (item: ShoppingItem) => {
        if (state.updatingItem) {
            dispatch({ type: 'UPDATE_SHOPPING_ITEM', payload: item });
        } else {
            dispatch({ type: 'ADD_SHOPPING_ITEM', payload: item });
        }
    }

    const handleEdit = (id: string) => {
        const selectedItem = state.shoppingItemList.find((item) => item.id === id);
        dispatch({ type: 'UPDATE_UPDATING_SHOPPING_ITEM', payload: selectedItem });
    }

    const handleDelete = (id: string) => {
        dispatch({ type: 'DELETE_SHOPPING_ITEM', payload: id });
    }

    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(state.shoppingItemList));
    }, [state.shoppingItemList])
    return {
        shoppingList: state.shoppingItemList,
        handleSubmitItem,
        updatingItem: state.updatingItem,
        handleEdit,
        handleDelete
    }
}