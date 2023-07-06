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

const getUserInfoByID = async (req, res) => {};

export { getAllUsers, createUser, getUserInfoByID, isUsernameTaken };
