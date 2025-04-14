import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/service.css"; // Create a CSS file for this component

function Service() {
  const { serviceUrl } = useParams();
  interface ServiceData {
    heading: string;
    title?: string;
    bodyTexts?: string[];
    image?: string;
    imageUrl?: string;
    icon?: string;
  }

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        if (!serviceUrl) {
          throw new Error("Service URL is undefined.");
        }
        const serviceQuery = query(
          collection(db, "services"),
          where("url", "==", serviceUrl)
        );
        const querySnapshot = await getDocs(serviceQuery);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];

          if (docSnap.exists()) {
            const serviceData = docSnap.data() as ServiceData;
            if (!serviceData.heading) {
              throw new Error(
                "Missing required 'heading' field in service data."
              );
            }
            setService(serviceData);

            // Fetch image URL from Firebase Storage
            if (serviceData.image) {
              const imageRef = ref(storage, serviceData.image);
              const downloadURL = await getDownloadURL(imageRef);
              setService((prevService) => {
                if (!prevService) return null;
                return {
                  ...prevService,
                  imageUrl: downloadURL,
                };
              });
            }

            setLoading(false);
          } else {
            setError("Service not found.");
            setLoading(false);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setLoading(false);
        console.error("Error fetching service detail:", err);
      }
    };

    fetchServiceDetail();
  }, [serviceUrl, storage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return <div>Service not found.</div>;
  }

  return (
    <div className="page">
      <div
        className="service-hero-card"
        style={{
          backgroundImage: service.imageUrl
            ? `url(${service.imageUrl})`
            : "none",
        }}
      >
        <h1 className="service-heading">{service.heading}</h1>
      </div>

      {/* Body Text Section */}
      <div className="service-body">
        {service.bodyTexts &&
          service.bodyTexts.map((text, index) => <p key={index}>{text}</p>)}
      </div>

      {/* Contact for Consultation Section */}
      {/* Contact for Consultation Section */}
      <div className="service-contact">
        {/* Removing the heading and description */}
        <div className="contact-container">
          <img
            src="../assets/phone.svg"
            alt="Phone Icon"
            className="contact-phone-icon"
          />
          <p className="contact-phone-number">(509) 663-3602</p>
        </div>
      </div>
    </div>
  );
}

export default Service;
