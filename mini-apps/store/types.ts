export enum Status {
    Idle = "Idle",
    Loading = "Loading",
    Success = "Success",
    Error = "Error",
}

export type GeneralState = {
    status: Status;
    error?: string;
}

export type GeneralAction =
    | { type: "SET_STATUS"; payload: Status }
    | { type: "SET_ERROR"; payload?: string }
    | { type: "RESET_GENERAL_STATE" };