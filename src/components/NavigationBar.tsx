import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>
  );
}

export default NavigationBar;
