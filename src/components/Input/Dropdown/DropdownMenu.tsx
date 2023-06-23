import React, { useState } from "react";
import Dropdown from "./Dropdown";

type DropdownType = "restaurant" | "price" | "stars";

const Menu: React.FC<{ dropdownType: DropdownType }> = ({ dropdownType }): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropdown(false);
    }
  };

  const getOptions = (): string[] => {
    if (dropdownType === "restaurant") {
      return ["Diner", "Cafe", "Fast Food", "Cafeteria", "Bistro", "Fine Dining", "Casual Dining"];
    } else if (dropdownType === "price") {
      return ["0-199", "200-499", "500-999", "1000+"];
    } else if (dropdownType === "stars") {
      return ["1", "2", "3", "4", "5"];
    } else {
      return [];
    }
  };

  const optionSelection = (option: string): void => {
    setSelectedOption(option);
  };

  return (
    <>
      <button
        className={showDropdown ? "active" : undefined}
        onClick={(): void => toggleDropdown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
      >
        <div>{selectedOption ? selectedOption : "Any"}</div>
        {showDropdown && (
          <Dropdown
            label={dropdownType === "restaurant" ? "Restaurant Type" : dropdownType === "price" ? "Price Range" : "Stars"}
            options={getOptions()}
            showDropdown={false}
            toggleDropdown={(): void => toggleDropdown()}
            optionSelection={optionSelection}
          />
        )}
      </button>
    </>
  );
};

export default Menu;