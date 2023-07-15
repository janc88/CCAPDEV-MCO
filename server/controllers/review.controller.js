import mongoose from "mongoose";
import Review from "../models/Review.js";
import User from "../models/User.js";

const getAllReviews = async (req, res) => {};
const getReviewDetails = async (req, res) => {};
const createReview = async (req, res) => {
  try {
    const { title, body, stars } = req.body;

    const session = await mongoose.startSession();
	  session.startTransaction();

    const newReview = new Review({
      title,
      body,
      stars,
    });

    await newReview.save({session});
    await session.commitTransaction();
	  session.endSession();

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
