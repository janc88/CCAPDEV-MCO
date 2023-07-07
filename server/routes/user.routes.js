import express from "express";
import multer from "multer";
import {
  createUser,
  getAllUsers,
  getUserInfoByUsername,
  isUsernameTaken,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer();

router.route('/').get(getAllUsers);
router.route('/taken').post(isUsernameTaken);
router.route('/').post(upload.single('avatar'), createUser);
router.route('/:username').post(upload.single('avatar'), updateUser);
router.route('/:username').get(getUserInfoByUsername);

export default router;

