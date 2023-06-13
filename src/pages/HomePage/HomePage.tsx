import React from "react";
import SearchSection from "./SearchSection";
import RestoCarousel from "./RestoCarousel";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const featuredRestos = [
    {
      name: "Mcdonald's",
      rating: 5,
      numrating: 178,
      ratings: [1, 2, 3, 4],
      desc: "the best",
      address: "123 taft",
      coverImg: { id: 1, src: "food-bg-light.jpeg", alt: "Image 1" },
    },
    {
      name: "Mcdonald's",
      rating: 5,
      numrating: 178,
      ratings: [1, 2, 3, 4],
      desc: "the best",
      address: "123 taft",
      coverImg: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
    },
    {
      name: "Mcdonald's",
      rating: 5,
      numrating: 178,
      ratings: [1, 2, 3, 4],
      desc: "the best",
      address: "123 taft",
      coverImg: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
    },
    {
      name: "Mcdonald's",
      rating: 5,
      numrating: 178,
      ratings: [1, 2, 3, 4],
      desc: "the best",
      address: "123 taft",
      coverImg: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
    },
    {
      name: "Mcdonald's",
      rating: 5,
      numrating: 178,
      ratings: [1, 2, 3, 4],
      desc: "the best",
      address: "123 taft",
      coverImg: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
    },
    {
      name: "Mcdonald's",
      rating: 5,
      numrating: 178,
      ratings: [1, 2, 3, 4],
      desc: "the best",
      address: "123 taft",
      coverImg: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
    },
  ];

  return (
    <>
      <SearchSection />
      <RestoCarousel restoList={featuredRestos} />
      <Footer />
    </>
  );
}

export default HomePage;
