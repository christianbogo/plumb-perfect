import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import "../styles/services.css";

function Services() {
  const [services, setServices] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1 className="services-title">Our Services</h1>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="services-title">Our Services</h1>
        <div className="error-container">
          <p>Error loading services: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* <button onClick={addServices}>Add Services to Firebase</button> */}
      <h1 className="services-title">Our Services</h1>
      <ul className="service-grid">
        {services.map((service) => (
          <li key={service.id}>
            <Link to={`/service/${service.url}`}>
              <img
                src={service.icon}
                alt={service.title}
                className="service-icon"
              />
              <p className="service-title">{service.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
