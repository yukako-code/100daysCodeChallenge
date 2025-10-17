import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './habitSlice';

export const store = configureStore({
    reducer: {
        habits: habitReducer,
    },
});

// 型定義（useSelector/useDispatchで使う）
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
