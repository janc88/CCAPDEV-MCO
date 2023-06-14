import styled from "styled-components";
import searchIcon from "../../../imgs/search_icon.png"

export const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
`;

export const SearchContainer = styled.div`
    margin-top: 4px;
    background-color: white;
    color: black;
    border-radius: 27px;
    overflow: hidden;
    position: relative;
`;

//padding: 15px 12px 15px 71px;
//padding	10 + 28 + 8 + 25 = 71
//			ic_left_pad, ic_width, ic_pad, left_pad
export const SearchIcon = styled.img.attrs(
	{'src': searchIcon}
)`
  width: 28px;
  height: 28px;
  
  padding: 4px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

interface SearchInputProps {
    hasIcon: boolean;
}
export const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "Search Restaurants",
})<SearchInputProps>`
  width: ${({hasIcon}) => (hasIcon ? '200px' : '246px')};
  height: 100%;
  background-color: rgba(0, 0, 0, 0.075);
  padding-left: ${({hasIcon}) => (hasIcon ? '71px' : '25px')};
  padding-right: 25px;

  color: #444;
  font-size: large;

  border-radius: 27px;
  transition: .2s ease-in-out 0s;
  outline: none;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ::-webkit-input-placeholder {
	font-weight: 150;
	opacity: 70%;
  }
  &:hover, &:focus{
	color: black;
	cursor: pointer;
	transform: scale(1.02);
	background-color: rgba(0, 0, 0, 0.025);
	border-radius: 27px;
	::-webkit-input-placeholder {
		opacity: 90%;
	}
  }
`;