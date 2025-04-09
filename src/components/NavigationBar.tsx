import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../assets/pp-icon.svg";

import "../styles/navigation-bar.css";

function NavigationBar() {
  const location = useLocation();
  return (
    <header>
      <div className="content">
        <Link to="/">
          <div className="title">
            <img src={LogoIcon} alt="Plumb Perfect Logo" className="logo" />
            <h1 className="libra-franklin">Plumb Perfect</h1>
          </div>
        </Link>
        <ul>
          <li>
            <Link
              to="/services"
              className={location.pathname === "/services" ? "active" : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavigationBar;
