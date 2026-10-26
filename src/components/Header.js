import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <img src={logo} alt="Little Lemon logo" />

      <nav className={menuOpen ? "nav open" : "nav"}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/coming-soon">About</Link></li>
          <li><Link to="/coming-soon">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/coming-soon">Order Online</Link></li>
          <li><Link to="/coming-soon">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;