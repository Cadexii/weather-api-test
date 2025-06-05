"use client";

import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/fetchWeather";
import { geocodeCity } from "../utils/geocodeCity";

type WeatherData = {
  temperature: number;
};

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<string | null>(null);

  const handleSearch = async () => {
    setWeatherData(null);

    try {
      const geo = await geocodeCity(input);
      setLocation(geo.name);
      const weather = await fetchWeather(geo.lat, geo.lon);
      setWeatherData(weather.current_weather);
    } catch {
      console.log("Error fetching weather data.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

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
      {weatherData && (
        <div>
          <h2>{location}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
