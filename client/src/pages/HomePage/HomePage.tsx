import React, {useState, useEffect} from "react";
import SearchSection from "./SearchSection";
import RestoCarousel from "./RestoCarousel";
import Footer from "../../components/Footer/Footer";
import { restoList } from "../../data/data";

function HomePage() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  const getFeaturedRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/restaurants/featured');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const data = await getFeaturedRestaurants();
      setFeaturedRestaurants(data);
    } catch (error) {
      console.error('Error fetching featured restaurants:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);


  

  return (
    <>
      <SearchSection />
      <RestoCarousel restoList={featuredRestaurants} />
      <Footer />
    </>
  );
}

export default HomePage;
