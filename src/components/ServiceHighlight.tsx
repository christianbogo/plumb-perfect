import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/service-highlight.css";

function ServiceHighlight() {
  const [services, setServices] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRefReverse = useRef<HTMLDivElement>(null);

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
      const container = containerRef.current;
      if (container) {
        let scrollAmount = 1200;
        const scrollSpeed = 0.3;
        const animateContainer = () => {
          container.scrollLeft = scrollAmount;
          scrollAmount += scrollSpeed;
          if (scrollAmount >= container.scrollWidth - container.clientWidth) {
            scrollAmount = 0;
          }
          requestAnimationFrame(animateContainer);
        };

        requestAnimationFrame(animateContainer);
      }

      const containerReverse = containerRefReverse.current;
      if (containerReverse) {
        let scrollAmountReverse =
          containerReverse.scrollWidth - containerReverse.clientWidth;
        const scrollSpeedReverse = 0.3;
        const animateContainerReverse = () => {
          containerReverse.scrollLeft = scrollAmountReverse;
          scrollAmountReverse -= scrollSpeedReverse;
          if (scrollAmountReverse <= 0) {
            scrollAmountReverse =
              containerReverse.scrollWidth - containerReverse.clientWidth;
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
      <div
        className="service-highlight"
        onClick={() => {
          window.location.href = "/services";
        }}
      >
        <h2 className="service-highlight-title">We Do It All</h2>
        <p className="service-highlight-subtitle">
          Click Anywhere to View Our Services
        </p>
        <div className="service-row" ref={containerRefReverse}>
          {services.map((service) => (
            <Link
              to="/services"
              key={service.id}
              className="service-card"
              onClick={(e) => e.stopPropagation()}
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
                to="/services"
                key={`${service.id}-reverse`}
                className="service-card"
                onClick={(e) => e.stopPropagation()}
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
