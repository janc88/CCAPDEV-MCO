import Review from "../models/Review.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import * as dotenv from "dotenv";

import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllReviews = async (req, res) => {};
const getReviewDetails = async (req, res) => {};

const createReview = async (req, res) => {
  try {
    const {
      title,
      body,
      datePosted,
      user,
      restaurant,
      stars,
      helpful,
      ownerResponse,
      imgs,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const username = await User.findOne({ user }).session(session);
    const restaurantName = await Restaurant.findOne({ restaurant }).session(
      session
    );

    if (!username) throw new Error("User not found");
    if (!restaurantName) throw new Error("Restaurant not found");

    imgUrls = imgs.map(async (img) => {
      const photoUrl = await cloudinary.uploader.upload(img);
      return photoUrl.url;
    });

    const newReview = await Review.create({
      title,
      body,
      datePosted,
      user: username.username,
      restaurant: restaurantName._id,
      stars,
      helpful,
      ownerResponse,
      imgs: imgUrls,
    });

    username.allReviews.push(newReview._id);
    restaurantName.allReviews.push(newReview._id);
    await username.save({ session });
    await restaurantName.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
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
