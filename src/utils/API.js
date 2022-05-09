const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWeatherApi = async (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  ).then((res) => res.json());
};
