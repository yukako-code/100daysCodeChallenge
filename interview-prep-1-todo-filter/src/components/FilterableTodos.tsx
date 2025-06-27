import React, { useMemo, useState } from 'react';
import { TodoType, type Todo } from '../type';

interface FilterableTodosProps {
    todos: Array<Todo>
}
const FilterableTodos: React.FC<FilterableTodosProps> = ({ todos }) => {
    const [filterType, setFilterType] = useState<TodoType>(TodoType.All);
    const filteredTodos = useMemo(() => {
        if (filterType === TodoType.Active) {
            return todos.filter(({ completed }) => !completed)
        }
        if (filterType === TodoType.Completed) {
            return todos.filter(({ completed }) => completed)
        }
        return todos;

    }, [todos, filterType])

    const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterType(e.currentTarget.name as TodoType);

    }
    return (
        <div>
            <div role="radiogroup" aria-label="Filter todos" className="flex gap-2 mb-4">
                {Object.values(TodoType).map((type) => (
                    <button
                        key={type}
                        name={type}
                        onClick={handleFilterClick}
                        aria-pressed={filterType === type}
                        className={`px-3 py-1 rounded-md border ${filterType === type
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 border-gray-300'
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
            <ul className="space-y-2">
                {filteredTodos.map(({ id, text, completed }) => (
                    <li
                        key={id}
                        className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow"
                    >
                        <span className={completed ? 'line-through text-gray-400' : ''}>
                            {text}
                        </span>
                        <span>{completed ? '✅' : '❌'}</span>
                    </li>
                ))}
            </ul>
        </div>

    )

}

export default FilterableTodos;