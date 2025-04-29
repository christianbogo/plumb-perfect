import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { defineString } from "firebase-functions/params";

const placesApiKey = defineString("PLACES_API_KEY");

interface RequestData {
  placeId: string;
}

interface Review {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetailsResponse {
  result?: {
    reviews?: Review[];
  };
  status: string;
  error_message?: string;
}

interface FunctionResponse {
  success: boolean;
  reviews?: Review[];
  error?: string;
}

export const getGoogleReviews = functions.https.onCall(
  async (
    request: functions.https.CallableRequest<RequestData>,
    _context,
  ): Promise<FunctionResponse> => {
    const placeId = request.data.placeId;

    if (!placeId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a 'placeId'.",
      );
    }

    const apiKey = placesApiKey.value();

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
      functions.logger.info(`Workspaceing reviews for Place ID: ${placeId}`);
      const googleApiResponse = await fetch(url);

      if (!googleApiResponse.ok) {
        const errorBody = await googleApiResponse.text();
        functions.logger.error(
          `Google API HTTP Error: ${googleApiResponse.status}`,
          { errorBody },
        );
        throw new functions.https.HttpsError(
          "internal",
          `Failed to fetch data from Google API. Status: ${googleApiResponse.status}`,
        );
      }

      const googleData =
        (await googleApiResponse.json()) as PlaceDetailsResponse;
      functions.logger.info(
        `Google API Response Status: ${googleData.status}`,
        { placeId },
      );

      if (googleData.status === "OK") {
        return {
          success: true,
          reviews: googleData.result?.reviews || [],
        };
      } else if (googleData.status === "ZERO_RESULTS") {
        return {
          success: true,
          reviews: [],
        };
      } else {
        functions.logger.error(
          `Google Places API Error: ${googleData.status}`,
          {
            placeId: placeId,
            errorMessage: googleData.error_message,
          },
        );
        throw new functions.https.HttpsError(
          "internal",
          `Google API returned status: ${googleData.status} - ${googleData.error_message || "Unknown error"}`,
        );
      }
    } catch (error: unknown) {
      functions.logger.error("Error in getGoogleReviews function:", error);

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
