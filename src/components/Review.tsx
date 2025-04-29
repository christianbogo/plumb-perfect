// src/components/Review.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // <-- Re-added
// Import the function caller and type definition.
import {
  callGetGoogleReviews,
  Review as ReviewData,
} from "../firebase/firebase"; // Adjust path if needed
import "../styles/review.css"; // Ensure this CSS file exists

// Re-add constants for timing
const REVIEW_CYCLE_INTERVAL_MS = 8000; // 8 seconds
const FADE_TRANSITION_MS = 500; // 0.5 seconds (must match CSS transition duration)

function Review() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  // We still need currentIndex to know *which* random review is showing
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false); // <-- Re-added fade state
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // <-- Re-added
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // <-- Re-added interval ref

  // --- Configuration ---
  const placeId = "ChIJ75f7XrvMm1QR7DVdfw7zCnU";
  // ---------------------

  // 1. Effect to Fetch Reviews (Select initial random review)
  useEffect(() => {
    if (!placeId) {
      setError("Review component needs a valid Place ID.");
      setIsLoading(false);
      console.warn("Place ID is not configured in Review component.");
      return;
    }

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(
          `Review: Calling Firebase Function 'getGoogleReviews' for placeId: ${placeId}`
        );
        const result = await callGetGoogleReviews({ placeId });
        console.log("Review: Firebase Function response:", result.data);

        if (result.data.success && result.data.reviews) {
          const validReviews = result.data.reviews.filter(
            (r) => r.text && r.text.trim() !== ""
          );
          if (validReviews.length > 0) {
            setReviews(validReviews);
            // --- Modification: Set initial index randomly ---
            const randomIndex = Math.floor(Math.random() * validReviews.length);
            setCurrentIndex(randomIndex);
            // -------------------------------------------------
          } else {
            setReviews([]);
            console.log("No reviews with text content found.");
          }
        } else {
          throw new Error(
            result.data.error || "Function call failed to retrieve reviews."
          );
        }
      } catch (err: any) {
        console.error(
          "Review: Failed to fetch reviews via Firebase Function:",
          err
        );
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

  // 2. Effect to Cycle Through Reviews Randomly with Fade
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only cycle if we have more than one review and not loading/error
    if (reviews.length > 1 && !isLoading && !error) {
      intervalRef.current = setInterval(() => {
        setIsFading(true); // Start fade-out

        setTimeout(() => {
          // --- Modification: Pick a new random index ---
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * reviews.length);
          } while (nextIndex === currentIndex); // Ensure it's different from the current one
          setCurrentIndex(nextIndex);
          // ---------------------------------------------
          setIsFading(false); // Start fade-in
        }, FADE_TRANSITION_MS);
      }, REVIEW_CYCLE_INTERVAL_MS);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // Depend on currentIndex as well, so the check inside interval runs with latest value
  }, [reviews, isLoading, error, currentIndex]);

  // 3. Click Handler for Navigation (Re-added)
  const handleNavigate = () => {
    navigate("/about");
  };

  // --- Render Logic ---

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

  // Get the currently active random review
  // Handle potential edge case where reviews array might be briefly empty during state transition
  const currentReview = reviews[currentIndex] || null;

  // Avoid rendering if currentReview is somehow null temporarily
  if (!currentReview) {
    return (
      <div className="review-container-placeholder">Loading Review...</div>
    ); // Or some placeholder
  }

  return (
    // Re-added onClick, title, style cursor
    <div
      className="review-container"
      onClick={handleNavigate}
      title="Click to see more reviews"
      style={{ cursor: "pointer" }}
    >
      {/* Wrapper div for the content that needs to fade */}
      {/* Ensure CSS handles the fade based on this class */}
      <div className={`review-content ${isFading ? "fading" : ""}`}>
        <p className="review-text">"{currentReview.text}"</p>
        <p className="review-author">- {currentReview.author_name}</p>
      </div>
      {/* Re-added call-to-action */}
      <p className="call-to-action">Click to see more reviews!</p>
    </div>
  );
}

export default Review;
