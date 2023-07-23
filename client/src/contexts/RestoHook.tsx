import { useCallback, useEffect, useState } from "react";

export interface Restaurant {
	id: string;
	name: string;
	description: string;
	address: string;
	coverImg: string;
	imgs: string[];
	starCount: number[];
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
		const response = await fetch('http://localhost:8080/api/restaurants/featured');
		return await response.json();
	}, []);

	const fetchRestaurant = useCallback(async (restaurantId: string): Promise<Restaurant | null> => {
		const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}`);
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
