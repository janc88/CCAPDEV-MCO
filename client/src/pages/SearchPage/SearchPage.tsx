import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";

import {
  SearchPageContainer,
  Divider,
  MainContainer,
  GridContainer,
  EndDivider,
  EndText,
} from "./SearchPage.styled";
import SearchResultsBar from "./SearchResultsBar";
import Filters from "./Filters";
import { LeftContainer, RightContainer } from "./SearchPage.styled";
import RestoCard from "../../components/RestoCard/RestoCard";
import { Restaurant, useRestaurants } from "../../contexts/RestoHook";
import { useParams } from "react-router-dom";

function SearchPage() {
  const { query } = useParams<{ query: string }>();
  const { fetchFeaturedRestaurants } = useRestaurants();
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>(
    []
  );
  const [searchMatches, setSearchMatches] = useState<Restaurant[]>([]);

  const findMatches = (query, items) => {
    if (query === "all") return items;

    if (!query || !items || !Array.isArray(items)) {
      return "none";
    }
    const lowerCaseQuery = query.toLowerCase();
    return items.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseQuery)
    );
  };

  useEffect(() => {
    fetchFeaturedRestaurants().then((restos) => {
      setFeaturedRestaurants(restos);
      setSearchMatches(findMatches(query, featuredRestaurants));
    });
  }, [fetchFeaturedRestaurants, searchMatches]);

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
              {searchMatches.map((resto) => (
                <RestoCard key={resto.id} {...resto} />
              ))}
            </GridContainer>
          </RightContainer>
        </MainContainer>
        <EndText>End of Search Results</EndText>
        <EndDivider />
      </SearchPageContainer>
      <Footer />
    </>
  );
}

export default SearchPage;
