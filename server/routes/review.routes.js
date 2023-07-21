import express from "express";

import {
	getReviewsByRestoId,
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
router.route("/:id").get(getReviewDetails);
router.route("/").post(upload.array('imgs'), createReview);
router.route("/:id").patch(upload.array('imgs'), updateReview);
router.route("/:id").delete(deleteReview);
router.route("/vote/:id").patch(voteReview);


export default router;