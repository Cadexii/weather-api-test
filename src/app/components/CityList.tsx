"use client";

import { useEffect, useState } from "react";
import { fetchWeather } from "../utils/fetchWeather";

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

type CityProps = {
  name: string;
  lat: number;
  lon: number;
};

const cities: CityProps[] = [
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
];

const CityList = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCityWeather = async () => {
      setLoading(true);
      try {
        const weatherPromises = cities.map((city) =>
          fetchWeather(city.lat, city.lon)
        );
        const weatherResults = await Promise.all(weatherPromises);
        setWeatherData(weatherResults);
        setLoading(false);
      } catch {
        console.log("Error fetching city data");
        setWeatherData(null);
        setLoading(false);
      }
    };
    fetchCityWeather();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        gap: "10px",
      }}
    >
      {cities.map((city) => (
        <div
          key={city.name}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <h2>{city.name}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : weatherData ? (
            <>
              <p>
                Current Temp:{" "}
                {weatherData[cities.indexOf(city)].current_weather.temperature}
                °C
              </p>
              <ul>
                {weatherData[cities.indexOf(city)].daily.time.map(
                  (date, index) => (
                    <li key={date}>
                      <strong>{date}</strong> - Max:{" "}
                      {
                        weatherData[cities.indexOf(city)].daily
                          .temperature_2m_max[index]
                      }
                      °C, Min:{" "}
                      {
                        weatherData[cities.indexOf(city)].daily
                          .temperature_2m_min[index]
                      }
                      °C
                    </li>
                  )
                )}
              </ul>
            </>
          ) : (
            <p>Error fetching data</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CityList;
