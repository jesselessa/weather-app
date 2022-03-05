// React Router Dom
import { NavLink } from "react-router-dom";
// CSS
import "./Navbar.css";

export default function Navbar() {
  return (
    <header>
      <h1>My Weather App</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
    </header>
  );
}
