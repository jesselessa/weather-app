// React
import { useState, useContext } from "react";

// Other library
import { toast } from "react-toastify";

// API
import { fetchWeatherApi } from "../../utils/API";

// Component
import CityCard from "../../components/CityCard/CityCard";

// CSS
import "./Home.css";

// Context
import { FavoritesContext } from "../../App.js";

export default function Home() {
  // States
  const context = useContext(FavoritesContext);
  const [city, setCity] = useState("");
  const [weatherCity, setWeatherCity] = useState(null);
  const [buttonClick, setButtonClick] = useState("buttonFetch");

  console.log("HOME#favoriteCitiesContext :", context.favoriteCities);

  // Logic of both buttons gathered in a same function
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form default behaviour to refresh itself on submit
    if (city) {
      // First button : API call
      if (buttonClick === "buttonFetch") {
        fetchWeatherApi(city)
          .then((res) => {
            // Check valid city name
            if (res.cod !== 200) {
              toast.error("Please, enter a valid city name");
            } else {
              setWeatherCity(res);
            }
          })
          .catch((err) => console.log(err));
      } else {
        // Second button : add to favorites and save in local storage
        if (context.favoriteCities.length === 3) {
          toast.error(
            "You can't save more than three cities in your Favorites list !"
          );
        } else {
          // Create a copy of the context (favoriteCities) and add city in this new array
          const copyFavoriteCities = [...context.favoriteCities, city];
          // Change state of favoriteCities context
          context.setFavoriteCities(copyFavoriteCities); // Add to local storage
          localStorage.setItem(
            "favoriteCities",
            JSON.stringify(copyFavoriteCities)
          );
          toast.success("The city has been added to your Favorites list");
        }
      }
    } else {
      toast.error("Enter a city name in the search area");
    }
  };

  console.log("Home#city :", city);
  console.log("Home#weatherCity :", weatherCity);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="city"
          name="city"
          placeholder="Enter a city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="btnBox">
          <button
            type="submit"
            id="buttonFetch"
            onClick={(e) => setButtonClick(e.target.id)}
          >
            Search
          </button>
          <button
            type="submit"
            id="buttonFavorite"
            onClick={(e) => setButtonClick(e.target.id)}
          >
            Add to favorites
          </button>
        </div>
      </form>

      {weatherCity && <CityCard weatherCity={weatherCity} />}
    </div>
  );
}
