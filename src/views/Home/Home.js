// React
import { useState } from "react";
// API
import { fetchWeatherApi } from "../../utils/API";
import "./Home.css";

export default function Home() {
  // State
  const [city, setCity] = useState("");
  const [weatherCity, setWeatherCity] = useState([]);
  // const [buttonClick, setButtonClick] = useState("buttonFetch");

  const handleSubmit = (e) => {
    // prevent form default behaviour to refresh itself on submit
    e.preventDefault();
    fetchWeatherApi(city)
      .then((res) => {
        console.log(res);
        setWeatherCity(res);
      })
      .catch((err) => console.log(err));
  };
  console.log("Home#city :", city);
  console.log("Home#weatherCity :", weatherCity);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="city"
          name="city"
          placeholder="Enter a city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" value="city">
          Search
        </button>
        {/* <input type="submit" value="Add to Favorites" /> */}
      </form>
    </>
  );
}
