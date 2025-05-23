import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import Review from "../components/Review";
import History from "../components/History";
import ServiceHighlight from "../components/ServiceHighlight";

const FACEBOOK_APP_ID = "1339044877361334";
const FACEBOOK_SDK_VERSION = "v19.0";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/PlumbPerfectWenatchee";

function Home() {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [fbWidth, setFbWidth] = useState(
    typeof window !== "undefined"
      ? Math.min(500, window.innerWidth < 549 ? window.innerWidth - 50 : 500)
      : 500
  );

  useEffect(() => {
    function handleResize() {
      setFbWidth(
        Math.min(500, window.innerWidth < 549 ? window.innerWidth - 50 : 500)
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.FB) {
      try {
        window.FB.init({
          appId: FACEBOOK_APP_ID,
          xfbml: true,
          version: FACEBOOK_SDK_VERSION,
        });
        if (embedContainerRef.current) {
          window.FB.XFBML.parse(embedContainerRef.current);
        }
      } catch (error) {
        console.error("Error initializing or parsing Facebook SDK:", error);
      }
    } else {
      console.warn(
        "Facebook SDK (window.FB) not found. Ensure it is loaded before this component."
      );
    }
  }, [fbWidth]); // re-parse when width changes

  return (
    <div className="page">
      <Hero />
      <History />
      <Review />
      <ServiceHighlight />
      <div className="facebook-embed-container" ref={embedContainerRef}>
        <div
          className="fb-page"
          data-href={FACEBOOK_PAGE_URL}
          data-tabs="timeline"
          data-width={fbWidth}
          data-height="700"
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
