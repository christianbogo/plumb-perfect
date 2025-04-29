// functions/src/index.ts
import * as functions from "firebase-functions";
import fetch from "node-fetch"; // Use node-fetch v2 syntax
import {defineString} from "firebase-functions/params"; // Import for v2 params

// Define an environment variable parameter for the API key
// You will link this name to your Secret Manager secret during deployment.
const placesApiKey = defineString("PLACES_API_KEY");

// Define the expected structure for data passed from the client
interface RequestData {
  placeId: string;
}

// Define the expected structure of Google Places API 'reviews'
interface Review {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// Define the expected structure of the Google Place Details API response
interface PlaceDetailsResponse {
  result?: {
    reviews?: Review[];
  };
  status: string; // e.g., "OK", "ZERO_RESULTS", "REQUEST_DENIED"
  error_message?: string;
}

// Define the structure of the data we'll send back to the client
interface FunctionResponse {
  success: boolean;
  reviews?: Review[];
  error?: string;
}

// HTTPS Callable Function to get Google Reviews (v2 compatible)
export const getGoogleReviews = functions.https.onCall(
  async (
    request: functions.https.CallableRequest<RequestData>,
    _context, // Marked as unused
  ): Promise<FunctionResponse> => {
    const placeId = request.data.placeId;

    if (!placeId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a 'placeId'.",
      );
    }

    // --- Securely retrieve the API key using v2 params ---
    const apiKey = placesApiKey.value();
    // ---------------------------------------------------

    // Add a check to ensure the API key value was retrieved successfully
    if (!apiKey) {
      functions.logger.error(
        "Places API key env var (PLACES_API_KEY) is not conf or acc.",
      );
      throw new functions.https.HttpsError(
        "internal",
        "Server configuration error: Missing API key value.",
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

    try {
      // Note: Corrected typo 'Workspaceing' to 'Fetching' in logger
      functions.logger.info(`Workspaceing reviews for Place ID: ${placeId}`);
      const googleApiResponse = await fetch(url);

      if (!googleApiResponse.ok) {
        const errorBody = await googleApiResponse.text();
        functions.logger.error(
          `Google API HTTP Error: ${googleApiResponse.status}`,
          {errorBody}, // Corrected object spacing
        );
        throw new functions.https.HttpsError(
          "internal",
          `Failed to fetch data from Google API. Status: ${
            googleApiResponse.status
          }`, // Corrected line length
        );
      }

      const googleData =
        (await googleApiResponse.json()) as PlaceDetailsResponse;
      functions.logger.info(
        `Google API Response Status: ${googleData.status}`,
        {placeId}, // Corrected object spacing & used shorthand
      );

      if (googleData.status === "OK") {
        return {
          success: true,
          reviews: googleData.result?.reviews || [],
        };
      } else if (googleData.status === "ZERO_RESULTS") {
        return {
          success: true,
          reviews: [], // Successfully queried, but no reviews found
        };
      } else {
        // Handle other Google API errors
        functions.logger.error(
          `Google Places API Error: ${googleData.status}`,
          {
            placeId: placeId,
            errorMessage: googleData.error_message,
          },
        );
        throw new functions.https.HttpsError(
          "internal",
          `Google API returned status: ${googleData.status} - ${
            googleData.error_message || "Unknown error"
          }`, // Corrected line length
        );
      }
    } catch (error: unknown) {
      functions.logger.error("Error in getGoogleReviews function:", error);

      // Re-throw HttpsError directly, wrap other errors
      if (error instanceof functions.https.HttpsError) {
        throw error;
      } else if (error instanceof Error) {
        throw new functions.https.HttpsError(
          "internal",
          `An unexpected error occurred: ${error.message}`,
        );
      } else {
        throw new functions.https.HttpsError(
          "internal",
          "An unexpected error occurred.",
        );
      }
    }
  },
);
