
import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export const TodoApp: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const { todos, handleDelete, handleAdd } = useTodos();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        const newTodo = {
            id: `${crypto.randomUUID()}`, //should use uuid
            content: input,
            isCompleted: false
        }
        handleAdd(newTodo);
        setInput('');
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
            <h1 className="text-2xl font-bold mb-4">🌱 ToDo リスト</h1>
            <form className="flex mb-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Input your task..."
                    className="flex-1 border rounded px-2 py-1 mr-2"
                    value={input}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </form>

            <ul className="space-y-2">
                {
                    todos.map(({ id, content }) => (
                        <li key={id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                            <span>{content}</span>
                            <button onClick={() => handleDelete(id)} className="text-red-500">🗑️</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
