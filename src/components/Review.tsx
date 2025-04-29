// src/components/Review.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Import the function caller and type definition. Rename type to avoid naming conflict.
import {
  callGetGoogleReviews,
  Review as ReviewData,
} from "../firebase/firebase"; // Adjust path if needed
import "../styles/review.css"; // Ensure this CSS file exists

const REVIEW_CYCLE_INTERVAL_MS = 8000; // 8 seconds
const FADE_TRANSITION_MS = 500; // 0.5 seconds (must match CSS transition duration)

function Review() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false); // To control fade CSS class
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store interval ID for cleanup

  // --- Configuration ---
  // !! Replace with your actual Place ID !!
  const placeId = "ChIJ75f7XrvMm1QR7DVdfw7zCnU"; // <-- Replace with Plumb Perfect's Place ID
  // ---------------------

  // 1. Effect to Fetch Reviews
  useEffect(() => {
    // Basic validation
    if (!placeId) {
      setError("Review component needs a valid Place ID.");
      setIsLoading(false);
      console.warn("Place ID is not configured in Review component.");
      return;
    }

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch
      try {
        console.log(
          `Review: Calling Firebase Function 'getGoogleReviews' for placeId: ${placeId}`
        );
        const result = await callGetGoogleReviews({ placeId });
        console.log("Review: Firebase Function response:", result.data);

        if (result.data.success && result.data.reviews) {
          // Filter for reviews that actually have text content
          const validReviews = result.data.reviews.filter(
            (r) => r.text && r.text.trim() !== ""
          );
          if (validReviews.length > 0) {
            setReviews(validReviews);
            setCurrentIndex(0); // Start from the first review
          } else {
            setReviews([]);
            // Don't set an error, just indicate no reviews found
            console.log("No reviews with text content found.");
          }
        } else {
          // Handle errors reported by the cloud function
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
        setReviews([]); // Clear reviews on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]); // Dependency array ensures fetch runs only if placeId changes

  // 2. Effect to Cycle Through Reviews with Fade
  useEffect(() => {
    // Clear previous interval if reviews update or component unmounts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only cycle if we have more than one review and are not loading/in error state
    if (reviews.length > 1 && !isLoading && !error) {
      intervalRef.current = setInterval(() => {
        setIsFading(true); // Trigger fade-out

        // Wait for the fade-out transition to finish
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Move to next review (looping)
          setIsFading(false); // Trigger fade-in
        }, FADE_TRANSITION_MS);
      }, REVIEW_CYCLE_INTERVAL_MS);
    }

    // Cleanup function: clear interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reviews, isLoading, error]); // Re-run this effect if reviews, loading, or error changes

  // 3. Click Handler for Navigation
  const handleNavigate = () => {
    navigate("/about");
  };

  // --- Render Logic ---

  if (isLoading) {
    // Maintain layout space while loading, or show simple text
    return (
      <div className="review-container-placeholder">Loading Reviews...</div>
    );
  }

  if (error) {
    // Show error message if fetching failed
    return (
      <div className="review-container-placeholder" style={{ color: "red" }}>
        Error: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    // Handle case where fetch succeeded but no reviews were found/valid
    return (
      <div className="review-container-placeholder">
        No customer reviews available at the moment.
      </div>
    );
  }

  // Get the currently active review
  const currentReview = reviews[currentIndex];

  return (
    <div
      className="review-container"
      onClick={handleNavigate} // Make the whole container clickable
      title="Click to see more reviews" // Accessibility and usability hint
      style={{ cursor: "pointer" }} // Visual cue for clickability
    >
      {/* Wrapper div for the content that needs to fade */}
      <div className={`review-content ${isFading ? "fading" : ""}`}>
        <p className="review-text">"{currentReview.text}"</p>
        <p className="review-author">- {currentReview.author_name}</p>
      </div>
      <p className="call-to-action">Click to see more reviews!</p>
    </div>
  );
}

export default Review;
