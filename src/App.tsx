import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ContactStripe from "./components/ContactStripe";
import NavigationBar from "./components/NavigationBar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Service from "./components/Service";

import ContactFooter from "./components/ContactFooter";

function App() {
  return (
    <Router>
      <ContactStripe />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/service/:serviceUrl" element={<Service />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ContactFooter />
    </Router>
  );
}

export default App;
