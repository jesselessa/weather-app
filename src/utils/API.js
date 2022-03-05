export const fetchWeatherApi = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=759d5830049be93bf370837fa5147c7f`
  );
  return await res.json();
};
