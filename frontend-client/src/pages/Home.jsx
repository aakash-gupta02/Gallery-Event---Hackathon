import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import RecentGallery from "../components/RecentGallery";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroPage from "../components/HeroPage";

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar
        onNavClick={{
          hero: () => scrollTo(heroRef),
          features: () => scrollTo(featuresRef),
          gallery: () => scrollTo(galleryRef),
          footer: () => scrollTo(footerRef),
        }}
      />

      <div ref={heroRef}>
        <HeroPage />
      </div>

      <div ref={featuresRef}>
        <FeaturesSection />
      </div>

      <div ref={galleryRef}>
        <RecentGallery />
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
