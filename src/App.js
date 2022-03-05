// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Views
import Home from "./views/Home/Home";
import Favorites from "./views/Favorites/Favorites";
// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// CSS
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/favorites" element={<Favorites />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
