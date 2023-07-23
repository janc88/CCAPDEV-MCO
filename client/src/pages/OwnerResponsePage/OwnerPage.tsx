import React, {
	useEffect,
	useState,
} from "react";
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
import { Restaurant, useRestaurants } from "../../contexts/RestoHook";

import { User } from "../../contexts/UserContext";
import { Review, useReviews } from "../../contexts/ReviewHook";

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

const OwnerPage: React.FC<{owner: User}> = ({
	owner
}) => {
  const { id } = useParams<{ id: string }>();
  const [fetchedReviews, setReviews] = useState<Review[]>([]);
  const [resto, setResto] = useState<Restaurant>();
  const [isFetched, setIsFetched] = useState(false);
  const { fetchRestaurant } = useRestaurants();
  const { fetchReviews } = useReviews();


  useEffect(() => {
	if (!id) return;
	const doStuff = async () => {
		const resto = await fetchRestaurant(id);
		const reviews = await fetchReviews({ restoId: id });
		if (resto === null || reviews === null) return;
		setResto(resto);
		setReviews(reviews);
		setIsFetched(true);
	};
	doStuff();
  }, [fetchRestaurant, fetchReviews, id]);

  if (!id) return (<NotFound id="" />);

  

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
        <ReviewsCard 
		  reviewList={fetchedReviews} 
		  restoId={id}/>
      </MiddleContainer>
      <RightContainer>
        <SummaryCard ratings={resto.starCount}/>
      </RightContainer>
    </RestaurantPageContainer>
  );
};

export default OwnerPage;
