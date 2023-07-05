import express from "express";

import {
  createUser,
  getAllUsers,
  getUserInfoByUsername,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoByUsername);

export default router;

