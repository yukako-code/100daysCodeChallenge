import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';

const App = () => {
  const [city, setCity] = useState('');
  const { error, weather, fetchWeather, isLoading } = useWeather();

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCity(value);
  }

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather(city);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">AsyncWeather</h1>
      <form className='flex gap-2 mb-4' onSubmit={handleSubmit}>
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Enter city name..."
          value={city}
          aria-label="City name"
          onChange={handleCityChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={!city.trim() || isLoading}
        >
          {isLoading ? 'Fetching...' : 'Fetch'}
        </button>
      </form>

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