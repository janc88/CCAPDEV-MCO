import styled from 'styled-components';

export const ProfilePicture = styled.img<{px: number}>`
  width: ${({px})=>px}px;
  height: ${({px})=>px}px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgb(255, 121, 79);
  border-radius: 30px;
  display: block;
  margin: auto;
`;