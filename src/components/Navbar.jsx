import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownActive(!dropdownActive);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>Artistry</h1>
          </Link>
        </div>

        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Hem
            </Link>
          </li>
          <li>
            <Link to="/gallery" onClick={() => setIsOpen(false)}>
              Galleri
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              Om oss
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/upload" onClick={() => setIsOpen(false)}>
                  Ladda upp
                </Link>
              </li>
              <li
                className={`dropdown ${dropdownActive ? "active" : ""}`}
                ref={dropdownRef}
              >
                <span className="dropdown-toggle" onClick={toggleDropdown}>
                  {JSON.parse(localStorage.getItem("user"))?.username ||
                    "Användare"}{" "}
                  ▼
                </span>
                <div className="dropdown-menu">
                  <Link
                    to="/profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      setDropdownActive(false);
                    }}
                  >
                    Min profil
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                      setDropdownActive(false);
                    }}
                  >
                    Logga ut
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Logga in
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
