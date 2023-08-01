import mongoose from "mongoose";
import User from "../models/User.js";
import Image from "../models/Image.js"
import defaults from "../defaults/defaults.json" assert { type: "json" };
import fs from "fs";
import crypto from "crypto-js"

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
	if (!username || username.length < 8) {
		return res.status(409).json({ error: "Username must be at least 8 characters long" });
	} else if (!password || password.length < 8) {
		return res.status(409).json({ error: "Password must be at least 8 characters long" });
	}
	const userExists = await User.findOne({ username });
	if (userExists) {
		return res.status(409).json({ error: "Username already taken" });
	}

	const hashpword = crypto.SHA256(password).toString();
	const avatar = req.file || await getDefaultAvatar();
	const desc = description || defaults.user.description;

	const session = await mongoose.startSession();
	session.startTransaction();

	const newImage = await Image.uploadImage(avatar, session);
	
    const newUser = new User({
		username,
		description: desc,
		password: hashpword,
		avatar: newImage._id,
	});
    await newUser.save({session});
	await session.commitTransaction();
	session.endSession();

	req.session.userId = newUser._id.toString();
    res.status(200).json(newUser.userInfo());
  } catch (error) {
	console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
	try {
		const { userId } = req.session;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(409).json({ error: "User does not exist!" });
		}

		const session = await mongoose.startSession();
		session.startTransaction();
		
		const {description, old_password, new_password} = req.body;
		const avatar = req.file;

		if (description !== undefined)
			user.description = description;
		if (new_password !== undefined) {
			if (new_password.length < 8) {
				return res.status(409).json({ error: "Password must be at least 8 characters long" });
			} else if (user.password !== crypto.SHA256(old_password).toString()) {
				return res.status(409).json({ error: "Wrong password!" });
			}
			user.password = crypto.SHA256(new_password).toString();
		}
		if (avatar !== undefined) {
			await Image.deleteOne({ _id: user.avatar }, { session });
			const newImage = await Image.uploadImage(avatar, session);
			user.avatar = newImage._id;
		}
		await user.save({ session });

		await session.commitTransaction();
		session.endSession();

		res.status(200).json(user.userInfo());
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const getUserInfoByUserid = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

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
		const hashedPassword = crypto.SHA256(password).toString();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		} else if (user.password !== hashedPassword) {
			return res.status(401).json({ error: "Wrong password" });
		}

		req.session.userId = user._id.toString();
		res.status(200).json(user.userInfo());
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getLoggedInUser = async (req, res) => {
	try {
	  const { userId } = req.session;
	  const user = await User.findById(userId);
	  if (user)
		res.status(200).json(user.userInfo());
	  else
		res.status(404).json({ message: 'User not found' });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

const logoutUser = async (req, res) => {
	try {
		req.session.destroy();
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
  
export { 
	createUser, 
	getUserInfoByUserid, 
	isUsernameTaken, 
	updateUser, 
	loginUser,
	getLoggedInUser,
	logoutUser
};
