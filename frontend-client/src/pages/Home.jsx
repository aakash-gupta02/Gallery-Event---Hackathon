import React from "react";
import Navbar from "../components/Navbar";
import RecentGallery from "../components/RecentGallery";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroPage from "../components/HeroPage";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroPage />
      <FeaturesSection />
      <RecentGallery />
      <Footer />
    </div>
  );
};

export default Home;
