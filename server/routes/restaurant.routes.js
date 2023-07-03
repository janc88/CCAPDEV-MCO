import express from "express";

import {
  getAllRestaurants,
  getRestaurantDetails,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller";

const router = express.Router();

router.route("/").get(getAllRestaurants);
router.route("/:id").post(getRestaurantDetails);
router.route("/").post(createRestaurant);
router.route("/:id").patch(updateRestaurant);
router.route("/:id").get(deleteRestaurant);

export default router;
