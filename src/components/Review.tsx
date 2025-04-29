import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  callGetGoogleReviews,
  Review as ReviewData,
} from "../firebase/firebase";
import "../styles/review.css";

const REVIEW_CYCLE_INTERVAL_MS = 8000;
const FADE_TRANSITION_MS = 500;

function Review() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
          if (validReviews.length > 0) {
            setReviews(validReviews);
            const randomIndex = Math.floor(Math.random() * validReviews.length);
            setCurrentIndex(randomIndex);
          } else {
            setReviews([]);
          }
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

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (reviews.length > 1 && !isLoading && !error) {
      intervalRef.current = setInterval(() => {
        setIsFading(true);

        setTimeout(() => {
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * reviews.length);
          } while (nextIndex === currentIndex);
          setCurrentIndex(nextIndex);
          setIsFading(false);
        }, FADE_TRANSITION_MS);
      }, REVIEW_CYCLE_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reviews, isLoading, error, currentIndex]);

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

  const currentReview = reviews[currentIndex] || null;

  if (!currentReview) {
    return (
      <div className="review-container-placeholder">Loading Review...</div>
    );
  }

  return (
    <div
      className="review-container"
      onClick={handleNavigate}
      title="Click to see more reviews"
      style={{ cursor: "pointer" }}
    >
      <div className={`review-content ${isFading ? "fading" : ""}`}>
        <p className="review-text">"{currentReview.text}"</p>
        <p className="review-author">- {currentReview.author_name}</p>
      </div>
      <p className="call-to-action">Click to see more reviews!</p>
    </div>
  );
}

export default Review;
