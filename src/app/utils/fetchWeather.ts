export const fetchWeather = async (lat: number, lon: number) => {
    return await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`).then((res) => res.json());
}