import React, { useState, useEffect } from "react";
import {
  Footer,
  Header,
  ReviewCardContainer,
  ReviewContentContainer,
  ReviewImg,
  ReviewImgContainer,
  ReviewTitle,
  ReviewDescription,
  LeftContainer,
  RightContainer,
  UserContainer,
  ProfilePic,
  UserName,
  RelativeTime,
  HelpfulContainer,
  OwnersResponse,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Helpful,
} from "../../styles/ReviewCard.styled";
import StarRating from "../../components/StarRating";
import { ReviewProps, ImageProps } from "./RestoReviews";



const ReviewCard: React.FC<ReviewProps> = (review) => {
  const [loadedImage, setLoadedImage] = useState<string>();
  const [profilePic, setProfilePic] = useState<string>();
  const image = review.imgs[0];
  const ppic = review.profilepic;

  const loadImages = async (image: ImageProps, ppic: ImageProps) => {
    try {
      const loadedImage = await import(`../../imgs/${image.src}`);
      const profilePic = await import(`../../imgs/${image.src}`);
      setLoadedImage(loadedImage.default);
      setProfilePic(profilePic.default);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const getTimeDifference = (specificDate: Date): string => {
    const currentDate: Date = new Date();
    const timeDifference: number =
      currentDate.getTime() - specificDate.getTime();

    if (timeDifference < 0) {
      return "Invalid date";
    }

    const secondsDifference: number = Math.floor(timeDifference / 1000);
    const minutesDifference: number = Math.floor(secondsDifference / 60);
    const hoursDifference: number = Math.floor(minutesDifference / 60);
    const daysDifference: number = Math.floor(hoursDifference / 24);
    const yearsDifference: number = Math.floor(daysDifference / 365);

    return secondsDifference < 60
      ? `${secondsDifference} ${
          secondsDifference === 1 ? "second" : "seconds"
        } ago`
      : minutesDifference < 60
      ? `${minutesDifference} ${
          minutesDifference === 1 ? "minute" : "minutes"
        } ago`
      : hoursDifference < 24
      ? `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`
      : daysDifference < 365
      ? `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`
      : `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"} ago`;
  };

  const relativeTime = getTimeDifference(review.datePosted);

  useEffect(() => {
    loadImages(image, ppic);
    console.log(new Date());
  }, [image, ppic]);

  return (
    <ReviewCardContainer>
      <ReviewContentContainer>
        <Header>
          <LeftContainer>
            <ReviewTitle>{review.title}</ReviewTitle>
            <UserContainer>
              <ProfilePic src={profilePic} />
              <UserName>Username here</UserName>
            </UserContainer>
          </LeftContainer>
          <RightContainer>
            <StarRating size="sm" rating={review.stars} />
            <RelativeTime>{relativeTime}</RelativeTime>
          </RightContainer>
        </Header>
        <ReviewDescription>{review.description}</ReviewDescription>
        <Footer>
          <HelpfulContainer>
            <ThumbsUpIcon/>
            /
            <ThumbsDownIcon/>
            <Helpful>Helpful ({review.helpful})</Helpful>
          </HelpfulContainer>
          <OwnersResponse>View Owner's Response</OwnersResponse>
        </Footer>
      </ReviewContentContainer>
      <ReviewImgContainer>
        <ReviewImg src={loadedImage} />
      </ReviewImgContainer>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
