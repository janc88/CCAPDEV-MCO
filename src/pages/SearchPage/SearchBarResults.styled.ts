import styled from "styled-components";
// import searchIcon from "../../../imgs/search_icon.png";
import { Search } from "@styled-icons/fa-solid";

export const SearchContainer = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 1.2rem 110px;
  width: 84%;
  margin: 15px auto;
  overflow: hidden;
  position: relative;
  font-size: 2.3rem;
  font-weight: 700;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
`;

export const SearchIcon = styled(Search)`
  width: 50px;
  height: 50px;

  padding: 20px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;
