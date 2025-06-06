export const fetchWeather = async (lat: number, lon: number) => {
    const data = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`).then((res) => res.json());
    console.log(data);
    return data;
}