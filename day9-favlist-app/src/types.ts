import { ItemActionType } from "./constants";

export type FavoriteItem = {
    id: string;
    title: string;
    category: string;
    note?: string;
};

export type ItemState = {
    items: FavoriteItem[];
    updatingItem: FavoriteItem | null;
};

export type ItemAction =
    | { type: typeof ItemActionType.ADD_ITEM; payload: FavoriteItem }
    | { type: typeof ItemActionType.UPDATE_ITEM; payload: FavoriteItem }
    | { type: typeof ItemActionType.DELETE_ITEM; payload: string }
    | { type: typeof ItemActionType.SET_UPDATING_ITEM; payload: FavoriteItem | null };