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

type TaskAction = GeneralAction | (
    | { type: "ADD_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: string }
    | { type: 'FETCH_TASKS'; payload: Array<Task> }
);

export const initialTaskState: TaskState = {
    tasks: [],
    status: Status.Idle,
    error: undefined,
};

// 1. 初期化関数を定義
export const initTaskState = (initial: typeof initialTaskState): typeof initialTaskState => {
    if (typeof window === "undefined") return initial; // SSR するならお守り

    const stored = localStorage.getItem("tasks");
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as Array<Task>;
            return {
                ...initial,
                tasks: parsed,
            };
        } catch {
            // パース失敗時は MOCK に fallback
            return {
                ...initial,
                tasks: MOCK_TASKS,
            };
        }
    }

    return {
        ...initial,
        tasks: MOCK_TASKS,
    };
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
        case "FETCH_TASKS":
            return {
                ...state,
                tasks: action.payload,
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