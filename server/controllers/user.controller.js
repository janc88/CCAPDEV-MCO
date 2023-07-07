import mongoose from "mongoose";
import User from "../models/User.js";
import Image from "../models/Image.js"

const getAllUsers = async (req, res) => {};

const isUsernameTaken = async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await User.findOne({ username });

    const isTaken = !!existingUser;

    res.status(200).json({ isTaken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, description, password } = req.body;
	console.log(req.body);
	console.log(req.file);
	const avatar = req.file;

	const userExists = await User.findOne({ username });
	if (userExists) {
		return res.status(409).json({ error: "Username already taken" });
	}

	const session = await mongoose.startSession();
	session.startTransaction();

	const newImage = new Image({
		name: avatar.originalname,
		data: avatar.buffer,
		mimeType: avatar.mimetype,
	});
	await newImage.save({session});
	
    const newUser = new User({
		username,
		description,
		password,
		avatar: newImage._id,
	  });
    await newUser.save({session});
	await session.commitTransaction();

    res.status(200).json(newUser);
  } catch (error) {
	console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserInfoByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userInfo = {
      username: user.username,
      description: user.description,
      avatar: user.avatar,
      password: user.password,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { getAllUsers, createUser, getUserInfoByUsername, isUsernameTaken };
