import express from "express";
import multer from "multer";
import {
  createUser,
  getUserInfoByUserid,
  isUsernameTaken,
  updateUser,
  loginUser
} from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer();

router.route('/taken/:username').get(isUsernameTaken);
router.route('/').post(upload.single('avatar'), createUser);
router.route('/update/:username').patch(upload.single('avatar'), updateUser);
router.route('/:id').get(getUserInfoByUserid);
router.route('/login').post(loginUser);

export default router;

