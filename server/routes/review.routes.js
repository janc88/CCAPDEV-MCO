import express from "express";

import {
  getAllReviews,
  getReviewDetails,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.route("/").get(getAllReviews);
router.route("/:id").post(getReviewDetails);
router.route("/").post(createReview);
router.route("/:id").patch(updateReview);
router.route("/:id").get(deleteReview);


export default router;
