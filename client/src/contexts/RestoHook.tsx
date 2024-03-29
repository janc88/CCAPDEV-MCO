import { useCallback, useEffect, useState } from "react";

export interface Restaurant {
	id: string;
	name: string;
	description: string;
	address: string;
	coverImg: string;
	imgs: string[];
	starCount: number[];
	totalRatings: number;
	averageRating: number;
}

interface RestaurantsType {
	fetchFeaturedRestaurants: () => Promise<Restaurant[]>;
	fetchRestaurant: (restaurantId: string) => Promise<Restaurant | null>;
}
/**
 * hook for fetching restaurants in general
 */
export const useRestaurants = (): RestaurantsType => {
	const fetchFeaturedRestaurants = useCallback(async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/featured`);
		return await response.json();
	}, []);

	const fetchRestaurant = useCallback(async (restaurantId: string): Promise<Restaurant | null> => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`);
		if (!response.ok)
			return null;
		return await response.json();;
	}, []);

	return {
		fetchFeaturedRestaurants,
		fetchRestaurant
	}
};

interface SingleRestaurantType extends RestaurantsType {
	restaurant: Restaurant | null;
	isFetched: boolean;
}

export const useSingleRestaurant = (restoId: string): SingleRestaurantType => {
	const hook = useRestaurants();
	const { fetchRestaurant } = hook;
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const [isFetched, setIsFetched] = useState<boolean>(false);

	useEffect(() => {
		fetchRestaurant(restoId).then((resto) => {
			setRestaurant(resto);
			setIsFetched(true);
		});
	}, [fetchRestaurant, restoId]);

	return {
		...hook,
		restaurant,
		isFetched,
	}
};
