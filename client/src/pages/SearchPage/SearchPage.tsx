import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";

import { SearchPageContainer, Divider, MainContainer, GridContainer, EndDivider, EndText } from "./SearchPage.styled";
import SearchResultsBar from "./SearchResultsBar";
import Filters from "./Filters";
import {
  LeftContainer,
  RightContainer,
} from "./SearchPage.styled";
import RestoCard from "../../components/RestoCard/RestoCard";
import { 
	Restaurant,
	useRestaurants
} from "../../contexts/RestoHook";


function SearchPage() {
	const { fetchFeaturedRestaurants } = useRestaurants();
	const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
	useEffect(() => {
		fetchFeaturedRestaurants().then((restos) => {
			setFeaturedRestaurants(restos)
		});
	}, [fetchFeaturedRestaurants]);

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
