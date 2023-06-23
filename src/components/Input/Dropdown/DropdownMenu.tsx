import React, { useState } from "react";
import Dropdown from "./Dropdown";

const Menu: React.FC = (): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const options = () => {
    return ["Diner", "Cafe", "Fast Food", "Cafeteria", "Bistro", "Fine Dining", "Casual Dining"];
    // return [1,2,3,4,5];
    // return ["0-199", "200-499", "500-999", "1000+"];
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
   
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropdown(false);
    }
  };

  const optionsSelection = (option: string): void => {
    setSelectOption(option);
  };

  return (
    <>
      <button
        className={ showDropdown ? "active" : undefined }
        onClick={(): void => toggleDropdown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>{ selectOption ? selectOption : "Any" } </div>
        {showDropdown && (
          <Dropdown
            options={ options() }
            showDropdown={ false }
            toggleDropdown={ (): void => toggleDropdown() }
            optionSelection={ optionsSelection }
          />
        )}
      </button>
    </>
  );
};

export default Menu;
