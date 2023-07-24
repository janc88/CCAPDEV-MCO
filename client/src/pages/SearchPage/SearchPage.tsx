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
import { useParams, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function SearchPage() {
  const location = useLocation();
  const { query } = useParams<{ query: string }>();
  const { fetchFeaturedRestaurants } = useRestaurants();
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>(
    []
  );
  const [searchMatches, setSearchMatches] = useState<Restaurant[]>([]);
  const [starFilter, setStarFilter] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (selectedStars: number) => {
    setStarFilter(selectedStars);
  };

  const handleReset = () => {
    setStarFilter(-1);
  };

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
    console.log(query, starFilter);
    if (query !== "all" && starFilter === -1) {
      return items.filter((item) => {
        return item.name.toLowerCase().includes(lowerCaseQuery);
      });
    }

    if (!query || !items || !Array.isArray(items)) {
      return [];
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
      setLoading(false);
    });
  }, [featuredRestaurants]);

  useEffect(() => {
    setSearchMatches(findMatches(query, featuredRestaurants, starFilter));
  }, [query, featuredRestaurants, starFilter]);

  useEffect(() => {
    setStarFilter(-1);
  }, [location.pathname]);

  return (
    <>
      <SearchPageContainer>
        <SearchResultsBar />
        <Divider />

        <MainContainer>
          <LeftContainer>
            <Filters onChange={handleFilterChange} onReset={handleReset} />
          </LeftContainer>

          <RightContainer>
            {loading ? (
              <LoadingComponent />
            ) : searchMatches.length > 0 ? (
              <GridContainer
                layout
        
              >
                <AnimatePresence>
                {searchMatches.map((resto) => (
                  <RestoCard key={resto.id} {...resto} />
                ))}
                </AnimatePresence>
              </GridContainer>
            ) : (
              <NotFoundComponent />
            )}
          </RightContainer>
        </MainContainer>
        <EndText>End of Search Results</EndText>
        <EndDivider />
      </SearchPageContainer>
      <Footer />
    </>
  );
}

const NotFoundComponent = () => {
  return (
    <h2 style={{ marginLeft: "6rem", fontWeight: "150" }}>
      Sorry, we could't find any restaurants that match your search/filter.
    </h2>
  );
};

const LoadingComponent = () => {
  return <h2 style={{ marginLeft: "6rem", fontWeight: "150" }}>Loading...</h2>;
};

export default SearchPage;
