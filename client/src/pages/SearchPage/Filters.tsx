import React from "react";
import Menu from "../../components/Input/Dropdown/DropdownMenu";
import {
    Header,
    RestoReviewsContainer,
  } from "../../components/ReviewsCard/ReviewsCard.styled";
import {
  Option,
  OptionsContainer,
} from "./Filters.styled";
import { Button } from "../../styles/Button.styled";
import { useNavigate } from "react-router-dom";

function Filters() {
  const navigate = useNavigate();
  
  return (
    <>
      <RestoReviewsContainer>
        <Header>Filters</Header>
          <OptionsContainer>
            <Option>Restaurant Type</Option>
            <Menu dropdownType="restaurant"/>
            <Option>Stars</Option>
            <Menu dropdownType="stars"/>
            <Option>Price Range (₱)</Option>
            <Menu dropdownType="price"/>
            <br/><br/>
            <Button
              bgcolor="#FF794F"
              tcolor="white"
              onClick={() => navigate("/restaurants")}
            >
              Search
            </Button>
          </OptionsContainer>
      </RestoReviewsContainer>
    </>
  );
}

export default Filters;