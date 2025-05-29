import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar ">
      <div className="navbar-container">
        <Link to={"/"} className="logo">
          <img src={"/logo.png"} alt="Logo" />
        </Link>

        <button
          className={`burger-menu ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`fullscreen-menu justify-content-lg-end justify-content-center ${
            isMenuOpen ? "active" : ""
          }`}
        >
          <ul>
            <li>
              <Link to={"/signIn"} onClick={toggleMenu}>
                Anmelden
              </Link>
            </li>
            <li>
              <Link to={"/signIn"} onClick={toggleMenu}>
                Registrieren
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
