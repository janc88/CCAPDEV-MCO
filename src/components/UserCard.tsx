import React from 'react';
import { ProfilePic, UserCardContainer, UserName, UserLink } from '../styles/UserCard.styled';
import pic from '../imgs/banana.svg'  //sample only


function UserCard() {
  return (
   <UserCardContainer>
        <UserName>Username here</UserName>
        <UserLink to='/'>
            <ProfilePic src={pic}/>
        </UserLink>       
    </UserCardContainer>
  );
}

export default UserCard;