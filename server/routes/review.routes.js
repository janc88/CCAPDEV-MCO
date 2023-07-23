import express from "express";

import {
	getReviewsByRestoId,
	getReviewsByUserId,
	getReviewDetails,
	createReview,
	updateReview,
	deleteReview,
	voteReview
} from "../controllers/review.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.route("/resto/:id").get(getReviewsByRestoId);
router.route("/user/:id").get(getReviewsByUserId);
router.route("/:id").get(getReviewDetails);
router.route("/").post(upload.array('imgs'), createReview);
router.route("/:id").patch(upload.array('imgs'), updateReview);
router.route("/:reviewId").delete(deleteReview);
router.route("/vote/:id").patch(voteReview);


export default router;