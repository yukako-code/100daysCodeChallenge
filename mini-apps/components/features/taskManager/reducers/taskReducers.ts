import { Status } from "../../../../store/types";
import { Task, TaskPriority } from "../constants/type";
import { GeneralState, GeneralAction } from "@store/types";

const MOCK_TASKS: Array<Task> = [
    {
        id: 'random-id-1',
        title: "Sample task title",
        description: "Optional description for this task goes here.",
        priority: TaskPriority.High,
        tag: "Work",
        createdAt: "2025-11-13",
    },
    {
        id: 'random-id-2',
        title: "Completed sample task",
        priority: TaskPriority.Normal,
        tag: "Personal",
        createdAt: "2025-11-09",
        completedAt: "2025-11-10",
    }
]

type TaskState = GeneralState & {
    tasks: Array<Task>;
}

type TaskAction = GeneralAction & (
    | { type: "ADD_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: string }
);

export const initialTaskState: TaskState = {
    tasks: [...MOCK_TASKS],
    status: Status.Idle,
    error: undefined,
};

export const taskReducers = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((t: Task) => t.id !== action.payload),
            }

        case "SET_STATUS":
            return {
                ...state,
                status: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                status: Status.Error,
                error: action.payload
            }
        case "RESET_GENERAL_STATE":
            return {
                ...state,
                status: initialTaskState.status,
                error: initialTaskState.error,
            }
        default:
            return state
    }
};