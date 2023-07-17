import React from "react";
import {
  LeftContainer,
  MiddleContainer,
  RestaurantPageContainer,
  RightContainer,
} from "./styles/RestaurantPage.styled";
import AboutRestoCard from "./AboutRestoCard";
import RestoGallery from "./RestoGallery";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import SummaryCard from "./SummaryCard";
import { useNavigate, useParams } from "react-router-dom";

import { CenterContainer, PageContainer, Card, Title, Divider, Send } from "../styles/LoginPage.styled";
import { useSingleRestaurant } from "../../contexts/RestoHook";

import { restoList } from "../../data/data";


const NotFound: React.FC<{ id: string }> = ({ id }) => {
	const navigate = useNavigate();
	return (
		<PageContainer>
			<CenterContainer>
				<Card>
					<Title>Restaurant {id} not found</Title>
					<Divider />
					<Send onClick={() => navigate('/search-restaurants/all')}>
						Return to Restaurants
					</Send>
				</Card>
			</CenterContainer>
		</PageContainer>
	);
};

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return (<NotFound id="" />);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { restaurant: resto, isFetched } = useSingleRestaurant(id);

  if (!isFetched) return (
  	<RestaurantPageContainer className="resto-gallery">
		<MiddleContainer>Loading...</MiddleContainer>
	</RestaurantPageContainer>
  );

  if (!resto) return (<NotFound id={id} />);

  return (
    <RestaurantPageContainer className="resto-gallery">
      <LeftContainer>
        <AboutRestoCard
		  {...resto}
        />
        <RestoGallery imageList={
			resto.imgs.map(
				(img, index) => ({
					id: index,
					src: img,
					alt: resto.name
				})
			)} />
      </LeftContainer>
      <MiddleContainer>
		{/*TODO add reviews*/}
        <ReviewsCard reviewList={restoList[0].reviews} />
      </MiddleContainer>
      <RightContainer>
		{/*TODO add reviews*/}
        <SummaryCard
          numrating={resto.allReviews?.length || 0}
          rating={0.5}
          ratings={[]}
        />
      </RightContainer>
    </RestaurantPageContainer>
  );
};

export default RestaurantPage;
