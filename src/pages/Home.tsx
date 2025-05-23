import React, { useEffect, useRef, useState, useCallback } from "react";
import Hero from "../components/Hero";
import Review from "../components/Review";
import History from "../components/History";
import ServiceHighlight from "../components/ServiceHighlight";

const FACEBOOK_APP_ID = "1339044877361334";
const FACEBOOK_SDK_VERSION = "v19.0";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/PlumbPerfectWenatchee";

// Debounce utility function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
        resolve(func(...args));
      }, waitFor);
    });
}

function Home() {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [fbWidth, setFbWidth] = useState(
    typeof window !== "undefined"
      ? Math.min(500, window.innerWidth < 549 ? window.innerWidth - 50 : 500)
      : 500
  );
  const [fbHeight, setFbHeight] = useState(
    typeof window !== "undefined"
      ? Math.min(700, window.innerHeight > 400 ? window.innerHeight - 150 : 500)
      : 700
  );

  const parseTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isFbInitializedRef = useRef(false);

  // Effect for initializing Facebook SDK (runs once)
  useEffect(() => {
    if (isFbInitializedRef.current) return;

    const initializeFbSdk = () => {
      if (window.FB) {
        try {
          console.log("[FB] Initializing Facebook SDK...");
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            xfbml: true,
            version: FACEBOOK_SDK_VERSION,
          });
          console.log("[FB] Facebook SDK Initialized.");
          isFbInitializedRef.current = true;
          if (embedContainerRef.current) {
            if (parseTimeoutIdRef.current)
              clearTimeout(parseTimeoutIdRef.current);
            parseTimeoutIdRef.current = setTimeout(() => {
              if (window.FB && window.FB.XFBML && embedContainerRef.current) {
                console.log("[FB] Initial parse after SDK init.");
                window.FB.XFBML.parse(embedContainerRef.current);
              }
            }, 250);
          }
        } catch (error) {
          console.error("[FB] Error initializing Facebook SDK:", error);
        }
      } else {
        console.warn("[FB] Facebook SDK (window.FB) not found for init.");
      }
    };

    if (window.FB) {
      initializeFbSdk();
    } else {
      console.log("[FB] SDK not available. Setting up fbAsyncInit for init.");
      const existingFbAsyncInit = window.fbAsyncInit;
      window.fbAsyncInit = function () {
        if (typeof existingFbAsyncInit === "function") {
          existingFbAsyncInit();
        }
        initializeFbSdk();
      };
    }
    return () => {
      if (parseTimeoutIdRef.current) {
        clearTimeout(parseTimeoutIdRef.current);
      }
    };
  }, []);

  // Debounced resize handler with threshold for height change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleResize = useCallback(
    debounce(() => {
      console.log("[FB Resize] Debounced resize triggered.");

      // Update width (you could add a threshold here too if needed)
      const newCalculatedWidth = Math.min(
        500,
        window.innerWidth < 549 ? window.innerWidth - 50 : 500
      );
      setFbWidth(newCalculatedWidth);

      // Calculate the new potential height
      const newPotentialHeight = Math.min(
        700,
        window.innerHeight > 400 ? window.innerHeight - 150 : 500
      );

      // Update fbHeight only if the change is significant (e.g., > 100px)
      setFbHeight((currentHeight) => {
        if (Math.abs(currentHeight - newPotentialHeight) > 100) {
          console.log(
            `[FB Resize] Significant height change. Old: ${currentHeight}, New: ${newPotentialHeight}. Updating fbHeight.`
          );
          return newPotentialHeight;
        }
        // If change is not > 100px, return the current height to prevent state update and re-render
        console.log(
          `[FB Resize] Minor height change. Old: ${currentHeight}, New: ${newPotentialHeight}. Not updating fbHeight.`
        );
        return currentHeight;
      });
    }, 300), // Debounce by 300ms
    [] // No dependencies needed as we read window properties directly and use functional state update
  );

  // Effect for setting up and tearing down the resize listener
  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);
    debouncedHandleResize(); // Initial call

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      if (parseTimeoutIdRef.current) {
        clearTimeout(parseTimeoutIdRef.current);
      }
    };
  }, [debouncedHandleResize]);

  // Effect for re-parsing the Facebook plugin when dimensions change (debounced)
  useEffect(() => {
    if (
      isFbInitializedRef.current &&
      window.FB &&
      window.FB.XFBML &&
      embedContainerRef.current
    ) {
      if (parseTimeoutIdRef.current) {
        clearTimeout(parseTimeoutIdRef.current);
      }
      parseTimeoutIdRef.current = setTimeout(() => {
        if (embedContainerRef.current && window.FB && window.FB.XFBML) {
          console.log("[FB] Re-parsing XFBML due to dimension change:", {
            fbWidth,
            fbHeight,
          });
          window.FB.XFBML.parse(embedContainerRef.current);
        }
      }, 250);
    }

    return () => {
      if (parseTimeoutIdRef.current) {
        clearTimeout(parseTimeoutIdRef.current);
      }
    };
  }, [fbWidth, fbHeight]);

  return (
    <div className="page">
      <Hero />
      <History />
      <Review />
      <ServiceHighlight />
      <div
        className="facebook-embed-container"
        ref={embedContainerRef}
        style={{ cursor: "pointer" }}
        onClick={() => window.open(FACEBOOK_PAGE_URL, "_blank")}
        tabIndex={0}
        role="button"
        aria-label="Open Plumb Perfect Wenatchee Facebook page"
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.open(FACEBOOK_PAGE_URL, "_blank");
          }
        }}
      >
        <div
          className="fb-page"
          data-href={FACEBOOK_PAGE_URL}
          data-tabs="timeline"
          data-width={fbWidth}
          data-height={fbHeight}
          data-adapt-container-width="false"
          data-small-header="true"
          data-hide-cover="true"
          data-show-facepile="false"
          data-lazy="true"
        >
          <blockquote
            cite={FACEBOOK_PAGE_URL}
            className="fb-xfbml-parse-ignore"
          >
            <a href={FACEBOOK_PAGE_URL}>Plumb Perfect Wenatchee</a>
          </blockquote>
        </div>
      </div>
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
