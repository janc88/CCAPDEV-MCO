import React from "react";
import {
  LeftContainer,
  MiddleContainer,
  RestaurantPageContainer,
  RightContainer,
} from "../../styles/RestaurantPage.styled";
import AboutRestoCard from "./AboutRestoCard";
import RestoGallery from "./RestoGallery";
import RestoReviews from "./RestoReviews";
import SummaryCard from "./SummaryCard";

import { ImageProps, ReviewProps } from "./RestoReviews";

interface RestoPageProps {
  name: string;
  rating: number;
  numrating: number;
  desc: string;
  ratings: number[];
  address: string;
  restoImgs: ImageProps[];
  reviews: ReviewProps[];
}


function RestaurantPage() {
  const details = {
    name: "Mcdonalds DLSU",
    rating: 4.3,
    numrating: 1340,
    desc: "best resto in DLSU! really good food. highly recommended best resto in DLSU! really good food. highly recommended best resto in DLSU! really good food. highly recommended best resto in DLSU! really good food. highly recommended best resto in DLSU! really good food. highly recommended best resto in DLSU! really good food. highly recommended",
    ratings: [5, 4, 1, 5, 5, 5, 5, 5, 5],
    address: "1234 Taft Ave.",
  };

  const imageList = [
    { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
    { id: 2, src: "food-bg-dark.jpeg", alt: "Image 2" },
    { id: 3, src: "food-bg-dark.jpeg", alt: "Image 3" },
    // Add more image objects as needed
  ];

  const reviewList = [
    {
      id: 1,
      title: "best food in DLSU",
      username: "username",
      profilepic: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
      datePosted: new Date(2023, 5, 13, 11, 5, 0),
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      stars: 5,
      helpful: 3,
      response: "thank you",
      imgs: [{ id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" }],
    },
    {
      id: 1,
      title: "best food in DLSU",
      username: "username",
      profilepic: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
      datePosted: new Date(2023, 5, 12, 10, 30, 0),
      description: "nice place",
      stars: 5,
      helpful: 3,
      response: "thank you",
      imgs: [{ id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" }],
    },
    {
      id: 1,
      title: "best food in DLSU",
      username: "username",
      profilepic: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
      datePosted: new Date(2023, 5, 12, 10, 30, 0),
      description: "nice place",
      stars: 5,
      helpful: 3,
      response: "thank you",
      imgs: [{ id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" }],
    },
  ];

  return (
    <RestaurantPageContainer>
      <LeftContainer>
        <AboutRestoCard {...details} />
        <RestoGallery imageList={imageList} />
      </LeftContainer>
      <MiddleContainer>
        <RestoReviews reviewList={reviewList}/>
      </MiddleContainer>
      <RightContainer>
        <SummaryCard {...details}/>
      </RightContainer>
    </RestaurantPageContainer>
  );
}

export default RestaurantPage;
