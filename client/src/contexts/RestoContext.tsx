import React, { 
	ReactNode, 
	createContext, 
	useCallback, 
	useContext, 
	useEffect, 
	useState
} from 'react';

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

interface RestaurantContextType {
  fetchFeaturedRestaurants: () => Promise<Restaurant[]>;
  fetchRestaurant: (restaurantId: string) => Promise<Restaurant | null>;
}

interface SingleRestaurantType {
	restaurant: Restaurant | null;
	fetchReviews: () => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  //const cacheRef = useRef<{ [key: string]: Restaurant }>({});

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
	// featured.forEach((resto) => {
	// 	cacheRef.current[resto.id] = resto;
	// });
	return featured;
  }, []);

  const fetchRestaurant = useCallback(async (restaurantId: string): Promise<Restaurant | null> => {
	// if (cacheRef.current[restaurantId]) 
	// 	return cacheRef.current[restaurantId];
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
	// cacheRef.current[resto.id] = resto;
	return resto;
  }, []);

  const contextValue: RestaurantContextType = {
    fetchRestaurant,
	fetchFeaturedRestaurants,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider');
  }
  return context;
};


export const useSingleRestaurant = (restaurantId: string): SingleRestaurantType => {
  const [resto, setResto] = useState<Restaurant | null>(null)
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider');
  }
  
  const { fetchRestaurant } = context
  useEffect(() => {
	fetchRestaurant(restaurantId).then((resto) => {
		setResto(resto);
	});
  }, [fetchRestaurant, restaurantId]);

  const fetchReviews = useCallback(async () => {
	throw new Error('Not implemented');
  }, []);

  return {
	restaurant: resto,
	fetchReviews,
  };
};
