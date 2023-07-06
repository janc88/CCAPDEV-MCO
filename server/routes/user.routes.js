import express from "express";

import {
  createUser,
  getAllUsers,
  getUserInfoByUsername,
  isUsernameTaken
} from "../controllers/user.controller.js";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/taken').post(isUsernameTaken);
router.route('/').post(createUser);
router.route('/:username').get(getUserInfoByUsername);

export default router;

