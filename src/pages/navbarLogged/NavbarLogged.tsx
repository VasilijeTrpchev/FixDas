import { Link, useLocation } from "react-router-dom";
import "./navbarLogged.css";
const NavbarLogged = () => {
  const location = useLocation();

  return (
    <nav className="navbar position-fixed bottom-0  w-100 shadow-lg p-3">
      <ul className="nav justify-content-around align-items-center w-100 m-0  ">
        <li className="nav-item text-center">
          <Link to={"/bookings"} className="nav-link p-0">
            <img
              src="/icons/nav-icon-1.svg"
              alt="bookings"
              className={`img-fluid icon ${
                location.pathname.startsWith("/bookings") ? "active" : ""
              }`}
            />
          </Link>
          {location.pathname.startsWith("/bookings") && (
            <p className="active-name m-0 pt-1">Bookings</p>
          )}
        </li>
        <li className="nav-item text-center">
          <Link to={"/karte"} className="nav-link p-0">
            <img
              src="/icons/nav-icon-2.svg"
              alt="karte"
              className={`img-fluid icon ${
                location.pathname.startsWith("/karte") ? "active" : ""
              }`}
            />
          </Link>
          {location.pathname.startsWith("/karte") && (
            <p className="active-name m-0 pt-1">Map</p>
          )}
        </li>
        <li className="nav-item text-center">
          <Link to={"/homepageLogged"} className="nav-link p-0">
            <img
              src="/icons/nav-icon-3.svg"
              alt="home"
              className={`img-fluid icon ${
                location.pathname === "/homepageLogged" ||
                location.pathname.startsWith("/profileHandyman")
                  ? "active"
                  : ""
              }`}
            />
          </Link>
          {(location.pathname.startsWith("/homepageLogged") ||
            location.pathname.startsWith("/profileHandyman")) && (
            <p className="active-name m-0 pt-1">Homepage</p>
          )}
        </li>
        <li className="nav-item text-center">
          <Link to={"/chat"} className="nav-link p-0">
            <img
              src="/icons/nav-icon-4.svg"
              alt="chat"
              className={`img-fluid icon ${
                location.pathname.startsWith("/chat") ? "active" : ""
              }`}
            />
          </Link>
          {location.pathname.startsWith("/chat") && (
            <p className="active-name m-0 pt-1">Chat</p>
          )}
        </li>
        <li className="nav-item text-center">
          <Link to={"/profile"} className="nav-link p-0">
            <img
              src="/icons/nav-icon-5.svg"
              alt="profile"
              className={`img-fluid icon ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            />
          </Link>
          {location.pathname === "/profile" && (
            <p className="active-name m-0 pt-1">Profile</p>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLogged;
