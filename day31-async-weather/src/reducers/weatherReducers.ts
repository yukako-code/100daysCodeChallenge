import { WeatherStatus } from "../constants";
import type { Weather } from "../domain/weather";

export type WeatherState = {
    weather: Weather | undefined;
    status: WeatherStatus;
    error: string | undefined;
}

type WeatherAction =
    { type: 'FETCH_WEATHER' } |
    { type: 'FETCH_SUCCESS', payload: Weather } |
    { type: 'FETCH_ERROR', payload: string } |
    { type: 'FETCH_CANCELED' }

export const initialWeatherState: WeatherState = {
    weather: undefined,
    status: WeatherStatus.IDLE,
    error: undefined
};

export const weatherReducers = (state: WeatherState, action: WeatherAction): WeatherState => {
    switch (action.type) {
        case "FETCH_WEATHER":
            return {
                ...state,
                status: WeatherStatus.LOADING,
                weather: undefined, //initialize weather to undefined when fetching
                error: undefined //initialize error to undefined when fetching
            }
        case "FETCH_SUCCESS":
            return {
                ...state,
                status: WeatherStatus.SUCCESS,
                weather: action.payload,
                error: undefined
            }
        case "FETCH_ERROR":
            return {
                ...state,
                status: WeatherStatus.ERROR,
                weather: undefined,
                error: action.payload
            }
        case "FETCH_CANCELED":
            return {
                ...state,
                status: WeatherStatus.CANCELED,
                weather: undefined,
                error: undefined
            }
        default:
            return state;
    }
}