import type { Todo } from "../type"

type TodoState = {
    todos: Array<Todo>
}

type TodoAction =
    { type: "DELETE_TODO"; payload: string } | { type: "ADD_TODO"; payload: Todo }

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };

        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            }
        default:
            return state;
    }

}