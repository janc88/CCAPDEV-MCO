import express from "express";
import multer from "multer";
import {
  createUser,
  getUserInfoByUserid,
  isUsernameTaken,
  updateUser,
  loginUser,
  getLoggedInUser,
  logoutUser
} from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer();

router.route('/taken/:username').get(isUsernameTaken);
router.route('/').post(upload.single('avatar'), createUser);
router.route('/update/').patch(upload.single('avatar'), updateUser);
router.route('/user/:id').get(getUserInfoByUserid);
router.route('/login').post(loginUser);
router.route('/me').get(getLoggedInUser);
router.route('/logout').post(logoutUser);

export default router;

