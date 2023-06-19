import styled from "styled-components";

export const ModalBG = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  animation: fade-in 0.5s;
`;

export const ModalContainer = styled.div`
  /* margin: 50px 10px; */
  display: flex;
  border-radius: 10px;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
  /* min-width: 25%; */
  width: 420px;
  /* max-width: 420px; */
  height: 335px;
  flex-direction: column;
  overflow: hidden;
`;

interface RestoImgProps {
  image: string;
}


