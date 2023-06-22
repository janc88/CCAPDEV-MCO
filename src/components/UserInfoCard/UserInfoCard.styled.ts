import styled from "styled-components";
import { Button } from "../../styles/Button.styled";
import { Gear } from "@styled-icons/fa-solid/Gear";
import { Link } from "react-router-dom";

export const UserInfoCardContainer = styled.div`
  max-height: 62%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const ProfilePic = styled.img`
  height: 18rem;
  width: 18rem;
  border-radius: 2rem;
  object-fit: cover;
  display: block;
`;

export const ProfilePicContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserName = styled.h1`
  margin: 0.5rem;
`;

export const UserDescription = styled.h2`
  margin: 0.5rem;
  font-weight: 300;
  max-height: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

export const LogOutButton = styled(Button)`
  margin: 0.5rem;
  margin-top: 1rem;
  border: solid 1px black;
  padding: 0.5rem 3.5rem;
  font-weight: 400;
  border-radius: 2rem;
  font-size: 1rem;
`;

export const SettingIcon = styled(Gear)`
  position: absolute;
  top: -1rem;
  right: -1rem;
  color: white;
  background-color: rgb(255, 121, 79, 0.8);
  border-radius: 50%;
  height: 3.5rem;
  width: 3.5rem;
  padding: 0.5rem;
  &:hover {
    animation-name: spin;
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
    @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
    }
  }
`;

export const SettingsLink = styled(Link)`

`;
