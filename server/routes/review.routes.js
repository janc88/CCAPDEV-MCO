import express from "express";

import {
  getAllReviews,
  getReviewDetails,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByRestoId
} from "../controllers/review.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.route("/resto/:id").get(getReviewsByRestoId);
router.route("/").get(getAllReviews);
router.route("/:id").post(getReviewDetails);
router.route("/").post(upload.array('imgs'), createReview);
router.route("/:id").patch(updateReview);
router.route("/:id").delete(deleteReview);


export default router;