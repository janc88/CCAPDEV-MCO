import React from "react";
import SearchSection from "./SearchSection";
import RestoCarousel from "./RestoCarousel";
import Footer from "../../components/Footer/Footer";
import { restoList } from "../../data/data";

function HomePage() {
  const featuredRestos = restoList.slice(0, 5).map(resto => resto.details);

  return (
    <>
      <SearchSection />
      <RestoCarousel restoList={featuredRestos} />
      <Footer />
    </>
  );
}

export default HomePage;
