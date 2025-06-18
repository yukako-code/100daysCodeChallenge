import { ItemActionType } from '../constants';
import type { ItemState, ItemAction } from '../types';

export const itemReducer = (state: ItemState, action: ItemAction): ItemState => {
    switch (action.type) {
        case ItemActionType.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case ItemActionType.UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
                updatingItem: null,
            };
        case ItemActionType.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case ItemActionType.SET_UPDATING_ITEM:
            return {
                ...state,
                updatingItem: action.payload,
            };
        default:
            return state;
    }
};
