import mongoose from "mongoose";
import User from "../models/User.js";
import Image from "../models/Image.js"
import defaults from "../defaults/defaults.json" assert { type: "json" };
import fs from "fs";

const getDefaultAvatar = async () => {
	const avatar = defaults.user.avatar;
	return new Promise((resolve, reject) => {
		fs.readFile(avatar.path, (err, data) => {
			if (err) reject(err);
			else resolve({
				originalname: avatar.name,
				buffer: data,
				mimetype: avatar.mimeType
			});
		})
	});
};

const isUsernameTaken = async (req, res) => {
  try {
    const { username } = req.params;

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
	const avatar = req.file || await getDefaultAvatar();
	const desc = description || defaults.user.description;
	const userExists = await User.findOne({ username });
	if (userExists) {
		return res.status(409).json({ error: "Username already taken" });
	}

	const session = await mongoose.startSession();
	session.startTransaction();

	const newImage = await Image.uploadImage(avatar, session);
	
    const newUser = new User({
		username,
		description: desc,
		password,
		avatar: newImage._id,
	});
    await newUser.save({session});
	await session.commitTransaction();
	session.endSession();

    res.status(200).json(newUser.userInfo());
  } catch (error) {
	console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(409).json({ error: "User does not exist!" });
		}

		const session = await mongoose.startSession();
		session.startTransaction();
		
		const {description, old_password, new_password} = req.body;
		const avatar = req.file;
		const newData = {};

		if (description !== undefined)
			newData.description = description;
		if (new_password !== undefined) {
			if (user.password !== old_password) {
				return res.status(409).json({ error: "Wrong password!" });
			}
			newData.password = new_password;
		}
		if (avatar !== undefined) {
			await Image.deleteOne({ _id: user.avatar }, { session });
			const newImage = await Image.uploadImage(avatar, session);
			newData.avatar = newImage._id;
		}
		await user.updateOne(newData, { session });

		await session.commitTransaction();
		session.endSession();

		const newUser = await User.findOne({ username })
		res.status(200).json(newUser.userInfo());
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const getUserInfoByUserid = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.userInfo());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		
		if (user.password !== password) {
			return res.status(401).json({ error: "Wrong password" });
		}

		res.status(200).json(user.userInfo());
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export { createUser, getUserInfoByUserid, isUsernameTaken, updateUser, loginUser };
