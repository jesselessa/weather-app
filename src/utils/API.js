export const fetchWeatherApi = async (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=$759d5830049be93bf370837fa5147c7f`
  ).then((res) => res.json());
  //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  // ).then((res) => res.json());
};
