export enum TaskPriority {
    High = "High",
    Normal = "Normal",
    Low = "Low",
}

export type Task = {
    id: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    tag?: string;
    createdAt: string;
    completedAt?: string;
}