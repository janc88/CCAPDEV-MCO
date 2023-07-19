import mongoose from "mongoose";
import Review from "../models/Review.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import { uploadImage } from "../controllers/image.controller.js"


/**
 * for now, all requests use the public view
 */
const getAllReviews = async (req, res) => {};
const getReviewDetails = async (req, res) => {};

const getReviewsByRestoId = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		
		const restaurant = await Restaurant.findById(id).populate('allReviews').exec();
		if (!restaurant)
			return res.status(404).json({ error: "Restaurant not found" });
		if (userId && !(await User.findById(userId)))
			return res.status(404).json({ error: "User not found" });
		
		let reviews = null
		if (userId)
			reviews = restaurant.allReviews.map(review => review.userView(userId));
		else
			reviews = restaurant.allReviews.map(review => review.publicView());
		reviews = await Promise.all(reviews);
		res.status(200).json(reviews);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const createReview = async (req, res) => {
  try {
    const { title, body, stars, user, restaurant } = req.body;
	const images = req.files;
	const date = new Date();

	const foundUser = await User.findById(user);
	if (!foundUser) 
		return res.status(404).json({ error: "User not found" });
	const foundRestaurant = await Restaurant.findById(restaurant);
	if (!foundRestaurant)
		return res.status(404).json({ error: "Restaurant not found" });

    const session = await mongoose.startSession();
	session.startTransaction();

	const imgs = (await Promise.all(
		images.map((image) => uploadImage(image, session))
	)).map(image => image._id);

	foundUser.reviews.push(newReview._id);
	foundRestaurant.reviews.push(newReview._id);
	await foundUser.save({session});
	await foundRestaurant.save({session});

    const newReview = new Review({
      title,
      body,
      datePosted: date,
      user,
      restaurant,
      stars,
	  upvotes: [user],
	  downvotes: [],
      imgs,
    });

    await newReview.save({session});
    await session.commitTransaction();
	await session.endSession();
    res.status(200).json(newReview.publicView());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, body, stars, } = req.body;
		const images = req.files;

		const foundReview = await Review.findById(id);
		if (!foundReview)
			return res.status(404).json({ error: "Review not found" });
		
		const session = await mongoose.startSession();
		session.startTransaction();
		if (images) {
			const imgs = (await Promise.all(
				images.map((image) => uploadImage(image, session))
			)).map(image => image._id);
			foundReview.imgs.forEach(async (img) => await img.deleteOne());
			foundReview.imgs = imgs;
		}
		if (title) foundReview.title = title;
		if (body) foundReview.body = body;
		if (stars) foundReview.stars = stars;
		await foundReview.save({session});
		await session.commitTransaction();
		await session.endSession();
		res.status(200).json(foundReview.publicView());
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
const voteReview = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId, voteType } = req.body;

		const foundReview = await Review.findById(id);
		if (!foundReview)
			return res.status(404).json({ error: "Review not found" });
		const foundUser = await User.findById(userId);
		if (!foundUser)
			return res.status(404).json({ error: "User not found" });
		
		const session = await mongoose.startSession();
		session.startTransaction();
		
		if (foundReview.upvotes.includes(userId))
			foundReview.upvotes.pull(userId);
		else if (foundReview.downvotes.includes(userId))
			foundReview.downvotes.pull(userId);
		
		if (voteType === 'upvote')
			foundReview.upvotes.push(userId);
		else if (voteType === 'downvote')
			foundReview.downvotes.push(userId);
		
		await foundReview.save({session});
		await session.commitTransaction();
		await session.endSession();
		res.status(200).json(foundReview.publicView());
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const deleteReview = async (req, res) => {};

export {
  getReviewsByRestoId,
  getAllReviews,
  getReviewDetails,
  createReview,
  updateReview,
  deleteReview,
};