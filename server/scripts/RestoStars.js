import Restaurant from '../models/Restaurant.js';


export default async () => {
	const allRestos = await Restaurant.find().populate('allReviews').exec();

	for (const resto of allRestos) {
		const reviews = resto.allReviews;
		const starCount = [0, 0, 0, 0, 0];
		for (const review of reviews)
			starCount[review.stars - 1]++;
		console.log('Star Count', starCount);
		resto.starCount = starCount;
		await resto.save();
	};
};