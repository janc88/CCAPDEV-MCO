import React, { startTransition, useEffect, useState } from "react";
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
  const [starFilter, setStarFilter] = useState<number>(-1);

  const handleFilterChange = (selectedStars: number) => {
    setStarFilter(selectedStars);
  };

  const handleReset = () => {
    setStarFilter(-1);
  }

  const findMatches = (query, items, starFilter) => {
    const lowerCaseQuery = query.toLowerCase();

    if (query === "all" && starFilter === -1) {
      return items;
    }

    if (query === "all" && starFilter !== -1) {
      return items.filter((item) => {
        return Math.floor(item.averageRating) === parseInt(starFilter, 10);
      });
    }

    if (!query || !items || !Array.isArray(items)) {
      return "none";
    }

    return items.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(lowerCaseQuery);
      const starMatch =
        Math.floor(item.averageRating) == parseInt(starFilter, 10);

      return nameMatch && starMatch;
    });
  };

  useEffect(() => {
    fetchFeaturedRestaurants().then((restos) => {
      setFeaturedRestaurants(restos);
      setSearchMatches(findMatches(query, featuredRestaurants, starFilter));
    });
  }, [
    featuredRestaurants,
    fetchFeaturedRestaurants,
    query,
    searchMatches,
    starFilter,
  ]);

  return (
    <>
      <SearchPageContainer>
        <SearchResultsBar />
        <Divider />

        <MainContainer>
          <LeftContainer>
            <Filters onChange={handleFilterChange} onReset={handleReset}/>
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
