import Hero from "../components/Hero";
import Review from "../components/Review";
import History from "../components/History";
import ServiceHighlight from "../components/ServiceHighlight";

function Home() {
  return (
    <div className="page">
      <Hero />
      <History />
      <Review />
      <ServiceHighlight />
      <div className="hero-text end">
        <p>
          "It's not done right, until it's done <strong>Plumb Perfect</strong>."
        </p>
      </div>
    </div>
  );
}
export default Home;
