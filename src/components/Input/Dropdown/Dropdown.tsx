import React, { useEffect, useState } from "react";
import "./Dropdown.styled.css";

type DropdownProps = {
  label: string;
  options: string[];
  showDropdown: boolean;
  toggleDropdown: Function;
  optionSelection: Function;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  showDropdown,
  optionSelection,
}: DropdownProps): JSX.Element => {
  const onClickHandler = (option: string): void => {
    optionSelection(option);
  };

  return (
    <>
      <div className={showDropdown ? "dropdown" : "dropdown active"}>
        <div className="dropdownList">
          {options.map(
            (option: string, index: number): JSX.Element => {
              return (
                <p
                  key={index}
                  onClick={(): void => {
                    onClickHandler(option);
                  }}
                >
                  {option}
                </p>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;