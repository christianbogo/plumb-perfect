import "../styles/about.css";

const About = () => {
  return (
    <div className="about-container page">
      <div className="about-content">
        <h2>About Plumb Perfect</h2>
        <p>
          At Plumb Perfect, we are dedicated to providing reliable and
          high-quality plumbing services. With a commitment to excellence, our
          skilled team handles everything from routine maintenance to urgent
          repairs, ensuring your plumbing systems function flawlessly.
        </p>
        <p>
          We understand that plumbing issues can arise at any time, which is why
          we offer comprehensive emergency services outside of our standard
          business hours, including weekends and holidays. Your peace of mind is
          our priority, and we are always ready to respond when you need us
          most.
        </p>
        <p>
          Plumb Perfect is more than just a service provider; we are your
          trusted partner in maintaining a safe and efficient home or business.
          We pride ourselves on our professionalism, attention to detail, and
          commitment to customer satisfaction. Let us take care of your plumbing
          needs with precision and expertise.
        </p>
      </div>
      <div className="contact-info">
        <div className="hours">
          <h3>Plumbing Services</h3>
          <p>Monday - Friday: 8 AM - 4 PM</p>
          <h3>Emergency Services</h3>
          <p>Monday - Friday: 4 PM - 8 AM</p>
          <p>Weekends & Holidays</p>
        </div>
        <div className="contact-details">
          <div className="phone">
            <img src="../assets/phone.svg" alt="Phone Icon" className="icon" />
            <p>(509) 663-3602</p>
          </div>
          <div
            className="facebook"
            onClick={() =>
              window.open(
                "https://www.facebook.com/PlumbPerfectWenatchee/",
                "_blank"
              )
            }
          >
            <img
              src="../assets/facebook.svg"
              alt="Facebook Icon"
              className="icon"
            />
            <p>PlumbPerfect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
