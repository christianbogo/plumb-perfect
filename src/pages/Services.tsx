import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Assuming your Firebase config is here

import "../styles/services.css"; // Create a CSS file for this component

import { addServices } from "../firebase/addServices"; // Import the function to add services

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

  if (loading) {
    return <div>Loading Services...</div>;
  }

  if (error) {
    return <div>Error loading services: {error}</div>;
  }

  return (
    <div className="page">
      {/* <button onClick={addServices}>Add Services to Firebase</button> */}
      <h1>Our Services</h1>
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
