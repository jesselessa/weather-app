// React
import { useState, useContext } from "react";
// Other library
import { toast } from "react-toastify";
// API
import { fetchWeatherApi } from "../utils/API";
// Component
import CityCard from "../components/CityCard";
// Context
import { FavoritesContext } from "../App";

export default function Home() {
  // States
  const context = useContext(FavoritesContext);
  const [city, setCity] = useState("");
  const [weatherCity, setWeatherCity] = useState(null);
  const [buttonClick, setButtonClick] = useState("buttonFetch");
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
        // Second button : add to favorites and save in local storage, but first check if the city has not been already stored
        if (context.favoriteCities.indexOf(city) !== -1) {
          toast.error("You already saved this city in your Favorites list !");
        } else {
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
      }
    } else {
      toast.error("Enter a city name in the search area");
    }
  };

  return (
    <div className="container mx-auto px-5 min-h-fit flex flex-col justify-around">
      <h2 className="text-3xl font-bold mb-3 text-center">
        Get weather data from any city !
      </h2>
      <form onSubmit={handleSubmit} className="w-3/4 md:w-1/2 mx-auto">
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            className="form-control
          block
          w-full
          px-3 py-1.5
          text-base font-normal text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded-md shadow-sm
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="search"
            id="city"
            name="city"
            placeholder="Enter a city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-around pt-5">
          <button
            type="submit"
            id="buttonFetch"
            onClick={(e) => setButtonClick(e.target.id)}
            className="inline-flex items-center justify-center px-3 py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-amber-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
          <button
            type="submit"
            id="buttonFavorite"
            onClick={(e) => setButtonClick(e.target.id)}
            className="inline-flex items-center justify-center px-4 py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:text-indigo-600
            hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to favorites
          </button>
        </div>
      </form>
      <div className="flex flex-row justify-around m-4">
        {weatherCity && <CityCard weatherCity={weatherCity} />}
      </div>
    </div>
  );
}
