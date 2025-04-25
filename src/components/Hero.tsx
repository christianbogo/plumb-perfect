import LogoFull from "../assets/icons/logo-full.svg";

import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-logo">
        <img src={LogoFull} alt="Plumb Perfect Logo" />
      </div>
      <img src="../assets/team.png" alt="Team" className="hero-image" />

      <div className="hero-text">
        <p>
          Providing Elite <strong>Plumbing Services</strong> to all of{" "}
          <strong>North Central Washington</strong> Since 1998
        </p>
      </div>

      <div className="hero-hours">
        <h2>Our Hours</h2>
        <h3>Plumbing Services</h3>
        <p>Monday-Friday: 8AM - 4PM</p>
        <h3>Emergency Services</h3>
        <p>Monday-Friday: 4PM - 8AM </p>
        <p>Weekends & Holidays</p>
      </div>
    </section>
  );
}

export default Hero;
