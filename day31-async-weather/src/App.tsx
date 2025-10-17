import React, { useState } from 'react';
import { useWeatherInfo } from './hooks/useWeatherInfo';

const App = () => {
  const [cityName, setCityName] = useState('');
  const { isLoading, error, weather, fetchWeather } = useWeatherInfo();

  const handleCityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCityName(value);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    fetchWeather(cityName);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">AsyncWeather</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Enter city name..."
          value={cityName}
          onChange={handleCityNameChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch
        </button>
      </div>

      {isLoading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{JSON.stringify(error)}</p>}
      {weather && (
        <div className="text-center">
          <p className="text-lg font-semibold">{weather.areaName}</p>
          <p>{weather.description}</p>
          <p>{weather.tempC}°C</p>
        </div>
      )}
    </div>
  );
}
export default App;