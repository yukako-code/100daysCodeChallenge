import { useEffect, useReducer } from "react"
import type { Todo } from "../type"
import { todoReducer } from "../reducers/todoReducer"

type UseTodosReturnType = {
    todos: Array<Todo>,
    handleDelete: (id: string) => void,
    handleAdd: (todo: Todo) => void
}

export const useTodos = (): UseTodosReturnType => {
    /* this evaluates localStorage.getItem(...) every time the component renders (even though useReducer only uses it once)
    const storedTodos = localStorage.getItem('todos');
    const initialState = {
        todos: storedTodos ? JSON.parse(storedTodos) : []
    }
    const [state, dispatch] = useReducer(todoReducer, initialState);
    */
    const [state, dispatch] = useReducer(todoReducer, undefined, () => {
        //✅ This makes initial state creation lazy, ensuring it's only computed once.
        const stored = localStorage.getItem('todos');
        return {
            todos: stored ? JSON.parse(stored) : []
        };
    });


    const handleDelete = (id: string) => {
        dispatch({ type: "DELETE_TODO", payload: id });
    }

    const handleAdd = (todo: Todo) => {
        dispatch({ type: 'ADD_TODO', payload: todo })
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state.todos));
    }, [state.todos])

    return {
        todos: state.todos,
        handleDelete,
        handleAdd

    }
}