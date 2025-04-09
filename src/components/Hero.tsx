import "../styles/hero.css";

import PlumbPerfectIcon from "../assets/pp-icon.svg";
import SimplySewerIcon from "../assets/ss-icon.svg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p>
          Providing Elite <strong>Plumbing Services</strong> to all of{" "}
          <strong>North Central Washington</strong> Since 1998
        </p>
      </div>
      <div className="hero-hours">
        <h2>Our Hours</h2>
        <h3>Plumbing Services</h3>
        <p>Monday-Friday: 8AM - 5PM</p>
        <h3>Emergency Services</h3>
        <p>Monday-Friday: 4PM - 5AM </p>
        <p>Weekends & Holidays</p>
      </div>
    </section>
  );
}
export default Hero;
