// React
import React, { createContext, useState } from "react";
// Other libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Views
import Home from "./views/Home";
import Favorites from "./views/Favorites";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// CSS
import "./App.css";

// Creation of context
export const FavoritesContext = createContext();

export default function App() {
  // State initialization either with the localStorage key "favoriteCities" or if the keys contains nothing, with an empty array
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  return (
    // Below context with state
    <FavoritesContext.Provider value={{ favoriteCities, setFavoriteCities }}>
      <div className=" min-h-screen flex flex-col justify-between">
        <BrowserRouter className="container">
          <Navbar />
          <Routes>
            <Route exact path="/weather-app" element={<Home />}></Route>
            <Route
              exact
              path="/weather-app/favorites"
              element={<Favorites />}
            ></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      <ToastContainer />
    </FavoritesContext.Provider>
  );
}
