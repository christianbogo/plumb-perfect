// src/pages/Home.tsx
import React, { useEffect, useRef } from "react";

import Hero from "../components/Hero";
import Review from "../components/Review";
import History from "../components/History";
import ServiceHighlight from "../components/ServiceHighlight";

// --- Configuration ---
// Use your actual Facebook App ID here
const FACEBOOK_APP_ID = "1339044877361334";
// Use the same valid SDK version as in index.html
const FACEBOOK_SDK_VERSION = "v19.0";

// --- ASSUMPTION ---
// SDK script is loaded via index.html as configured above.
// @types/facebook-js-sdk is installed (`npm install --save-dev @types/facebook-js-sdk`)

function Home() {
  // 1. Create a ref for the container element (typed for TypeScript)
  const embedContainerRef = useRef<HTMLDivElement>(null);

  // 2. Use useEffect to initialize SDK and parse embed after component mounts
  useEffect(() => {
    // Check if the global FB object is available (SDK script loaded)
    if (window.FB) {
      try {
        // Initialize the SDK explicitly BEFORE parsing
        console.log(
          `Calling FB.init with App ID: ${FACEBOOK_APP_ID} and Version: ${FACEBOOK_SDK_VERSION}`
        );
        window.FB.init({
          appId: FACEBOOK_APP_ID,
          xfbml: true, // Process XFBML tags on page load (good practice)
          version: FACEBOOK_SDK_VERSION,
        });
        console.log("FB.init called successfully.");

        // Now that init is called, parse the specific container for embeds
        if (embedContainerRef.current) {
          console.log(
            "Attempting to parse Facebook embed in:",
            embedContainerRef.current
          );
          window.FB.XFBML.parse(embedContainerRef.current);
        } else {
          console.log("Container ref not set when parse was attempted.");
        }
      } catch (error) {
        console.error("Error initializing or parsing Facebook SDK:", error);
      }
    } else {
      // This might log briefly if the effect runs before the async SDK fully executes
      console.log("Facebook SDK (window.FB) not available yet.");
    }

    // 3. Empty dependency array []: effect runs once after initial mount (or twice in StrictMode)
  }, []);

  return (
    <div className="page">
      <Hero />
      <History />
      <Review />
      <ServiceHighlight />
      {/* 4. Attach the ref to the container div */}
      <div className="facebook-embed-container" ref={embedContainerRef}>
        {/* The fb-post element that the SDK will find and replace */}
        <div
          className="fb-post"
          data-href="https://www.facebook.com/PlumbPerfectWenatchee/posts/pfbid0gNhkRDH6U858p8yYM1Sf7BL8w97PqT4wr5BbDjbcRvroffNJTc1SbM1xEgevCnWsl"
          data-width="550" // Define a max width for the embed
          data-adapt-container-width="true" // Allow shrinking below data-width
          data-show-text="true"
        >
          {/* Fallback content shown before/if embed fails */}
          <blockquote
            cite="https://www.facebook.com/PlumbPerfectWenatchee/posts/pfbid0gNhkRDH6U858p8yYM1Sf7BL8w97PqT4wr5BbDjbcRvroffNJTc1SbM1xEgevCnWsl"
            className="fb-xfbml-parse-ignore"
          >
            <p>Loading Facebook post...</p> {/* Simple loading/fallback text */}
          </blockquote>
        </div>
      </div>{" "}
      {/* End of facebook-embed-container */}
      <p className="call-to-action">Find us on Facebook and Instagram!</p>
      <div className="hero-text end">
        <p>
          "It's not done right, until it's done <strong>Plumb Perfect</strong>."
        </p>
      </div>
    </div>
  );
}
export default Home;
