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
	fetchReviews: (userId: string, resto: {restoId: string}) => Promise<Review[] | null>;
	fetchUserReviews: (userId: string, user: {userId: string}) => Promise<Review[] | null>;
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
	const fetchReviews = useCallback(async (userId, {restoId}) => {
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

	const fetchUserReviews = useCallback(async (reqUserId, {userId}) => {
		const response = await fetch(`http://localhost:8080/api/reviews/user/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: reqUserId
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


interface ReviewActionsProps {
	restoId?: string;
}
export const useReviewActions = (data: ReviewActionsProps = {}): ReviewActionsType => {
	const restoId = data?.restoId || "";
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
		formData.append('restaurant', restoId);
		formData.append('stars', stars.toString());
		for (const img of imgs)
			formData.append('imgs', img);

		const response = await fetch("http://localhost:8080/api/reviews/", {
			method: "POST",
			body: formData,
			credentials: 'include',
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error creating review");
		return data;
	}, [restoId]);

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
	
		const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
			method: 'PATCH',
			body: formData,
			credentials: 'include',
		});
		if (!response.ok)
			throw new Error("Error editing review");
		const data = await response.json();
		return data
	}, []);
	const deleteReview = useCallback(async (id: string) => {
		const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
		return response.ok;
	}, []);
	const voteReview = useCallback(async (id: string, type: "up" | "down" | "none") => {
		const response = await fetch(`http://localhost:8080/api/reviews/vote/${id}`, {
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
			alert(JSON.stringify(data));
	}, []);

	return {
		...methods,
		createReview,
		editReview,
		deleteReview,
		voteReview,
	}
};
