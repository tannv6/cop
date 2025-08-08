import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import MainVisual from "../components/sections/MainVisual";
import ServiceSection from "../components/sections/ServiceSection";
import FeatureSection from "../components/sections/FeatureSection";
import PartnerSection from "../components/sections/PartnerSection";
import PriceSection from "../components/sections/PriceSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

import "../lib_css/jquery-ui.css";
import "../lib_css/slick.css";
import "../lib_css/swiper.min.css";
import "../styles/style.css";

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      console.log("🔍 hash detected:", id);

      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(id);
          console.log("📌 target element:", el);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            console.warn("❌ Element not found:", id);
          }
        }, 100);
      });
    }
  }, [location]);

  return (
    <div id="wrap">
      <Header />
      <div className="main">
        <MainVisual />
        <div className="sub">
          <ServiceSection />
          <FeatureSection />
          <PartnerSection />
          <PriceSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
