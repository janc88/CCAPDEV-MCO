import mongoose from "mongoose";
import Review from "../models/Review.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";

const sendReview = async (req, res, review, user) => {
	let { userId } = req.body;
	
	if (user) {
		userId = user._id;
	} else if (userId && !(await User.findById(userId))) {
		return res.status(404).json({ error: "User not found" });
	}

	if (userId)
		res.status(200).json(review.userView(userId));
	else
		res.status(200).json(review.publicView());
};
const sendAllReviews = async (req, res, reviews, user) => {
	let { userId } = req.body;

	if (user) {
		userId = user._id;
	} else if (userId && !(await User.findById(userId))) {
		return res.status(404).json({ error: "User not found" });
	}
	
	if (userId)
		reviews = reviews.map(review => review.userView(userId));
	else
		reviews = reviews.map(review => review.publicView());
	reviews = await Promise.all(reviews);
	res.status(200).json(reviews);
}

const getReviewDetails = async (req, res) => {
	try {
		const { id } = req.params;

		const foundReview = await Review.findById(id);
		if (!foundReview)
			return res.status(404).json({ error: "Review not found" });
		
		sendReview(req, res, foundReview);
	} catch	(error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const getReviewsByRestoId = async (req, res) => {
	try {
		const { id } = req.params;
		
		const restaurant = await Restaurant.findById(id).populate('allReviews').exec();
		if (!restaurant)
			return res.status(404).json({ error: "Restaurant not found" });

		sendAllReviews(req, res, restaurant.allReviews);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
const getReviewsByUserId = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).populate('allReviews').exec();
		if (!user)
			return res.status(404).json({ error: "User not found" });
		
		sendAllReviews(req, res, user.allReviews, user);
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
		images.map((image) => Image.uploadImage(image, session))
	)).map(image => image._id);
	
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

	foundUser.allReviews.push(newReview._id);
	foundRestaurant.allReviews.push(newReview._id);
	await foundUser.save({session});
	await foundRestaurant.save({session});

    await newReview.save({session});
    await session.commitTransaction();
	await session.endSession();

    sendReview(req, res, newReview, foundUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, body, stars, userId } = req.body;
		const images = req.files;

		const foundReview = await Review.findById(id);
		if (!foundReview)
			return res.status(404).json({ error: "Review not found" });
		
		const foundUser = await User.findById(userId);
		if (!foundUser)
			return res.status(404).json({ error: "User not found" });
		if (foundReview.user !== userId)
			return res.status(403).json({ error: "User not authorized" });
		
		const session = await mongoose.startSession();
		session.startTransaction();
		if (images) {
			const imgs = (await Promise.all(
				images.map((image) => Image.uploadImage(image, session))
			)).map(image => image._id);
			Promise.all(foundReview.imgs.map((img) => img.deleteOne()));
			foundReview.imgs = imgs;
		}
		if (title) foundReview.title = title;
		if (body) foundReview.body = body;
		if (stars) foundReview.stars = stars;
		await foundReview.save({session});
		await session.commitTransaction();
		await session.endSession();
		
		sendReview(req, res, foundReview, foundUser);
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
		
		sendReview(req, res, foundReview, foundUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const deleteReview = async (req, res) => {
	try {
		const { id } = req.params;

		const { userId } = req.body;

		const foundUser = await User.findById(userId);
		if (!foundUser)
			return res.status(404).json({ error: "User not found" });

		const foundReview = await Review.findById(id);

		if (!foundReview)
			return res.status(404).json({ error: "Review not found" });
		if (foundReview.user !== userId)
			return res.status(403).json({ error: "User not authorized" });
		
		const session = await mongoose.startSession();
		session.startTransaction();
		
		await Promise.all(foundReview.imgs.map((img) => img.deleteOne()));

		await foundUser.reviews.pull(foundReview._id);
		await foundUser.save({session});

		await foundReview.restaurant.reviews.pull(foundReview._id);
		await foundReview.restaurant.save({session});

		await foundReview.deleteOne();
		await session.commitTransaction();
		await session.endSession();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};


export {
  getReviewsByRestoId,
  getReviewsByUserId,
  getReviewDetails,
  createReview,
  updateReview,
  deleteReview,
  voteReview
};