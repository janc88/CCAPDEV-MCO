import React from "react";
import Footer from "../../components/Footer/Footer";
import { restoList } from "../../data/data";

import { SearchPageContainer, Divider, MainContainer } from "./SearchPage.styled";
import SearchResultsBar from "./SearchResultsBar";
import Filters from "./Filters";
import {
  LeftContainer,
  RightContainer,
} from "./SearchPage.styled";


function SearchPage() {
  const featuredRestos = restoList.slice(0, 5).map(resto => resto.details);

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
            asdasd
          </RightContainer>
        </MainContainer>
        
      </SearchPageContainer>
      <Footer />
    </>
  );
}

export default SearchPage;
