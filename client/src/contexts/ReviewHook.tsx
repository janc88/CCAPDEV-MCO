import { useCallback } from "react";
import { User } from "./UserContext";
import { Restaurant } from "./RestoHook";
import { useSession } from "./SessionHook";


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
	fetchReviews: (resto: {restoId: string}) => Promise<Review[] | null>;
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
	deleteReview: (id: string) => Promise<boolean>;
	voteReview: (id: string, type: "up" | "down" | "none") => Promise<void>;
}

export const useReviews = (): UseReviewsType => {
	const { fetch } = useSession();
	const fetchReviews = useCallback(async ({restoId}) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/resto/${restoId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		});
		if (!response.ok)
			return null;

		const data = await response.json();
		const fetchedReviews = data.map((review) => ({
			...review,
			datePosted: new Date(review.datePosted),
			lastEdited: review.lastEdited && new Date(review.lastEdited),
		}));
		fetchedReviews.sort((a, b) => b.votes - a.votes);
		return fetchedReviews;
	}, [fetch]);

	const fetchUserReviews = useCallback(async ({userId}) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/user/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		});
		if (!response.ok)
			return null;

		const data = await response.json();
		const fetchedReviews = data.map((review) => ({
			...review,
			datePosted: new Date(review.datePosted),
			lastEdited: review.lastEdited && new Date(review.lastEdited),
		}));
		fetchedReviews.sort((a, b) => b.votes - a.votes);
		return fetchedReviews;
	}, [fetch]);

	return {
		fetchReviews,
		fetchUserReviews
	}
}


interface ReviewActionsProps {
	restoId?: string;
}
export const useReviewActions = (data: ReviewActionsProps = {}): ReviewActionsType => {
	const restoId = data?.restoId || "";
	const methods = useReviews();
	const { fetch } = useSession();

	const createReview = useCallback(async ({
		title, 
		body,
		stars,
		imgs,
	}: ReviewData) => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('body', body);
		formData.append('restaurant', restoId);
		formData.append('stars', stars.toString());
		for (const img of imgs)
			formData.append('imgs', img);

		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/`, {
			method: "POST",
			body: formData,
			credentials: 'include',
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error creating review");
		return data;
	}, [restoId, fetch]);

	const editReview = useCallback(async (id: string, {
		title, 
		body,
		stars,
		imgs,
	}: ReviewData) => {
		const reviewId = id;
	
		const formData = new FormData();
		formData.append("title", title);
		formData.append("body", body);
		formData.append("stars", stars.toString());
		for (const img of imgs)
			formData.append('imgs', img);
	
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}`, {
			method: 'PATCH',
			body: formData,
			credentials: 'include',
		});
		const data = await response.json();
		if (!response.ok) 
			throw new Error(JSON.stringify(data));
		return data
	}, [fetch]);
	const deleteReview = useCallback(async (id: string) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
		if (!response.ok)
			console.error(JSON.stringify(await response.json()));
		return response.ok;
	}, [fetch]);
	const voteReview = useCallback(async (id: string, type: "up" | "down" | "none") => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/vote/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				voteType: type
			}),
			credentials: 'include',
		});
		const data = await response.json();
		if (!response.ok)
			console.error(JSON.stringify(data));
	}, [fetch]);

	return {
		...methods,
		createReview,
		editReview,
		deleteReview,
		voteReview,
	}
};
