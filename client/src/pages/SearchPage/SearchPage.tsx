import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { restoList } from "../../data/data";

import { SearchPageContainer, Divider, MainContainer, GridContainer, EndDivider, EndText } from "./SearchPage.styled";
import SearchResultsBar from "./SearchResultsBar";
import Filters from "./Filters";
import {
  LeftContainer,
  RightContainer,
} from "./SearchPage.styled";
import RestoCard from "../../components/RestoCard/RestoCard";


function SearchPage() {
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
      <SearchPageContainer>
        <SearchResultsBar />
        <Divider />

        <MainContainer>
          <LeftContainer>
            <Filters />
          </LeftContainer>

          <RightContainer>
            <GridContainer>
              {featuredRestaurants.map(resto =>
                <RestoCard {...resto} />
              )}
            </GridContainer>
          </RightContainer>
        </MainContainer>
        <EndText>
			      End of Search Results
		    </EndText>
		    <EndDivider/>
      </SearchPageContainer>
      <Footer />
    </>
  );
}

export default SearchPage;
