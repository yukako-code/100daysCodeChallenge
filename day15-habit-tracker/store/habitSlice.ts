import { Habit } from "@/type";
import { saveToStorage } from "@/utilities/inde";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<Habit> = [];
type HabitsState = Array<Habit>
const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state: HabitsState, action: PayloadAction<Habit>) => {
            const newState = [...state, action.payload];
            saveToStorage(newState);
            return newState;
        },
        toggleHabit: (state: HabitsState, action: PayloadAction<Habit['id']>) => {
            const newState = state.map((habit) => habit.id === action.payload ? { ...habit, completed: !habit.completed } : habit)
            saveToStorage(newState);
            return newState;
        },
        deleteHabit: (state: HabitsState, action: PayloadAction<Habit['id']>) => {
            const newState = state.filter((habit) => habit.id !== action.payload);
            saveToStorage(newState);
            return newState;
        },
    }
})

export const { addHabit, toggleHabit, deleteHabit } = habitSlice.actions;
export default habitSlice.reducer;