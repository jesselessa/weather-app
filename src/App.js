// React
import React, { createContext, useState } from "react";
// Other libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
  // State initialization either with the localStorage key "favoriteCities" or if the keys contains nothing, with an empty array
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  // const value = {
  //   favoriteCities: favoriteCities,
  //   setFavoriteCities: setFavoriteCities,
  // };

  return (
    // Below context with state
    <FavoritesContext.Provider value={{ favoriteCities, setFavoriteCities }}>
      <BrowserRouter className="container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/favorites" element={<Favorites />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </FavoritesContext.Provider>
  );
}
