import React, { useState, useRef, useEffect } from "react";
import {
  ProfilePic,
  UserCardContainer,
  UserName,
  UserLink,
  MainContainer,
  UserOptionsContainer,
  UserOption,
} from "./styles/UserCard.styled";
import pic from "../../imgs/banana.svg"; //sample only

function UserCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const actionRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      actionRef.current &&
      !actionRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleInsideClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div ref={actionRef}>
      <MainContainer layout style={{ borderRadius: "27px" }}>
        <UserCardContainer layout={"position"} onClick={handleOpen}>
          <UserName>Username here</UserName>
          <ProfilePic src={pic} />
        </UserCardContainer>

        {isOpen && (
          <UserOptionsContainer
            initial={{ x: -160, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1,
              delayChildren: 0.2,
              staggerChildren: 0.05,
              opacity: { duration: 0.8 },
            }}
          >
            <UserLink to="/profile" onClick={handleInsideClick}>
              <UserOption>View My Profile</UserOption>
            </UserLink>
            <UserLink to="/edit-profile" onClick={handleInsideClick}>
              <UserOption>Edit My Profile</UserOption>
            </UserLink>
            <UserLink to="/" onClick={handleInsideClick}>
              <UserOption>Logout</UserOption>
            </UserLink>
          </UserOptionsContainer>
        )}
      </MainContainer>
    </div>
  );
}

export default UserCard;
