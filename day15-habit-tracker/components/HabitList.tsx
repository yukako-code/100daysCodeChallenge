'use client';

import { AppDispatch, RootState } from '@/store';
import { deleteHabit, toggleHabit } from '@/store/habitSlice';
import { loadFromStorage, saveToStorage } from '@/utilities/inde';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HabitList: React.FC = () => {
    const habits = useSelector((state: RootState) => state.habits);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const storedHabits = loadFromStorage();
        saveToStorage(storedHabits);
    }, []);

    return (
        <ul className="space-y-2">
            {habits.map(({ id, name, completed }) => (
                <li key={id} className="flex justify-between items-center border-b pb-1">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => dispatch(toggleHabit(id))}
                        />
                        <span>{name}</span>
                    </label>
                    <button
                        className="text-red-500 text-sm"
                        onClick={() => dispatch(deleteHabit(id))}
                    >
                        削除
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default HabitList;
