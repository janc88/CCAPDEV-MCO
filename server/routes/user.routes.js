import express from "express";
import multer from "multer";
import {
  createUser,
  getUserInfoByUsername,
  isUsernameTaken,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer();

router.route('/taken').get(isUsernameTaken);
router.route('/').post(upload.single('avatar'), createUser);
router.route('/update/:username').patch(upload.single('avatar'), updateUser);
router.route('/:username').get(getUserInfoByUsername);

export default router;

