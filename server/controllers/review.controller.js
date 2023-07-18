import mongoose from "mongoose";
import Review from "../models/Review.js";
import User from "../models/User.js";
import { uploadImage } from "../controllers/image.controller.js"

const getAllReviews = async (req, res) => {};
const getReviewDetails = async (req, res) => {};

const createReview = async (req, res) => {
	console.log("i was here")
  try {
    const { title, body, stars, user, restaurant } = req.body;
	const images = req.files;

    const date = new Date();

    const session = await mongoose.startSession();
	session.startTransaction();

	const imgs = (await Promise.all(
		images.map((image) => uploadImage(image, session))
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