// React
import { useState, useEffect, useContext } from "react";
// React Router Dom
import { useNavigate } from "react-router-dom";
// API
import { fetchWeatherApi } from "../utils/API";
// Component
import CityCard from "../components/CityCard";
// Context
import { FavoritesContext } from "../App";

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
    <div className="py-9 flex flex-col lg:flex-row lg:justify-around">
      {context.favoriteCities.length === 0 ? (
        <div className="flex flex-row justify-around items-center pt-5">
          <h3 className="mb-2 mx-2">No favorite city saved yet</h3>
          <button
            type="button"
            id="buttonFavorite"
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 mx-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </div>
  );
}
