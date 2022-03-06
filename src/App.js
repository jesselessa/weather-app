// React
import React, { createContext, useState } from "react";
// Other library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Views
import Home from "./views/Home/Home";
import Favorites from "./views/Favorites/Favorites";
// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// CSS
import "./App.css";

// Creation of context
export const FavoritesContext = createContext();

export default function App() {
  // State initialization either with the localStorage key "favoritesCities" or if the keys contains nothing, with an empty array
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoritesCities")) || []
  ); // localStorage only accepts strings (JSON.parse : string => JSON ; JSON.stringify : JSON => string )

  // const value = {
  //   favoriteCities: favoriteCities,
  //   setFavoriteCities: setFavoriteCities,
  // };

  return (
    <FavoritesContext.Provider value={{ favoriteCities, setFavoriteCities }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/favorites" element={<Favorites />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </FavoritesContext.Provider>
  );
}
