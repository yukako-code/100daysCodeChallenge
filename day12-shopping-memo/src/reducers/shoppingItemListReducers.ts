import type { ShoppingItem } from "../type"

export type ShoppingItemListState = {
    shoppingItemList: Array<ShoppingItem>
    updatingItem: ShoppingItem | undefined
}

type ShoppingItemListAction =
    { type: 'ADD_SHOPPING_ITEM', payload: ShoppingItem } |
    { type: 'EDIT_SHOPPING_ITEM', payload: string } |
    { type: 'DELETE_SHOPPING_ITEM', payload: string } |
    { type: 'UPDATE_SHOPPING_ITEM', payload: ShoppingItem } |
    { type: 'UPDATE_UPDATING_SHOPPING_ITEM', payload: ShoppingItem | undefined }

export const shoppingItemListReducers = (state: ShoppingItemListState, action: ShoppingItemListAction): ShoppingItemListState => {
    switch (action.type) {
        case "ADD_SHOPPING_ITEM":
            return {
                ...state,
                shoppingItemList: [...state.shoppingItemList, action.payload]
            }
        case "EDIT_SHOPPING_ITEM":
            return {
                ...state,
                updatingItem: state.shoppingItemList.find(item => item.id === action.payload)
            }

        case "DELETE_SHOPPING_ITEM":
            return {
                ...state,
                shoppingItemList: state.shoppingItemList.filter(item => item.id !== action.payload)
            }
        case "UPDATE_SHOPPING_ITEM":
            return {
                ...state,
                shoppingItemList: [...state.shoppingItemList.map((item) => {
                    // if item.id is equal to one of the existing shoppingItem, 
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            title: action.payload.title
                        }
                    }
                    return item
                })],
                updatingItem: undefined
            }
        case "UPDATE_UPDATING_SHOPPING_ITEM":
            return {
                ...state,
                updatingItem: action.payload
            }

        default:
            return state;
    }
}