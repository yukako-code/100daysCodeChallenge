import React, { useState } from 'react';

interface ITodoFormProps {
    onSubmit: (newTask: string) => void;
}
const TodoForm: React.FC<ITodoFormProps> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    }
    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add your task..."
                className="border p-2 rounded w-full"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
            </button>
        </form>
    );
};

export default TodoForm;
