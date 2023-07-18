import { useCallback } from "react";


export interface Review {
	id: string;
	title: string;
	body: string;
	datePosted: Date;
	user: string;
	restaurant: string;
	votes: number;
	voteType: "up" | "down" | "none";
	ownerResponse: string;
	imgs: string[];
}

export interface ReviewData {
	title: string;
	body: string;
	stars: number;
	imgs: File[];
}
interface ReviewActionsType {
	fetchReviews: (resto: {restoId: string}) => Promise<Review[] | null>;
	createReview: (data: ReviewData) => Promise<Review>;
	editReview: (id: string, data: ReviewData) => Promise<Review>;
	deleteReview: (id: string) => Promise<void>;
	voteReview: (id: string, type: "up" | "down" | "none") => Promise<void>;
}

export const useReviewActions = ({
	restoId, userId
}: {
	restoId: string,
	userId: string,
}): ReviewActionsType => {
	const fetchReviews = useCallback(async ({restoId}) => {
		throw new Error("Not implemented");
	}, []);

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
		throw new Error("Not implemented");
	}, []);

	return {
		fetchReviews,
		createReview,
		editReview,
		deleteReview,
		voteReview,
	}
};
