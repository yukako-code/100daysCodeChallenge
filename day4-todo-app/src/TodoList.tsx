import React from 'react';
import type { Todo } from './type';

interface ITodoListProps {
    todos: Array<Todo>;
    onDelete: (id: string) => void;
}
const TodoList: React.FC<ITodoListProps> = ({ todos, onDelete }) => {

    return (
        <ul className="mt-4 space-y-2">
            {todos.map(({ id, content }) => (
                <li key={id} className="bg-gray-100 p-2 rounded">
                    {content}
                    <span onClick={() => onDelete(id)}>🗑</span>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;