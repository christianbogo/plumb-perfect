import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../styles/about.css";

const About = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(
          storage,
          "gs://plumb-perfect-5af21.firebasestorage.app/team.png" // Use the same path
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
    <div className="about-container page">
      <div className="about-content">
        <h2>About Plumb Perfect</h2>
        <p>
          At Plumb Perfect, we are dedicated to providing reliable and
          high-quality plumbing services. With a commitment to excellence, our
          skilled team handles everything from routine maintenance to urgent
          repairs, ensuring your plumbing systems function flawlessly.
        </p>
        <p>
          We understand that plumbing issues can arise at any time, which is why
          we offer comprehensive emergency services outside of our standard
          business hours, including weekends and holidays. Your peace of mind is
          our priority, and we are always ready to respond when you need us
          most.
        </p>
        <p>
          Plumb Perfect is more than just a service provider; we are your
          trusted partner in maintaining a safe and efficient home or business.
          We pride ourselves on our professionalism, attention to detail, and
          commitment to customer satisfaction. Let us take care of your plumbing
          needs with precision and expertise.
        </p>
      </div>
      <div className="contact-info">
        <div className="hours">
          <h3>Plumbing Services</h3>
          <p>Monday - Friday: 8 AM - 4 PM</p>
          <h3>Emergency Services</h3>
          <p>Monday - Friday: 4 PM - 8 AM</p>
          <p>Weekends & Holidays</p>
        </div>
        <div className="contact-details">
          <div className="phone">
            <img src="../assets/phone.svg" alt="Phone Icon" className="icon" />
            <p>(509) 286-2178</p>
          </div>
          <div
            className="facebook"
            onClick={() =>
              window.open(
                "https://www.facebook.com/PlumbPerfectWenatchee/",
                "_blank"
              )
            }
          >
            <img
              src="../assets/facebook.svg"
              alt="Facebook Icon"
              className="icon"
            />
            <p>PlumbPerfect</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading team image...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {imageUrl && (
        <div
          className="hero-image-container" // Changed class name for clarity
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}
    </div>
  );
};

export default About;
