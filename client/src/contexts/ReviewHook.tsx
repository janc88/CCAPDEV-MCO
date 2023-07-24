import { useCallback } from "react";
import { User } from "./UserContext";
import { Restaurant } from "./RestoHook";


export interface Review {
	id: string;
	title: string;
	body: string;
	datePosted: Date;
	user: User;
	restaurant: Restaurant;
	stars: number;
	votes: number;
	voteType?: "up" | "down" | "none";
	ownerResponse?: {
		owner: User;
		body: string;
	}
	imgs: string[];
	lastEdited: Date | null;
}

interface UseReviewsType {
	fetchReviews: (resto: {restoId: string, userId: string}) => Promise<Review[] | null>;
	fetchUserReviews: (user: {userId: string}) => Promise<Review[] | null>;
}

export interface ReviewData {
	title: string;
	body: string;
	stars: number;
	imgs: File[];
}
interface ReviewActionsType extends UseReviewsType {
	createReview: (data: ReviewData) => Promise<Review>;
	editReview: (id: string, data: ReviewData) => Promise<Review>;
	deleteReview: (id: string) => Promise<void>;
	voteReview: (id: string, type: "up" | "down" | "none") => Promise<void>;
}

export const useReviews = (): UseReviewsType => {
	const fetchReviews = useCallback(async ({restoId, userId}) => {
		const response = await fetch(`http://localhost:8080/api/reviews/resto/${restoId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: userId
			})
		});
		if (!response.ok)
			return null;

		const data = await response.json();
		const fetchedReviews = data.map((review) => ({
			...review,
			datePosted: new Date(review.datePosted),
			lastEdited: review.lastEdited && new Date(review.lastEdited),
		}));
		console.log(fetchedReviews);
		return fetchedReviews;
	}, []);

	const fetchUserReviews = useCallback(async ({userId}) => {
		const response = await fetch(`http://localhost:8080/api/reviews/user/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: userId
			})
		});
		if (!response.ok)
			return null;

		const data = await response.json();
		const fetchedReviews = data.map((review) => ({
			...review,
			datePosted: new Date(review.datePosted),
			lastEdited: review.lastEdited && new Date(review.lastEdited),
		}));
		console.log(fetchedReviews);
		return fetchedReviews;
	}, []);

	return {
		fetchReviews,
		fetchUserReviews
	}
}

export const useReviewActions = ({
	restoId, userId
}: {
	restoId: string,
	userId: string,
}): ReviewActionsType => {

	const methods = useReviews();

	const createReview = useCallback(async ({
		title, 
		body,
		stars,
		imgs,
	}: ReviewData) => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('body', body);
		formData.append('user', userId);
		formData.append('restaurant', restoId);
		formData.append('stars', stars.toString());
		for (const img of imgs)
			formData.append('imgs', img);

		const response = await fetch("http://localhost:8080/api/reviews/", {
			method: "POST",
			body: formData
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error creating review");
		return data;
	}, [restoId, userId]);

	const editReview = useCallback(async (id: string, {
		title, 
		body,
		stars,
		imgs,
	}: ReviewData) => {
		throw new Error("Not implemented");
	}, []);
	const deleteReview = useCallback(async (id: string) => {
		throw new Error("Not implemented");
	}, []);
	const voteReview = useCallback(async (id: string, type: "up" | "down" | "none") => {
		const response = await fetch(`http://localhost:8080/api/reviews/vote/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				voteType: type,
				userId: userId
			})
		});
		const data = await response.json();
		if (!response.ok)
			alert(JSON.stringify(data));
	}, [userId]);

	return {
		...methods,
		createReview,
		editReview,
		deleteReview,
		voteReview,
	}
};
