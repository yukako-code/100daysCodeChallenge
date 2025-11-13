import { useReducer } from "react";
import { Task, TaskPriority } from "../constants/type"
import { initialTaskState, taskReducers } from "../reducers/taskReducers";
import { Status } from "../../../../store/types";

type HooksReturnType = {
    tasks: Array<Task>;
    isLoading: boolean;
    error?: string;
    handleAddTask: (t: string) => void
}
export const useTasks = (): HooksReturnType => {
    const [state, dispatch] = useReducer(taskReducers, initialTaskState);

    const handleAddTask = (newTask: string) => {
        dispatch({ type: "SET_STATUS", payload: Status.Loading });
        //if empty, return error
        if (!newTask.trim()) {
            // dispatch error
            dispatch({ type: "SET_ERROR", payload: "Task title cannot be empty." });
            return
        }
        // dispatch loading
        dispatch({ type: "SET_", payload: true });
        const tempNewTask: Task = {
            id: crypto.randomUUID(),
            title: newTask,
            priority: TaskPriority.Normal,
            createdAt: new Date().toISOString(),
        }

        dispatch({ type: "ADD_TASK", payload: tempNewTask });
        dispatch({ type: "RESET_GENERAL_STATE" });

    }
    return {
        tasks: state.tasks,
        isLoading: state.status === Status.Loading,
        error: state.status === Status.Error && state.error,
        handleAddTask
    }

}