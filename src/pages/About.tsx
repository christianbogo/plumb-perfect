import React, { useState, useEffect } from "react";
import "../styles/about.css";
import "../styles/review.css";

import {
  callGetGoogleReviews,
  Review as ReviewData,
} from "../firebase/firebase";

const About = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const placeId = "ChIJ75f7XrvMm1QR7DVdfw7zCnU";

  useEffect(() => {
    if (!placeId) {
      setReviewsError("Review fetching needs a valid Place ID.");
      setIsLoadingReviews(false);
      console.warn(
        "Place ID is not configured for review fetching in About component."
      );
      return;
    }

    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      setReviewsError(null);
      try {
        const result = await callGetGoogleReviews({ placeId });

        if (result.data.success && result.data.reviews) {
          const validReviews = result.data.reviews.filter(
            (r) => r.text && r.text.trim() !== ""
          );
          if (validReviews.length > 0) {
            setReviews(validReviews);
          } else {
            setReviews([]);
          }
        } else {
          throw new Error(
            result.data.error || "Function call failed to retrieve reviews."
          );
        }
      } catch (err: any) {
        console.error(
          "About: Failed to fetch reviews via Firebase Function:",
          err
        );
        const message =
          err.message || "An error occurred while fetching reviews.";
        setReviewsError(message);
        setReviews([]);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [placeId]);

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
            <p>(509) 663-3602</p>
          </div>
          <div
            className="facebook"
            onClick={() =>
              window.open(
                "https://www.facebook.com/PlumbPerfectWenatchee/",
                "_blank"
              )
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src="../assets/facebook.svg"
              alt="Facebook Icon"
              className="icon"
            />
            <p>PlumbPerfect</p>
          </div>
          <div
            className="instagram"
            onClick={() =>
              window.open("https://www.instagram.com/plumbperfect98/", "_blank")
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src="../assets/instagram.svg"
              alt="Instagram Icon"
              className="icon"
            />
            <p>PlumbPerfect98</p>
          </div>
        </div>
      </div>

      <div className="all-reviews-section">
        <h1>What Our Customers Say</h1>

        {isLoadingReviews && (
          <div
            className="review-container-placeholder"
            style={{ margin: "1rem auto" }}
          >
            Loading Reviews...
          </div>
        )}

        {reviewsError && (
          <div
            className="review-container-placeholder"
            style={{ color: "red", margin: "1rem auto" }}
          >
            Error loading reviews: {reviewsError}
          </div>
        )}

        {!isLoadingReviews && !reviewsError && reviews.length === 0 && (
          <div
            className="review-container-placeholder"
            style={{ margin: "1rem auto" }}
          >
            No customer reviews available at the moment.
          </div>
        )}

        {!isLoadingReviews &&
          !reviewsError &&
          reviews.length > 0 &&
          reviews.map((review) => (
            <div
              key={review.time || review.author_name + review.rating}
              className="review-container"
            >
              <div className="review-content">
                <p className="review-text">"{review.text}"</p>
                <p className="review-author">- {review.author_name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default About;
