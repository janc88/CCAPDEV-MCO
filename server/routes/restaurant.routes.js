import express from "express";
import multer from "multer";

import {
  getAllRestaurants,
  getRestaurantDetails,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getFeaturedRestaurants,
} from "../controllers/restaurant.controller.js";

const router = express.Router();
const upload = multer();

router.route("/").get(getAllRestaurants);
router.route('/featured').get(getFeaturedRestaurants)
router.route("/:id").post(getRestaurantDetails);
router.route("/").post(upload.single('coverImg'), upload.array('imgs'), createRestaurant);
router.route("/:id").patch(updateRestaurant);
router.route("/:id").get(deleteRestaurant);

export default router;
