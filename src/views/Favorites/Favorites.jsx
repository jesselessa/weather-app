// React
import { useState, useEffect, useContext } from "react";
// React Router Dom
import { useNavigate } from "react-router-dom";
// API
import { fetchWeatherApi } from "../../utils/API";
// Component
import CityCard from "../../components/CityCard/CityCard";
// CSS
import "./Favorites.css";
// Context
import { FavoritesContext } from "../../App";

export default function Favorites() {
  // Context
  const context = useContext(FavoritesContext);
  // Navigation with Router-Dom
  const navigate = useNavigate();

  // State
  const [weatherCities, setWeatherCities] = useState([]);

  // Hook - ComponentDidMount
  useEffect(() => {
    const fetchFunc = async () => {
      const promises = [];
      context.favoriteCities.forEach((city) =>
        promises.push(fetchWeatherApi(city))
      );
      await Promise.all(promises).then((res) => setWeatherCities(res));
    };    
    if (context.favoriteCities.length !== 0) {
      fetchFunc();
    }
  }, [context.favoriteCities]);

  // Fetchfunc() : asynchronous function which waits the responses of all fetches and puts them in an array
  // const fetchFunc = async () => {
  //   const promises = [];
  //   context.favoriteCities.forEach((city) =>
  //     promises.push(fetchWeatherApi(city))
  //   );
  //   await Promise.all(promises).then((res) => setWeatherCities(res));
  // };

  // Remove favorite
  const removeFavorite = (index) => {
    const copyWeatherCities = [...weatherCities];
    copyWeatherCities.splice(index, 1);
    setWeatherCities(copyWeatherCities);

    // Update in localStorage
    const copyFavoriteCities = [...context.favoriteCities];
    copyFavoriteCities.splice(index, 1);
    localStorage.setItem("favoriteCities", JSON.stringify(copyFavoriteCities));
  };

  return (
    <>
      {context.favoriteCities.length === 0 ? (
        <div>
          <h3>You haven't saved any favorite city yet</h3>
          <button
            type="button"
            id="buttonFavorite"
            onClick={() => navigate("/")}
          >
            Back home
          </button>
        </div>
      ) : (
        weatherCities.map((weatherCity, index) => {
          return (
            <CityCard
              key={index}
              weatherCity={weatherCity}
              onClick={() => removeFavorite(index)}
            />
          );
        })
      )}
    </>
  );
}
