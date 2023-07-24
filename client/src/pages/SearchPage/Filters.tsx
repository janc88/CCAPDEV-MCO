import React, { useState, useEffect } from "react";
import {
  Container,
  FiltersContainer,
  Header,
  Input,
  Label,
  RadioBox,
} from "./Filters.styled";
import { Button } from "../../styles/Button.styled";
import { useLocation } from "react-router-dom";

interface FilterOptionsProps {
  onChange: (stars: number) => void;
  onReset: () => void;
}

const Filters: React.FC<FilterOptionsProps> = ({ onChange, onReset }) => {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<number>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStars = parseInt(event.target.value, 10);
    onChange(selectedStars);
  };


  useEffect(() => {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio) => {
      const inputElement = radio as HTMLInputElement;
      inputElement.checked = false;
    });
  }, [location.pathname]);

  return (
    <>
      <Container>
        <Header>Star Filter</Header>
        <FiltersContainer>

          <Label>
            <Input
              type="radio"
              name="stars"
              value={1}
              isChecked={selectedOption === 1}
              onChange={handleInputChange}
            />
            <RadioBox></RadioBox>
            1 star
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value={2}
              isChecked={selectedOption === 2}
              onChange={handleInputChange}
            />
            <RadioBox></RadioBox>
            2 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value={3}
              isChecked={selectedOption === 3}
              onChange={handleInputChange}
            />
            <RadioBox></RadioBox>
            3 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value={4}
              isChecked={selectedOption === 4}
              onChange={handleInputChange}
            />
            <RadioBox></RadioBox>
            4 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value={5}
              isChecked={selectedOption === 5}
              onChange={handleInputChange}
            />
            <RadioBox></RadioBox>
            5 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value={-1}
              isChecked={selectedOption === -1}
              onChange={handleInputChange}
            />
            <RadioBox></RadioBox>
            All matches
          </Label>
        </FiltersContainer>
      </Container>
    </>
  );
};

export default Filters;
