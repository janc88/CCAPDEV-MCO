import React, { useCallback } from 'react';
import { Review } from './ReviewHook';
import { useSession } from './SessionHook';

interface OwnerActionsType {
	replyToReview: (reviewId: string, reply: string) => Promise<Review | null>;
};

export const useOwnerActions = (
	ownerId: string,
): OwnerActionsType => {
	const { fetch } = useSession();
	const replyToReview = useCallback(async (reviewId: string, reply: string): Promise<Review | null> => {

		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/owners/reply/${reviewId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				body: reply,
			}),
			credentials: 'include',
		});
		const data = await response.json();
		if (response.status === 200) {
			return data;
		}
		return null;
	}, [fetch]);
	return {
		replyToReview,
	};
}
