import { useCallback, useEffect, useState } from "react";

export interface Restaurant {
	id: string;
	name: string;
	description: string;
	address: string;
	coverImg: string;
	imgs: string[];
	stars: number[];
	reviews: string[] | null;
}

interface RestaurantsType {
	fetchFeaturedRestaurants: () => Promise<Restaurant[]>;
	fetchRestaurant: (restaurantId: string) => Promise<Restaurant | null>;
	fetchReviews: (restaurant: Restaurant) => Promise<void>;
}
/**
 * hook for fetching restaurants in general
 */
export const useRestaurants = (): RestaurantsType => {
	const fetchFeaturedRestaurants = useCallback(async () => {
		const response = await fetch('http://localhost:8080/api/restaurants/featured');
		const restoJson = await response.json();
		const featured = restoJson.map((resto) => ({
			...resto,
			reviews: resto.reviews || null,
			id: resto._id,
			imgs: resto.imgs.map((img: string) => `http://localhost:8080/${img}`),
			coverImg: `http://localhost:8080/${resto.coverImg}`,
		}));
		return featured;
	}, []);

	const fetchRestaurant = useCallback(async (restaurantId: string): Promise<Restaurant | null> => {
		const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}`);
		if (!response.ok)
			return null;

		const restoJson = await response.json();
		const resto = {
			...restoJson,
			id: restoJson._id,
			reviews: restoJson.reviews || null,
			imgs: restoJson.imgs.map((img: string) => `http://localhost:8080/${img}`),
			coverImg: `http://localhost:8080/${restoJson.coverImg}`,
		};
		return resto;
	}, []);

	const fetchReviews = useCallback(async () => {
		throw new Error('Not implemented');
	}, []);

	return {
		fetchFeaturedRestaurants,
		fetchRestaurant,
		fetchReviews
	}
};

interface SingleRestaurantType {
	restaurant: Restaurant | null;
	isFetched: boolean;
	fetchRestaurant: (restaurantId: string) => Promise<Restaurant | null>;
	fetchReviews: (restaurant: Restaurant) => Promise<void>;
}

export const useSingleRestaurant = (restoId: string): SingleRestaurantType => {
	const { fetchRestaurant, fetchReviews } = useRestaurants();
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const [isFetched, setIsFetched] = useState<boolean>(false);

	useEffect(() => {
		fetchRestaurant(restoId).then((resto) => {
			setRestaurant(resto);
			setIsFetched(true);
		});
	}, [fetchRestaurant, restoId]);

	return {
		restaurant,
		isFetched,
		fetchRestaurant,
		fetchReviews
	}
};