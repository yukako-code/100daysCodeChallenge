'use client';

import { AppDispatch } from '@/store';
import { addHabit } from '@/store/habitSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const HabitForm: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
    }

    return (
        <form className="flex gap-2 mb-4" onSubmit={() => dispatch(addHabit({
            id: Date.now().toString(),
            name: input,
            completed: false
        }))}>
            <input
                type="text"
                placeholder="習慣を入力"
                className="border p-2 rounded flex-1"
                onChange={handleChange}
                value={input}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                追加
            </button>
        </form>
    );
};

export default HabitForm;
