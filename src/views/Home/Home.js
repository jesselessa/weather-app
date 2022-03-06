// React
import { useState, useContext } from "react";
// Other library
import { toast } from "react-toastify";
// API
import { fetchWeatherApi } from "../../utils/API";
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
          .then((res) => setWeatherCity(res))
          .catch((err) => console.log(err));
      } else {
        // Second button : add to favorites and save in local storage
        if (context.favoriteCities.length === 3) {
          toast.error(
            "You can't have more than three cities in your Favorites list !"
          );
        } else {
          // Create a copy of the context (favoriteCities) and add city in the array
          const copyFavoriteCities = [...context.favoriteCities, city];
          // Modification of the state of FavoritesContext
          context.setfavoriteCities(copyFavoriteCities);
          // Add to local storage
          localStorage.setItem(
            "favoriteCities",
            JSON.stringify(copyFavoriteCities)
          );
          toast.success("The city has been added to your Favorites list");
        }
      }
    } else {
      toast.error("Please, enter a city name in the search area");
    }
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
    </>
  );
}
