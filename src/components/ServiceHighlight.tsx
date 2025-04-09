import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/service-highlight.css"; // Create a CSS file for this component

function ServiceHighlight() {
  const [services, setServices] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // For scrolling control
  const containerRefReverse = useRef<HTMLDivElement>(null); // For reverse scrolling control

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const serviceList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(serviceList);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading && !error && services.length > 0) {
      // Animation logic for the first container
      const container = containerRef.current;
      if (container) {
        let scrollAmount = 1200; // Start scrolling from a specific position
        const scrollSpeed = 0.3; // Adjust the scroll speed
        const animateContainer = () => {
          container.scrollLeft = scrollAmount;
          scrollAmount += scrollSpeed;
          if (scrollAmount >= container.scrollWidth - container.clientWidth) {
            scrollAmount = 0; // Reset scroll to beginning
          }
          requestAnimationFrame(animateContainer);
        };

        requestAnimationFrame(animateContainer);
      }

      // Animation logic for the reverse container
      const containerReverse = containerRefReverse.current;
      if (containerReverse) {
        let scrollAmountReverse =
          containerReverse.scrollWidth - containerReverse.clientWidth;
        const scrollSpeedReverse = 0.3; // Adjust the scroll speed
        const animateContainerReverse = () => {
          containerReverse.scrollLeft = scrollAmountReverse;
          scrollAmountReverse -= scrollSpeedReverse;
          if (scrollAmountReverse <= 0) {
            scrollAmountReverse =
              containerReverse.scrollWidth - containerReverse.clientWidth; // Reset scroll to end
          }
          requestAnimationFrame(animateContainerReverse);
        };

        requestAnimationFrame(animateContainerReverse);
      }
    }
  }, [loading, error, services]);

  if (loading) {
    return (
      <div className="service-highlight">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading featured services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-highlight">
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-highlight-container">
      <div className="service-highlight">
        <h2 className="service-highlight-title">We Do It All</h2>
        <p className="service-highlight-subtitle">
          Click Anywhere to View Our Services
        </p>
        <div className="service-row" ref={containerRefReverse}>
          {services.map((service) => (
            <Link
              to="/services" // Navigate to services page on click
              key={service.id}
              className="service-card"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="service-icon"
              />
              <p className="service-title">{service.title}</p>
            </Link>
          ))}
        </div>
        <div className="service-row" ref={containerRef}>
          {services
            .map((service) => (
              <Link
                to="/services" // Navigate to services page on click
                key={`${service.id}-reverse`}
                className="service-card"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="service-icon"
                />
                <p className="service-title">{service.title}</p>
              </Link>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
}

export default ServiceHighlight;
