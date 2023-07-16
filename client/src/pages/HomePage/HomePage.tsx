import React, { useState, useEffect } from "react";
import SearchSection from "./SearchSection";
import RestoCarousel from "./RestoCarousel";
import Footer from "../../components/Footer/Footer";
import { 
	Restaurant,
	useRestaurants
} from "../../contexts/RestoHook";

function HomePage() {
	const { fetchFeaturedRestaurants } = useRestaurants();
	const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
	useEffect(() => {
		fetchFeaturedRestaurants().then((restos) => {
			setFeaturedRestaurants(restos)
		});
	}, [fetchFeaturedRestaurants]);

	return (
		<>
			<SearchSection />
			<RestoCarousel restoList={featuredRestaurants} />
			<Footer />
		</>
	);
}

export default HomePage;
