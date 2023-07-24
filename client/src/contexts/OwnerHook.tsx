import React from 'react';
import { Review } from './ReviewHook';

interface OwnerActionsType {
	replyToReview: (reviewId: string, reply: string) => Promise<Review | null>;
};

export const useOwnerActions = (
	ownerId: string,
): OwnerActionsType => {
	const replyToReview = async (reviewId: string, reply: string): Promise<Review | null> => {
		const response = await fetch(`/api/owner/${reviewId}/reply`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				body: reply,
				userId: ownerId,
			}),
		});
		if (response.status === 200) {
			return await response.json();
		}
		return null;
	};
	return {
		replyToReview,
	};
}
