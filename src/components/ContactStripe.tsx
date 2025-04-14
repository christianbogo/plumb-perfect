import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contact-stripe.css";
import PhoneIcon from "../assets/phone-white.svg"; // Import your phone SVG

function ContactStripe() {
  const [isShortScreen, setIsShortScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsShortScreen(window.innerWidth < 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    navigate("/about");
  };

  return (
    <div className="contact-stripe" onClick={handleClick}>
      <div className="content">
        <p className="tag">
          {isShortScreen ? "Serving NCW!" : "Serving all of the NCW!"}
        </p>
        <div className="phone-container">
          <img src={PhoneIcon} alt="Phone Icon" className="phone-icon" />
          <p className="phone">(509) 663-3602</p>
        </div>
      </div>
    </div>
  );
}

export default ContactStripe;
