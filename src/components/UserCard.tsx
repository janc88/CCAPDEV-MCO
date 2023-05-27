import React from 'react';
import { ProfilePic, UserCardContainer, UserName } from '../styles/UserCard.styled';
import pic from '../imgs/banana.svg'  //sample only


function UserCard() {
  return (
   <UserCardContainer>
        <UserName>Username here</UserName>
        <ProfilePic src={pic}/>
    </UserCardContainer>
  );
}

export default UserCard;