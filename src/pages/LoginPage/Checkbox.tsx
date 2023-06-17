import React from "react";
import { FlexRow, CheckboxIcon, Check, CheckboxLabel } from "./styles/checkbox.styled";
import { Tooltip } from "react-tooltip";

interface CheckboxProps {
	tooltip?: string,
	label: string,
	labelSize: number
}

function Checkbox({tooltip, label, labelSize}: CheckboxProps) {
  return (
    <FlexRow>
		<Check
			px={labelSize}/>
		<CheckboxLabel 
			px={labelSize}>{label}</CheckboxLabel>
		
		{tooltip ? (
        <>
          <CheckboxIcon
            px={labelSize}
            data-tooltip-id="checkbox-tooltip"
            data-tooltip-content={tooltip}
            data-tooltip-place="bottom"
			data-tooltip-delay-show={200}>
            ?
          </CheckboxIcon>
          <Tooltip id="checkbox-tooltip" />
        </>
      ) : (
        <CheckboxIcon px={labelSize}>?</CheckboxIcon>
      )}
	</FlexRow>
  );
}

export default Checkbox;
