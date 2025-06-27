export type Todo = {
    id: number,
    text: string,
    completed: boolean
}

export enum TodoType {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}