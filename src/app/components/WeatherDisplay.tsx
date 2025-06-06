"use client";

import { useState } from "react";
import { fetchWeather } from "../utils/fetchWeather";
import { geocodeCity } from "../utils/geocodeCity";

type WeatherData = {
  current_weather: {
    temperature: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setWeatherData(null);
    setLoading(true);

    try {
      const geo = await geocodeCity(input);
      setLocation(geo.name);
      const weather = await fetchWeather(geo.lat, geo.lon);
      setWeatherData(weather);
      setLoading(false);
      setInput("");
    } catch {
      console.log("Error fetching weather data.");
      setWeatherData(null);
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        style={{
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
        }}
        type="text"
        placeholder="Enter city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        style={{
          padding: "5px 10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleSearch}
      >
        Search
      </button>
      {loading && <p>Loading...</p>}
      {weatherData && (
        <div>
          <strong>
            <h2>{location}</h2>
          </strong>
          <p>Temperature: {weatherData.current_weather.temperature}°C</p>
          <ul>
            {weatherData.daily.time.map((date, index) => (
              <li key={date}>
                <strong>{date}</strong> - Max:{" "}
                {weatherData.daily.temperature_2m_max[index]}°C, Min:{" "}
                {weatherData.daily.temperature_2m_min[index]}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
