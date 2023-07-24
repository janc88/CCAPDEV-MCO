import Restaurant from '../models/Restaurant.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

export default async () => {
	const restoReviews = await Review.aggregate([
		{
			$group: {
				_id: "$restaurant",
				reviews: { $push: "$$ROOT" }
			}
		}
	])
	await Restaurant.updateMany({}, {
		$set: {
			allReviews: [],
			starCount: [0, 0, 0, 0, 0],
		}
	});
	for (const { _id, reviews } of restoReviews) {
		const ids = reviews.map(review => review._id);
		const starCount = [0, 0, 0, 0, 0];
		for (const review of reviews) 
			starCount[review.stars - 1]++;
		await Restaurant.findByIdAndUpdate(_id, {
			$set: {
				allReviews: ids,
				starCount,
			}
		});
	};
	const userReviews = await Review.aggregate([
		{
			$group: {
				_id: "$user",
				reviews: { $push: "$$ROOT" }
			}
		}
	]);
	await User.updateMany({}, {
		$set: {
			allReviews: [],
		}
	});
	for (const { _id, reviews } of userReviews) {
		const ids = reviews.map(review => review._id);
		await User.findByIdAndUpdate(_id, {
			$set: {
				allReviews: ids,
			}
		});
	}
};