import React, { useState } from "react";
import Menu from "../../components/Input/Dropdown/DropdownMenu";
import {
  Container,
  FiltersContainer,
  Header,
  Input,
  Label,
} from "./Filters.styled";
import { Button } from "../../styles/Button.styled";

interface FilterOptionsProps {
  onChange: (stars: number) => void;
  onReset: () => void
}

const Filters: React.FC<FilterOptionsProps> = ({ onChange, onReset }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStars = parseInt(event.target.value, 10);
    onChange(selectedStars);
  };

  const handleReset = () => {
    setSelectedOption(null);
    onReset();
  }

  return (
    <>
      <Container>
        <Header>Star Filter</Header>
        <FiltersContainer>
          <Label>
            <Input
              type="radio"
              name="stars"
              value="1"
              checked={selectedOption === "1"}
              onChange={handleInputChange}
            />
            1 star
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value="2"
              checked={selectedOption === "2"}
              onChange={handleInputChange}
            />
            2 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value="3"
              checked={selectedOption === "3"}
              onChange={handleInputChange}
            />
            3 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value="4"
              checked={selectedOption === "4"}
              onChange={handleInputChange}
            />
            4 stars
          </Label>
          <Label>
            <Input
              type="radio"
              name="stars"
              value="5"
              checked={selectedOption === "5"}
              onChange={handleInputChange}
            />
            5 stars
          </Label>
        </FiltersContainer>

        <Button tcolor="white" bgcolor="#FF794F" style={{ width: "80%" }} onClick={handleReset}>
          Reset
        </Button>
      </Container>
    </>
  );
};

export default Filters;
