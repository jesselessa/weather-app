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
  const context = useContext(FavoritesContext);
  const navigate = useNavigate();

  const [weatherCities, setWeatherCities] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (context.favoriteCities.length !== 0) {
      fetchFunc();
    }
  }, []);
  // useEffect(() => {
  //   if (context.favoriteCities.length !== 0) {
  //     fetchFunc();
  //   }
  // }, [context.favoriteCities]);

  // Fetchfunc() : asynchronous function in order to make the fetch in a forEach
  const fetchFunc = async () => {
    const promises = [];
    context.favoriteCities.forEach((city) =>
      promises.push(fetchWeatherApi(city))
    );
    await Promise.all(promises).then((res) =>
      setWeatherCities([...weatherCities, res])
    );
    setIsloading(false);
  };

  // console.log("FAVORITES#weatherCities :", weatherCities);

  if (isLoading) {
    return <h3>Content is loading ...</h3>;
  }

  return (
    <>
      <div>
        {context.favoriteCities.length === 0 ? (
          <>
            <h2>You haven't saved any favorite city yet</h2>
            <button
              type="button"
              id="buttonFavorite"
              onClick={() => navigate("/")}
            >
              Retour à l'accueil
            </button>
          </>
        ) : (
          weatherCities[0].map((weatherCity, index) => {
            // console.log("FAVORITES#map :", weatherCity);
            return <CityCard key={index} weatherCity={weatherCity} />;
          })
        )}
      </div>
    </>
  );
}
