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
  const featuredRestos = restoList.slice(0, 5).map(resto => resto.details);
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/restaurant');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      } else {
        console.error('Error fetching restaurants:', response.status);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };



  useEffect(() => {
    fetchRestaurants();
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
              {featuredRestos.map(resto =>
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
