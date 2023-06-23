import React, { useEffect, useState } from 'react';

type DropdownProps = {
  options: string[];
  showDropdown: boolean;
  toggleDropdown: Function;
  optionSelection: Function;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  optionSelection,
}: DropdownProps): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClickHandler = (option: string): void => {
    optionSelection(option);
  };

  useEffect(() => {
    setShowDropdown(showDropdown);
  }, [showDropdown]);

  return (
    <>
      <div className={showDropdown ? 'dropdown' : 'dropdown active'}>
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
    </>
  );
};

export default Dropdown;
