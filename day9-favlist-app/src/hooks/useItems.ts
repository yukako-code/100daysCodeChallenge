import { useReducer } from 'react';
import { itemReducer } from '../reducers/itemReducer';
import { initialItems, ItemActionType } from '../constants';
import type { FavoriteItem, ItemState } from '../types';

export const useItems = () => {
    const initialState: ItemState = {
        items: initialItems,
        updatingItem: null,
    };

    const [state, dispatch] = useReducer(itemReducer, initialState);

    const handleSubmitItem = (item: FavoriteItem) => {
        if (state.updatingItem) {
            dispatch({ type: ItemActionType.UPDATE_ITEM, payload: item });
        } else {
            dispatch({ type: ItemActionType.ADD_ITEM, payload: item });
        }
    };

    const handleEditClick = (id: string) => {
        const found = state.items.find(item => item.id === id) || null;
        dispatch({ type: ItemActionType.SET_UPDATING_ITEM, payload: found });
    };

    const handleDelete = (id: string) => {
        dispatch({ type: ItemActionType.DELETE_ITEM, payload: id });
    };

    return {
        items: state.items,
        updatingItem: state.updatingItem,
        handleSubmitItem,
        handleEditClick,
        handleDelete,
    };
};
