import mongoose from 'mongoose';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import restojson from './restos.js';


const uploadReview = async (data) => {
	const newReview = new Review(data);
	await newReview.save();
	await User.findByIdAndUpdate(data.user, {
		$push: {allReviews: newReview._id}
	});
	await Restaurant.findByIdAndUpdate(data.restaurant, {
		$push: {allReviews: newReview._id}
	});
	return newReview;
}

const getRandomUser = async () => {
	const users = await User.find({});
	const randomUser = users[Math.floor(Math.random() * users.length)];
	return randomUser;
};

const getRandomVotes = async (ownerId) => {
	const users = await User.find({});
	const userIds = users
		.map(user => user._id)
		.filter(id => id !== ownerId)
		.sort(() => Math.random() - 0.5);

	const numVotes = (Math.random() ** 2) * (userIds.length + 1);
	const upvoteRatio = 1 - Math.random() ** 2;

	const numUpvotes = Math.ceil(numVotes * upvoteRatio);
	const numDownvotes = numVotes - numUpvotes;

	const upvotes = [ownerId, ...userIds.slice(0, numUpvotes)];
	const downvotes = userIds.slice(numUpvotes, numUpvotes + numDownvotes);

	return {upvotes, downvotes};
};

const runScript = async () => {

	throw new Error('This script is not meant to be run');
	/**
	 * WARNING: VERY DANGEROUS SCRIPT THAT DELETES AND REVIEWS
	 * THIS WILL RESET REVIEWS TO THE ONE FOUND IN THE RESTO.JS
	 * ALL OTHER REVIEWS WILL BE DELETED
	 * ONLY FOR QUICK UPDATING OF REVIEWS
	 */

	console.log('deleting all reviews...');
	await Review.deleteMany({});
	await User.updateMany({}, {allReviews: []});
	await Restaurant.updateMany({}, {allReviews: []});

	console.log('processing reviews...');
	restojson.forEach(async (resto) => {
		const restoName = resto.details.name;
		const restoId = (await Restaurant.findOne({name: restoName}))._id;

		console.log(`processing ${restoName}...`);
		resto.reviews.forEach(async (review) => {
			const user = (await getRandomUser())._id;
			const votes = await getRandomVotes(user._id);
			
			await uploadReview({
				title: review.title,
				body: review.description,
				datePosted: new Date(review.datePosted),
				user: user._id,
				restaurant: restoId,
				stars: review.stars,
				upvotes: votes.upvotes,
				downvotes: votes.downvotes,
				imgs: review.imgs.map(img => img.src),
			});
		});
	});
};

export default runScript;