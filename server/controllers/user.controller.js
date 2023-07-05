import User from "../models/User.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getAllUsers = async (req, res) => {};
const createUser = async (req, res) => {
  try {
    const { username, description, password, avatar } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const photoUrl = await cloudinary.uploader.upload(avatar);

    const newUser = await User.create({
      username,
      description,
      password,
      avatar: photoUrl.url,   
    });

    await session.commitTransaction();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getUserInfoByUsername = async (req, res) => {};

export { getAllUsers, createUser, getUserInfoByUsername };
