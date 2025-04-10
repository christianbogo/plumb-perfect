import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../styles/hero.css";

function Hero() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(
          storage,
          "gs://plumb-perfect-5af21.firebasestorage.app/team.png"
        );
        const downloadURL = await getDownloadURL(imageRef);
        setImageUrl(downloadURL);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error loading hero image"
        );
        setLoading(false);
        console.error("Error fetching hero image:", err);
      }
    };

    fetchImage();
  }, [storage]);

  return (
    <section className="hero">
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading hero image...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {imageUrl && (
        <div
          className="hero-image-container"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}

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
