import mattJPEG from "../assets/pics/matt.jpeg";

import "../styles/history.css";

function History() {
  return (
    <div className="history-quote">
      <img
        src={mattJPEG}
        alt="Matt and Darcy Bruggman"
        className="history-quote-image"
      />
      <div className="history-quote-text">
        <h2>Our Founding Story</h2>
        <p>
          "Matt Bruggman and his wife Darcy started the company in 1998.
          Building the business upon their bedrock values of honesty, hard work,
          and relationships, they set out to serve the Wenatchee Valley with the
          best service at the best prices. Since that very first day, they never
          looked back. They never stopped trying to improve the experience of
          every customer. They know no strangers, only friends."
        </p>
      </div>
    </div>
  );
}

export default History;
