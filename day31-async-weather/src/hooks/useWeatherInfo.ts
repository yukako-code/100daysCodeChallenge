import { useState } from "react"
import type { Weather } from "../constants/type"

type HooksReturnType = {
    weather: Weather | undefined,
    isLoading: boolean,
    error: string | undefined,
    fetchWeather: (name: string) => Promise<void>
}

const FETCH_URL = 'https://wttr.in';
export const useWeatherInfo = (): HooksReturnType => {
    const [weather, setWeather] = useState<Weather | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchWeather = async (city: string) => {
        setIsLoading(true);
        setWeather(undefined);
        setError(undefined);
        try {
            const res = await fetch(`${FETCH_URL}/${city}?format=j1`);
            const data = await res.json();
            console.log({ data });
            const currentCondition = data.current_condition[0];
            console.log({ currentCondition });
            setWeather({
                tempC: currentCondition?.temp_C ?? '',
                description: currentCondition?.weatherDesc[0]?.value ?? '',
                areaName: data.nearest_area[0]?.areaName[0]?.value ?? ''
            })
        } catch (e: any) {
            //TODO: error handling
            setError('Error encountered while fetching weather info. Check your input and Please try again.');
            setWeather(undefined);
        } finally {
            setIsLoading(false);
        }

    };

    return {
        weather,
        isLoading,
        error,
        fetchWeather
    }
}