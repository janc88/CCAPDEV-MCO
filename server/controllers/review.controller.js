import mongoose from "mongoose";
import Review from "../models/Review.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import { uploadImage } from "../controllers/image.controller.js"

const getAllReviews = async (req, res) => {};
const getReviewDetails = async (req, res) => {};

const getReviewsByRestoId = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		
		const restaurant = await Restaurant.findById(id).populate('reviews').exec();
		if (!restaurant)
			return res.status(404).json({ error: "Restaurant not found" });
		if (userId && !(await User.findById(userId)))
			return res.status(404).json({ error: "User not found" });
		
		let reviews = null
		if (userId)
			reviews = restaurant.reviews.map(review => review.userView(userId));
		else
			reviews = restaurant.reviews.map(review => review.publicView());

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
    res.status(200).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {};
const deleteReview = async (req, res) => {};

export {
  getAllReviews,
  getReviewDetails,
  createReview,
  updateReview,
  deleteReview,
};