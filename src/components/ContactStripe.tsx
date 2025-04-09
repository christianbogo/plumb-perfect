import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contact-stripe.css";

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
        <p className="phone">(509) 286-2178</p>
      </div>
    </div>
  );
}

export default ContactStripe;
