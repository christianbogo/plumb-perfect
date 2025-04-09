import "../styles/contact-footer.css";
import { useNavigate } from "react-router-dom";

function ContactFooter() {
  const navigate = useNavigate();

  return (
    <footer>
      <div
        className="footer-information"
        onClick={() => navigate("/about")}
        style={{ cursor: "pointer" }}
      >
        <div className="section serving-area">
          <h2>Serving Area</h2>
          <p>Chelan County</p>
          <p>Douglas County</p>
          <p>Okanogan County</p>
          <p>Grant County</p>
        </div>
        <div className="section business-hours">
          <h2>Our Hours</h2>
          <h3>Plumbing Services</h3>
          <p>M-F: 8AM - 4PM</p>
          <h3>Emergency Services</h3>
          <p>M-F: 4PM - 8AM</p>
          <p>Weekends & Holidays</p>
        </div>
      </div>
      <div className="contact-footer-credit">
        <p>
          Site Managed by{" "}
          <a
            href="https://gravatar.com/christianbcutter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Christian Cutter
          </a>
        </p>
      </div>
    </footer>
  );
}
export default ContactFooter;
