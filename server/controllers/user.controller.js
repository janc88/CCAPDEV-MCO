import User from "../models/User.js";

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
    const { username, description, password, avatar } = req.body;
    const newUser = new User({
      username,
      description,
      password,
      avatar,
    });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
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
