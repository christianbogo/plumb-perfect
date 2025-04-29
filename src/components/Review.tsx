import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  callGetGoogleReviews,
  Review as ReviewData,
} from "../firebase/firebase";
import "../styles/review.css";

function Review() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const placeId = "ChIJ75f7XrvMm1QR7DVdfw7zCnU";

  useEffect(() => {
    if (!placeId) {
      setError("Review component needs a valid Place ID.");
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await callGetGoogleReviews({ placeId });

        if (result.data.success && result.data.reviews) {
          const validReviews = result.data.reviews.filter(
            (r) => r.text && r.text.trim() !== ""
          );
          setReviews(validReviews);
        } else {
          throw new Error(
            result.data.error || "Function call failed to retrieve reviews."
          );
        }
      } catch (err: any) {
        const message =
          err.message || "An error occurred while fetching reviews.";
        setError(message);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  const handleNavigate = () => {
    navigate("/about");
  };

  if (isLoading) {
    return (
      <div className="review-container-placeholder">Loading Reviews...</div>
    );
  }

  if (error) {
    return (
      <div className="review-container-placeholder" style={{ color: "red" }}>
        Error: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="review-container-placeholder">
        No customer reviews available at the moment.
      </div>
    );
  }

  const currentReview = reviews[0]; // Display the first review

  return (
    <div
      className="review-container"
      onClick={handleNavigate}
      title="Click to see more reviews"
      style={{ cursor: "pointer" }}
    >
      <div className="review-content">
        <p className="review-text">"{currentReview.text}"</p>
        <p className="review-author">- {currentReview.author_name}</p>
      </div>
      <p className="call-to-action">Click to see more reviews!</p>
    </div>
  );
}

export default Review;
